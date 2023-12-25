import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { State } from 'store-root';
import { MatrixElement } from 'types-matrix';

/**
 * Facade to encapsulate State Management such as Ngxs
 */
@Injectable()
export abstract class MatrixFacade {
	/**
	 * A flag that indicates whether matrix have been logged in by the matrix.
	 */
	public state$!: Observable<State>;

	/**
	 * A flag that indicates whether posts have been logged in by the matrix.
	 */
	public matrix$!: Observable<MatrixElement[][]>;

	/**
	 * A flag that indicates whether matrix have been logged in by the matrix.
	 */
	public error$!: Observable<Record<string, any>>;

	/**
	 * The matrix is logged in successfully
	 */
	public matrixSuccess$!: Observable<MatrixElement[][]>;

	/**
	 * The matrix is logged in unsuccessfully
	 */
	public matrixFailure$!: Observable<Record<string, any>>;

	/**
	 * Storage cleared successfully
	 */
	public clearSuccess$!: Observable<void>;

	/**
	 * Storage cleared unsuccessfully
	 */
	public clearFailure$!: Observable<Record<string, any>>;

	/**
	 * matrix get method
	 */
	public abstract getMatrix(): void;

	/**
	 * Method clear storage
	 */
	public abstract clear(): void;
}
