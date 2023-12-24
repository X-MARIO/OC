import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Process } from 'types-process';

/**
 * Facade to encapsulate State Management such as Ngxs
 */
@Injectable()
export abstract class ProcessFacade {
	/**
	 * A flag that indicates whether process have been logged in by the process.
	 */
	public state$!: Observable<boolean | null>;

	/**
	 * A flag that indicates whether posts have been logged in by the process.
	 */
	public process$!: Observable<Process[]>;

	/**
	 * A flag that indicates whether process have been logged in by the process.
	 */
	public error$!: Observable<Record<string, any>>;

	/**
	 * The process is logged in successfully
	 */
	public processSuccess$!: Observable<Process[]>;

	/**
	 * The process is logged in unsuccessfully
	 */
	public processFailure$!: Observable<Record<string, any>>;

	/**
	 * Storage cleared successfully
	 */
	public clearSuccess$!: Observable<void>;

	/**
	 * Storage cleared unsuccessfully
	 */
	public clearFailure$!: Observable<Record<string, any>>;

	/**
	 * Process get method
	 */
	public abstract getProcess(): void;

	/**
	 * Method clear storage
	 */
	public abstract clear(): void;
}
