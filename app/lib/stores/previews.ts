import type { SandpackMessage } from '@codesandbox/sandpack-client';
import { sandpack } from '../sandpack';
import { atom } from 'nanostores';

export interface PreviewInfo {
  port: number;
  ready: boolean;
  baseUrl: string;
}

export class PreviewsStore {
  #availablePreviews = new Map<number, PreviewInfo>();

  previews = atom<PreviewInfo[]>([]);

  constructor() {
    this.#init();
  }

  async #init() {
    const client = await sandpack;

    client.listen((message: SandpackMessage) => {
      if (message.type === 'urlchange') {
        // Sandpack doesn't have a port, so we'll use a fixed one for now
        const port = 3000;
        const { url } = message;
        let previewInfo = this.#availablePreviews.get(port);
        const previews = this.previews.get();

        if (!url) {
          // Handle preview close
          if (previewInfo) {
            this.#availablePreviews.delete(port);
            this.previews.set(previews.filter((preview) => preview.port !== port));
          }
          return;
        }

        if (!previewInfo) {
          previewInfo = { port, ready: true, baseUrl: url };
          this.#availablePreviews.set(port, previewInfo);
          previews.push(previewInfo);
        }

        previewInfo.ready = true;
        previewInfo.baseUrl = url;

        this.previews.set([...previews]);
      }
    });
  }
}
