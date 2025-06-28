import { loadSandpackClient, type SandpackClient } from '@codesandbox/sandpack-client';

export let sandpack: Promise<SandpackClient>;

if (!import.meta.env.SSR) {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  sandpack = loadSandpackClient(
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
}
