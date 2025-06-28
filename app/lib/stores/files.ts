import { getEncoding } from 'istextorbinary';
import { map, type MapStore } from 'nanostores';
import * as nodePath from 'node:path';
import { computeFileModifications } from '~/utils/diff';
import { createScopedLogger } from '~/utils/logger';
import { unreachable } from '~/utils/unreachable';
import type { SandpackClient } from '@codesandbox/sandpack-client';

const logger = createScopedLogger('FilesStore');

const utf8TextDecoder = new TextDecoder('utf8', { fatal: true });

export interface File {
  type: 'file';
  content: string;
  isBinary: boolean;
}

export interface Folder {
  type: 'folder';
}

type Dirent = File | Folder;

export type FileMap = Record<string, Dirent | undefined>;

export class FilesStore {
  #sandpackClient: Promise<SandpackClient>;

  /**
   * Tracks the number of files without folders.
   */
  #size = 0;

  /**
   * @note Keeps track all modified files with their original content since the last user message.
   * Needs to be reset when the user sends another message and all changes have to be submitted
   * for the model to be aware of the changes.
   */
  #modifiedFiles: Map<string, string> = import.meta.hot?.data.modifiedFiles ?? new Map();

  /**
   * Map of files that matches the state of WebContainer.
   */
  files: MapStore<FileMap> = import.meta.hot?.data.files ?? map({});

  get filesCount() {
    return this.#size;
  }

  constructor(sandpackClient: Promise<SandpackClient>) {
    this.#sandpackClient = sandpackClient;

    if (import.meta.hot) {
      import.meta.hot.data.files = this.files;
      import.meta.hot.data.modifiedFiles = this.#modifiedFiles;
    }

    this.#init();
  }

  getFile(filePath: string) {
    const dirent = this.files.get()[filePath];

    if (dirent?.type !== 'file') {
      return undefined;
    }

    return dirent;
  }

  getFileModifications() {
    return computeFileModifications(this.files.get(), this.#modifiedFiles);
  }

  resetFileModifications() {
    this.#modifiedFiles.clear();
  }

  async saveFile(filePath: string, content: string) {
    const client = await this.#sandpackClient;

    try {
      const oldContent = this.getFile(filePath)?.content;

      if (oldContent === undefined) {
        unreachable('Expected content to be defined');
      }

      await client.updateSandbox({ files: { [filePath]: { code: content } } });

      if (!this.#modifiedFiles.has(filePath)) {
        this.#modifiedFiles.set(filePath, oldContent);
      }

      // we immediately update the file and don't rely on the `change` event coming from the watcher
      this.files.setKey(filePath, { type: 'file', content, isBinary: false });

      logger.info('File updated');
    } catch (error) {
      logger.error('Failed to update file content\n\n', error);

      throw error;
    }
  }

  // Sandpack does not provide a direct file watch API like WebContainer.
  // For now, we will assume file changes are pushed to Sandpack via updateFiles.
  // If we need to read changes *from* Sandpack, a polling mechanism or
  // a custom Sandpack client event listener would be required.
  async #init() {
    const client = await this.#sandpackClient;
    // For now, we'll rely on the initial files provided during SandpackManager initialization.
  }
}
