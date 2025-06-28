import { atom, type WritableAtom } from 'nanostores';
import type { SandpackClient, SandpackMessage } from '@codesandbox/sandpack-client';
import type { ITerminal } from '~/types/terminal';
import { coloredText } from '~/utils/terminal';

export class TerminalStore {
  #sandpackClient: Promise<SandpackClient>;
  // Sandpack client handles processes internally, so we don't need to track them explicitly here.
  // We will just pipe the output to the ITerminal.
  #terminals: Array<{ terminal: ITerminal }> = [];

  showTerminal: WritableAtom<boolean> = import.meta.hot?.data.showTerminal ?? atom(false);

  constructor(sandpackClient: Promise<SandpackClient>) {
    this.#sandpackClient = sandpackClient;

    if (import.meta.hot) {
      import.meta.hot.data.showTerminal = this.showTerminal;
    }
  }

  toggleTerminal(value?: boolean) {
    this.showTerminal.set(value !== undefined ? value : !this.showTerminal.get());
  }

  async attachTerminal(terminal: ITerminal) {
    try {
      this.#terminals.push({ terminal });
      const client = await this.#sandpackClient;

      client.listen((log: SandpackMessage) => {
        if (log.type === 'console' && Array.isArray(log.log)) {
          // Sandpack console logs can be of various types (log, error, warn, etc.)
          // We'll just write the data to the terminal for now.
          // You might want to format this based on log.type
          for (const logItem of log.log) {
            terminal.write(logItem.data.join(' ') + '\r\n');
          }
        }
      });

      // For shell commands, we'll need a way to send input to Sandpack.
      // SandpackClient's `dispatch` method can be used for 'command' type.
      // However, direct interactive shell input might require a more complex setup
      // with Sandpack's custom setup or a dedicated terminal component.
      // For now, we'll focus on output.
      terminal.write(coloredText.green('Sandpack terminal attached. Use `runCommand` for execution.\r\n'));

    } catch (error: any) {
      terminal.write(coloredText.red('Failed to attach Sandpack terminal\n\n') + error.message);
      return;
    }
  }

  onTerminalResize(cols: number, rows: number) {
    // Sandpack handles its own internal terminal resizing.
    // If a custom terminal component is used, it would manage its own dimensions.
    // No direct action needed here for SandpackClient.
  }
}
