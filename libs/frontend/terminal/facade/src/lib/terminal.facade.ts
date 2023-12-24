import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { State } from 'store-root';
import type { ITerminalCommand, Message } from 'types-terminal';

/**
 * Facade to encapsulate State Management such as Ngxs
 */
@Injectable()
export abstract class TerminalFacade {
	/**
	 * A flag that indicates whether terminal have been logged in by the terminal.
	 */
	public state$!: Observable<State>;

	/**
	 * A flag that indicates whether posts have been logged in by the terminal.
	 */
	public messages$!: Observable<Message[]>;

	/**
	 * A flag that indicates whether terminal have been logged in by the terminal.
	 */
	public error$!: Observable<Record<string, any>>;

	/**
	 * The terminal is logged in successfully
	 */
	public messageSuccess$!: Observable<Message['text']>;

	/**
	 * The terminal is logged in unsuccessfully
	 */
	public messageFailure$!: Observable<Record<string, any>>;

	/**
	 * Storage cleared successfully
	 */
	public clearSuccess$!: Observable<void>;

	/**
	 * Storage cleared unsuccessfully
	 */
	public clearFailure$!: Observable<Record<string, any>>;

	/**
	 * Send command terminal
	 */
	public abstract sendCommand(payload: ITerminalCommand): void;

	/**
	 * Method clear storage
	 */
	public abstract clear(): void;
}
