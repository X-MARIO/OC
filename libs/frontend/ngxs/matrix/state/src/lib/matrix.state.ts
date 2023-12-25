import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { MatrixApiWrapperService } from 'matrix-api';
import { catchError, map, Observable } from 'rxjs';
import { State as EState } from 'store-root';
import { MatrixElement } from 'types-matrix';
import * as MatrixActions from './matrix.actions';

/**
 * This state using for Matrix.
 */
export interface IMatrixStateModel {
	/**
	 * A flag that indicates whether Matrix have been logged in by the Matrix.
	 */
	readonly state: EState;

	/**
	 * Matrix model
	 */
	readonly matrix: MatrixElement[][];

	/**
	 * Error
	 */
	readonly error: Record<string, never>;
}

/**
 * This initial value for post state.
 */
export const initialMatrixState: IMatrixStateModel = {
	state: EState.EMPTY,
	matrix: [],
	error: {},
};

/**
 * This service is used to change state, dispatch actions and subscribe on selectors.
 * In Ngxs this merges selectors, reducer and effects.
 */
@State<IMatrixStateModel>({
	name: 'matrix',
	defaults: initialMatrixState,
})
@Injectable()
export class MatrixState {
	/**
	 * Matrix state constructor
	 * @param matrixApiWrapperService Matrix API service
	 */
	public constructor(private readonly matrixApiWrapperService: MatrixApiWrapperService) {}

	/**
	 * Action for get matrix.
	 * @param ctx StateContext<IMatrixStateModel>
	 * @returns Observable<void>
	 */
	@Action(MatrixActions.GetMatrix)
	public getMatrix(ctx: StateContext<IMatrixStateModel>): Observable<Observable<void> | void> {
		return this.matrixApiWrapperService.getAll().pipe(
			map((res: MatrixElement[][]) => {
				const stateS = ctx.getState();

				ctx.setState({
					...stateS,
					state: EState.READY,
					matrix: res,
					error: {},
				});

				return ctx.dispatch(new MatrixActions.GetMatrixSuccess(res));
			}),
			catchError((error: {}) => {
				const stateE = ctx.getState();

				ctx.setState({
					...stateE,
					state: EState.ERROR,
					matrix: [],
					error,
				});

				return ctx.dispatch(
					new MatrixActions.GetMatrixFailure({
						error,
					}),
				);
			}),
		);
	}

	/**
	 * Action for set matrix.
	 * @param ctx StateContext<IMatrixStateModel>
	 * @returns Observable<void>
	 */
	@Action(MatrixActions.SetMatrix)
	public setMatrix(
		ctx: StateContext<IMatrixStateModel>,
		{ payload }: MatrixActions.SetMatrix,
	): Observable<Observable<void> | void> {
		return this.matrixApiWrapperService.setAll(payload).pipe(
			map((matrix: MatrixElement[][]) => {
				const stateS = ctx.getState();

				ctx.setState({
					...stateS,
					state: EState.READY,
					matrix,
					error: {},
				});

				return ctx.dispatch(new MatrixActions.SetMatrixSuccess(matrix));
			}),
			catchError((error: {}) => {
				const stateE = ctx.getState();

				ctx.setState({
					...stateE,
					state: EState.ERROR,
					matrix: [],
					error,
				});

				return ctx.dispatch(
					new MatrixActions.SetMatrixFailure({
						error,
					}),
				);
			}),
		);
	}

	/**
	 * Action for set matrix.
	 * @param ctx StateContext<IMatrixStateModel>
	 * @returns Observable<void>
	 */
	@Action(MatrixActions.UpdateElMatrix)
	public updateOneMatrix(
		ctx: StateContext<IMatrixStateModel>,
		{ payload }: MatrixActions.UpdateElMatrix,
	): Observable<Observable<void> | void> {
		return this.matrixApiWrapperService.updateOne(payload).pipe(
			map((matrixElement: MatrixElement) => {
				const stateS = ctx.getState();

				const el: MatrixElement[] | undefined = stateS.matrix.find(
					(value: MatrixElement[]) => value[0]?.placeId === payload.placeId,
				);

				if (!el) {
					throw new Error('e89b92b9-241b-4c9c-bdc1-7603640156ce');
				}

				const matrixEl: MatrixElement | undefined = el[0];

				if (matrixEl === undefined) {
					throw new Error('7ef7cb07-9c6a-4d66-b674-76c137401079');
				}

				matrixEl.update(payload);

				ctx.setState({
					...stateS,
					state: EState.READY,
					matrix: [...stateS.matrix],
					error: {},
				});

				return ctx.dispatch(new MatrixActions.UpdateElMatrixSuccess(matrixElement));
			}),
			catchError((error: {}) => {
				const stateE = ctx.getState();

				ctx.setState({
					...stateE,
					state: EState.ERROR,
					matrix: [],
					error,
				});

				return ctx.dispatch(
					new MatrixActions.UpdateElMatrixFailure({
						error,
					}),
				);
			}),
		);
	}

	/**
	 * Selector that returns the logged from state.
	 * @param state IMatrixStateModel IMatrixStateModel
	 * @returns IMatrixStateModel['logged']
	 */
	@Selector()
	public static state(state: IMatrixStateModel): IMatrixStateModel['state'] {
		return state.state;
	}

	/**
	 * Selector that returns the user from state.
	 * @param state IMatrixStateModel
	 * @returns IMatrixStateModel['logged']
	 */
	@Selector()
	public static matrix(state: IMatrixStateModel): IMatrixStateModel['matrix'] {
		return state.matrix;
	}

	/**
	 * Selector that returns the user from state.
	 * @param state IMatrixStateModel
	 * @returns IMatrixStateModel['error']
	 */
	@Selector()
	public static error(state: IMatrixStateModel): IMatrixStateModel['error'] {
		return state.error;
	}
}
