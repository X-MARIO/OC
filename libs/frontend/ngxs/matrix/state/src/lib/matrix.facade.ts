import { Injectable } from '@angular/core';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { MatrixFacade } from 'matrix-facade';
import { map } from 'rxjs';
import { MatrixElement } from 'types-matrix';
import * as MatrixActions from './matrix.actions';
import { MatrixState } from './matrix.state';

/**
 * Ngxs implementation MatrixFacade
 */
@Injectable()
export class NgxsMatrixFacade implements MatrixFacade {
	@Select(MatrixState.state)
	public state$!: MatrixFacade['state$'];

	@Select(MatrixState.matrix)
	public matrix$!: MatrixFacade['matrix$'];

	@Select(MatrixState.error)
	public error$!: MatrixFacade['error$'];

	public matrixSuccess$: MatrixFacade['matrixSuccess$'] = this.actions$.pipe(
		ofActionDispatched(MatrixActions.GetMatrixSuccess),
		map(({ payload }) => payload),
	);

	public matrixFailure$: MatrixFacade['matrixFailure$'] = this.actions$.pipe(
		ofActionDispatched(MatrixActions.GetMatrixFailure),
		map(({ error }) => error),
	);

	public setMatrixSuccess$: MatrixFacade['setMatrixSuccess$'] = this.actions$.pipe(
		ofActionDispatched(MatrixActions.SetMatrixSuccess),
		map(({ payload }) => payload),
	);

	public setMatrixFailure$: MatrixFacade['setMatrixFailure$'] = this.actions$.pipe(
		ofActionDispatched(MatrixActions.SetMatrixFailure),
		map(({ error }) => error),
	);

	public clearSuccess$: MatrixFacade['clearSuccess$'] = this.actions$.pipe(
		ofActionDispatched(MatrixActions.ClearSuccess),
		map(() => undefined),
	);

	public clearFailure$: MatrixFacade['clearFailure$'] = this.actions$.pipe(
		ofActionDispatched(MatrixActions.ClearFailure),
		map(({ error }) => error),
	);

	public constructor(private readonly store: Store, private readonly actions$: Actions) {}

	public getMatrix(): void {
		this.store.dispatch(new MatrixActions.GetMatrix());
	}

	public setMatrix(payload: MatrixElement[][]): void {
		this.store.dispatch(new MatrixActions.SetMatrix(payload));
	}

	public clear(): void {
		this.store.dispatch(new MatrixActions.Clear());
	}
}
