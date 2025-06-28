import { loadSandpackClient, type SandpackClient } from '@codesandbox/sandpack-client';

class SandpackManager {
  private clientPromise: Promise<SandpackClient>;

  constructor() {
    if (typeof window !== 'undefined') {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      this.clientPromise = loadSandpackClient(
        iframe,
        {
          files: {},
          template: 'node',
        },
        {
          bundlerURL: 'https://sandpack-bundler.pages.dev',
          showOpenInCodeSandbox: false,
          showErrorScreen: false,
          showLoadingScreen: false,
        }
      );
    } else {
      this.clientPromise = Promise.reject(new Error('Sandpack is only available in the browser'));
    }
  }

  async updateFiles(files: Record<string, { code: string }>) {
    const client = await this.clientPromise;
    return client.updateSandbox({ files });
  }

  async dispatch(data: any) {
    const client = await this.clientPromise;
    return client.dispatch(data);
  }

  async listen(callback: (message: any) => void) {
    const client = await this.clientPromise;
    return client.listen(callback);
  }

  // Add more methods as needed for compatibility
}

export const webcontainer = new SandpackManager();
export { SandpackManager };
