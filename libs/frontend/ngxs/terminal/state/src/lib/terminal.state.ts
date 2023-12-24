import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { uuidv4 } from 'core-uuid';
import { catchError, map, Observable } from 'rxjs';
import { State as EState } from 'store-root';
import { TerminalApiWrapperService } from 'terminal-api';
import { EAuthor, Message } from 'types-terminal';

import * as TerminalActions from './terminal.actions';

/**
 * This state using for Terminal.
 */
export interface ITerminalStateModel {
	/**
	 * A flag that indicates whether Terminal have been logged in by the Terminal.
	 */
	readonly state: EState;

	/**
	 * Terminal model
	 */
	readonly messages: Message[];

	/**
	 * Error
	 */
	readonly error: Record<string, never>;
}

/**
 * This initial value for post state.
 */
export const initialTerminalState: ITerminalStateModel = {
	state: EState.EMPTY,
	messages: [],
	error: {},
};

/**
 * This service is used to change state, dispatch actions and subscribe on selectors.
 * In Ngxs this merges selectors, reducer and effects.
 */
@State<ITerminalStateModel>({
	name: 'terminal',
	defaults: initialTerminalState,
})
@Injectable()
export class TerminalState {
	/**
	 * Terminal state constructor
	 * @param terminalApiWrapperService Terminal API service
	 */
	public constructor(private readonly terminalApiWrapperService: TerminalApiWrapperService) {}

	/**
	 * Action for login user.
	 * @param ctx StateContext<ITerminalStateModel>
	 * @param payload TerminalActions.Login
	 * @param payload.payload IUserLogin
	 * @returns Observable<void>
	 */
	@Action(TerminalActions.GetTerminal)
	public login(
		ctx: StateContext<ITerminalStateModel>,
		{ payload }: TerminalActions.GetTerminal,
	): Observable<Observable<void> | void> {
		const state = ctx.getState();

		ctx.setState({
			...state,
			state: EState.PENDING,
			messages: [
				new Message({
					id: uuidv4(),
					text: payload,
					author: EAuthor.USER,
					createdAt: new Date().valueOf(),
				}),
			],
			error: {},
		});

		return this.terminalApiWrapperService.get().pipe(
			map((res: string) => {
				ctx.setState({
					...state,
					state: EState.READY,
					messages: [
						...state.messages,
						new Message({
							id: uuidv4(),
							text: res,
							author: EAuthor.SYSTEM,
							createdAt: new Date().valueOf(),
						}),
					],
					error: {},
				});

				return ctx.dispatch(new TerminalActions.GetTerminalSuccess(Terminal));
			}),
			catchError((error: {}) => {
				ctx.setState({
					...state,
					state: EState.ERROR,
					messages: [
						...state.messages,
						new Message({
							id: uuidv4(),
							text: 'Произошла ошибка. Ответ не получен.',
							author: EAuthor.SYSTEM,
							createdAt: new Date().valueOf(),
						}),
					],
					error: {},
				});

				return ctx.dispatch(
					new TerminalActions.GetTerminalFailure({
						error,
					}),
				);
			}),
		);
	}

	/**
	 * Selector that returns the logged from state.
	 * @param state ITerminalStateModel ITerminalStateModel
	 * @returns ITerminalStateModel['logged']
	 */
	@Selector()
	public static state(state: ITerminalStateModel): ITerminalStateModel['state'] {
		return state.state;
	}

	/**
	 * Selector that returns the user from state.
	 * @param state ITerminalStateModel
	 * @returns ITerminalStateModel['logged']
	 */
	@Selector()
	public static messages(state: ITerminalStateModel): ITerminalStateModel['messages'] {
		return state.messages;
	}

	/**
	 * Selector that returns the user from state.
	 * @param state ITerminalStateModel
	 * @returns ITerminalStateModel['error']
	 */
	@Selector()
	public static error(state: ITerminalStateModel): ITerminalStateModel['error'] {
		return state.error;
	}
}
