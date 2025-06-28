import type { SandpackClient } from '@codesandbox/sandpack-client';
import type { ITerminal } from '~/types/terminal';
import { withResolvers } from './promises';

export async function runSandpackCommand(sandpackClient: Promise<SandpackClient>, command: string, terminal: ITerminal) {
  const client = await sandpackClient;
  await client.dispatch({ type: 'command', command } as any);
}
