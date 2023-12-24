import type { ITerminalCommand } from 'types-terminal';

export enum FormModelTerminal {
	command = 'command',
}

export interface IFormModelLogin {
	readonly [FormModelTerminal.command]: ITerminalCommand;
}
