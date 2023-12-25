import { map } from 'rxjs';

import * as ProcessActions from './process.actions';
import { ProcessState } from './process.state';

import { Injectable } from '@angular/core';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import type { ProcessFacade } from 'process-facade';

/**
 * Ngxs implementation MatrixFacade
 */
@Injectable()
export class NgxsProcessFacade implements ProcessFacade {
	@Select(ProcessState.state)
	public state$!: ProcessFacade['state$'];

	@Select(ProcessState.process)
	public process$!: ProcessFacade['process$'];

	@Select(ProcessState.error)
	public error$!: ProcessFacade['error$'];

	public processSuccess$: ProcessFacade['processSuccess$'] = this.actions$.pipe(
		ofActionDispatched(ProcessActions.GetProcessSuccess),
		map(({ payload }) => payload),
	);

	public processFailure$: ProcessFacade['processFailure$'] = this.actions$.pipe(
		ofActionDispatched(ProcessActions.GetProcessFailure),
		map(({ error }) => error),
	);

	public clearSuccess$: ProcessFacade['clearSuccess$'] = this.actions$.pipe(
		ofActionDispatched(ProcessActions.ClearSuccess),
		map(() => undefined),
	);

	public clearFailure$: ProcessFacade['clearFailure$'] = this.actions$.pipe(
		ofActionDispatched(ProcessActions.ClearFailure),
		map(({ error }) => error),
	);

	public constructor(private readonly store: Store, private readonly actions$: Actions) {}

	public getProcess(): void {
		this.store.dispatch(new ProcessActions.GetProcess());
	}

	public clear(): void {
		this.store.dispatch(new ProcessActions.Clear());
	}
}
