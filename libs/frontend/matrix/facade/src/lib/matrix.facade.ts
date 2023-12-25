import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { State } from 'store-root';
import { MatrixElementBase } from 'types-matrix';

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
	public matrix$!: Observable<MatrixElementBase[][]>;

	/**
	 * A flag that indicates whether matrix have been logged in by the matrix.
	 */
	public error$!: Observable<Record<string, any>>;

	/**
	 * The matrix is logged in successfully
	 */
	public matrixSuccess$!: Observable<MatrixElementBase[][]>;

	/**
	 * The matrix is logged in unsuccessfully
	 */
	public matrixFailure$!: Observable<Record<string, any>>;

	/**
	 * The matrix is set in successfully
	 */
	public setMatrixSuccess$!: Observable<MatrixElementBase[][]>;

	/**
	 * The matrix is set in unsuccessfully
	 */
	public setMatrixFailure$!: Observable<Record<string, any>>;

	/**
	 * The matrix is set in successfully
	 */
	public updateElMatrixSuccess$!: Observable<MatrixElementBase>;

	/**
	 * The matrix is set in unsuccessfully
	 */
	public updateElMatrixFailure$!: Observable<Record<string, any>>;

	/**
	 * The matrix is set in successfully
	 */
	public deleteElMatrixSuccess$!: Observable<MatrixElementBase['_placeId']>;

	/**
	 * The matrix is set in unsuccessfully
	 */
	public deleteElMatrixFailure$!: Observable<Record<string, any>>;

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
	 * matrix set method
	 */
	public abstract setMatrix(payload: MatrixElementBase[][]): void;

	/**
	 * matrix update el method
	 */
	public abstract updateElMatrix(payload: MatrixElementBase): void;

	/**
	 * matrix delete el method
	 */
	public abstract deleteElMatrix(payload: MatrixElementBase['_placeId']): void;

	/**
	 * Method clear storage
	 */
	public abstract clear(): void;
}
