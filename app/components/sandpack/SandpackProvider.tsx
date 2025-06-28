import { type ReactNode } from 'react';
import { SandpackProvider as BaseSandpackProvider, SandpackLayout, SandpackPreview } from '@codesandbox/sandpack-react';

interface Props {
  children: ReactNode;
}

export function SandpackProvider({ children }: Props) {
  return (
    <BaseSandpackProvider
      template="node"
      theme="auto"
      customSetup={{
        entry: 'index.js',
        dependencies: {},
      }}
    >
      {children}
      <SandpackLayout hidden>
        <SandpackPreview />
      </SandpackLayout>
    </BaseSandpackProvider>
  );
}
