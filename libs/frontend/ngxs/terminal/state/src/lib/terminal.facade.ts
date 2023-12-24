import { map } from 'rxjs';

import * as TerminalActions from './terminal.actions';
import { TerminalState } from './terminal.state';

import { Injectable } from '@angular/core';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import type { TerminalFacade } from 'terminal-facade';
import type { ITerminalCommand } from 'types-terminal';

/**
 * Ngxs implementation TerminalFacade
 */
@Injectable()
export class NgxsTerminalFacade implements TerminalFacade {
	@Select(TerminalState.state)
	public state$!: TerminalFacade['state$'];

	@Select(TerminalState.messages)
	public messages$!: TerminalFacade['messages$'];

	@Select(TerminalState.error)
	public error$!: TerminalFacade['error$'];

	public messageSuccess$: TerminalFacade['messageSuccess$'] = this.actions$.pipe(
		ofActionDispatched(TerminalActions.GetTerminalSuccess),
		map(({ payload }) => payload),
	);

	public messageFailure$: TerminalFacade['messageFailure$'] = this.actions$.pipe(
		ofActionDispatched(TerminalActions.GetTerminalFailure),
		map(({ error }) => error),
	);

	public clearSuccess$: TerminalFacade['clearSuccess$'] = this.actions$.pipe(
		ofActionDispatched(TerminalActions.ClearSuccess),
		map(() => undefined),
	);

	public clearFailure$: TerminalFacade['clearFailure$'] = this.actions$.pipe(
		ofActionDispatched(TerminalActions.ClearFailure),
		map(({ error }) => error),
	);

	public constructor(private readonly store: Store, private readonly actions$: Actions) {}

	public sendCommand(payload: ITerminalCommand): void {
		this.store.dispatch(new TerminalActions.GetTerminal(payload));
	}

	public clear(): void {
		this.store.dispatch(new TerminalActions.Clear());
	}
}
