import { catchError, map, Observable } from 'rxjs';

import * as ProcessActions from './process.actions';

import { Injectable } from '@angular/core';
import { Action, Selector, StateContext } from '@ngxs/store';
import { ProcessApiWrapperService } from 'process-api';
import { State as EState, State } from 'store-root';
import type { Process } from 'types-process';

/**
 * This state using for process.
 */
export interface IProcessStateModel {
	/**
	 * A flag that indicates whether process have been logged in by the process.
	 */
	readonly state: EState;

	/**
	 * User model
	 */
	readonly process: Process[];

	/**
	 * Error
	 */
	readonly error: Record<string, never>;
}

/**
 * This initial value for post state.
 */
export const initialProcessState: IProcessStateModel = {
	state: EState.EMPTY,
	process: [],
	error: {},
};

/**
 * This service is used to change state, dispatch actions and subscribe on selectors.
 * In Ngxs this merges selectors, reducer and effects.
 */
@State<IProcessStateModel>({
	name: 'process',
	defaults: initialProcessState,
})
@Injectable()
export class ProcessState {
	/**
	 * process state constructor
	 * @param processApiWrapperService process API service
	 */
	public constructor(private readonly processApiWrapperService: ProcessApiWrapperService) {}

	/**
	 * Action for login user.
	 * @param ctx StateContext<IProcessStateModel>
	 * @returns Observable<void>
	 */
	@Action(ProcessActions.GetProcess)
	public login(ctx: StateContext<IProcessStateModel>): Observable<Observable<void> | void> {
		const state = ctx.getState();

		ctx.setState({
			...state,
			state: EState.PENDING,
			process: [],
			error: {},
		});

		return this.processApiWrapperService.getAll().pipe(
			map((process: Process[]) => {
				ctx.setState({
					...state,
					state: EState.READY,
					process,
					error: {},
				});

				return ctx.dispatch(new ProcessActions.GetProcessSuccess(process));
			}),
			catchError((error: unknown) => {
				ctx.setState({
					...state,
					state: EState.ERROR,
					process: [],
					error,
				});

				return ctx.dispatch(
					new ProcessActions.GetProcessFailure({
						error,
					}),
				);
			}),
		);
	}

	/**
	 * Selector that returns the logged from state.
	 * @param state IProcessStateModel IProcessStateModel
	 * @returns IProcessStateModel['logged']
	 */
	@Selector()
	public static state(state: IProcessStateModel): IProcessStateModel['state'] {
		return state.state;
	}

	/**
	 * Selector that returns the user from state.
	 * @param state IProcessStateModel
	 * @returns IProcessStateModel['logged']
	 */
	@Selector()
	public static process(state: IProcessStateModel): IProcessStateModel['process'] {
		return state.process;
	}

	/**
	 * Selector that returns the user from state.
	 * @param state IProcessStateModel
	 * @returns IProcessStateModel['error']
	 */
	@Selector()
	public static error(state: IProcessStateModel): IProcessStateModel['error'] {
		return state.error;
	}
}
