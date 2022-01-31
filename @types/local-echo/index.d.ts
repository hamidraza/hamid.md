declare module 'local-echo' {
  export default class LocalEchoController {
    read(prompt: string, continuationPrompt?: string): Promise<string>;
    dispose(): void;
    activate(terminal: Terminal): void;
    addAutocompleteHandler(fn: (index: number) => void): void;
    history: HistoryController;
  }

  export interface HistoryController {
    size: number;
    entries: string[];
    cursor: number;
  }
}
