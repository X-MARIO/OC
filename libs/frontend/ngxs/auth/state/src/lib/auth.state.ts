import { catchError, map, Observable, of, switchMap, take } from 'rxjs';

import * as AuthActions from './auth.actions';

import { Injectable } from '@angular/core';
import type { NgxsOnInit } from '@ngxs/store';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SessionAsyncStorage } from '@oc/core/storage/session';
import { AuthApiService } from '@oc/frontend/auth/api/service';
import { StorageKeys } from '@oc/frontend-api/types/model';
import type { IUserAuth, IUserSecretsF } from '@oc/frontend-api/types/user';

/**
 * This state using for authorization user.
 */
export interface IAuthStateModel {
	/**
	 * A flag that indicates whether posts have been logged in by the user.
	 */
	readonly logged: boolean | null;

	/**
	 * User model
	 */
	readonly user: IUserAuth | undefined;

	/**
	 * Error
	 */
	readonly error: Record<string, any>;
}

/**
 * This initial value for post state.
 */
export const initialAuthState: IAuthStateModel = {
	logged: false,
	user: undefined,
	error: {},
};

/**
 * This service is used to change state, dispatch actions and subscribe on selectors.
 * In Ngxs this merges selectors, reducer and effects.
 */
@State<IAuthStateModel>({
	name: 'auth',
	defaults: initialAuthState,
})
@Injectable()
export class AuthState implements NgxsOnInit {
	/**
	 * Auth state constructor
	 * @param authApiService Auth API service
	 * @param sessionAsyncStorage Any storage service
	 */
	public constructor(
		private readonly authApiService: AuthApiService,
		private readonly sessionAsyncStorage: SessionAsyncStorage,
	) {}

	/**
	 * Action for init app.
	 * @param ctx StateContext<IAuthStateModel>
	 * @returns Observable<void>
	 */
	@Action(AuthActions.Init)
	public init(ctx: StateContext<IAuthStateModel>): Observable<Observable<void> | void> {
		return of(null).pipe(
			switchMap(() =>
				this.sessionAsyncStorage
					.getItem<IUserSecretsF['access_token']>(StorageKeys.AuthToken)
					.pipe(take(1)),
			),
			map((authToken: IUserSecretsF['access_token'] | null) => {
				const state = ctx.getState();

				ctx.setState({
					...state,
					logged: !!authToken,
					user: undefined,
					error: {},
				});

				return ctx.dispatch(new AuthActions.Restore(!!authToken));
			}),
		);
	}

	/**
	 * Action for login user.
	 * @param ctx StateContext<IAuthStateModel>
	 * @param payload AuthActions.Login
	 * @param payload.payload IUserLogin
	 * @returns Observable<void>
	 */
	@Action(AuthActions.Login)
	public login(
		ctx: StateContext<IAuthStateModel>,
		{ payload }: AuthActions.Login,
	): Observable<Observable<void> | void> {
		return this.authApiService.login(payload).pipe(
			map((user: IUserAuth) => {
				const state = ctx.getState();

				ctx.setState({
					...state,
					logged: true,
					user: user,
					error: {},
				});

				this.sessionAsyncStorage.setItems({
					[StorageKeys.AuthToken]: user.access_token,
				});

				return ctx.dispatch(new AuthActions.LoginSuccess(user));
			}),
			catchError((error: unknown) =>
				ctx.dispatch(
					new AuthActions.LoginFailure({
						error,
					}),
				),
			),
		);
	}

	/**
	 * Action for logout user.
	 * @param ctx StateContext<IAuthStateModel>
	 * @returns Observable<void>
	 */
	@Action(AuthActions.Logout)
	public logout(ctx: StateContext<IAuthStateModel>): Observable<Observable<void> | void> {
		return of(null).pipe(
			map(() => {
				const state = ctx.getState();

				ctx.setState({
					...state,
					logged: false,
					user: undefined,
					error: {},
				});

				this.sessionAsyncStorage.removeItems([StorageKeys.AuthToken]);

				return ctx.dispatch(new AuthActions.LogoutSuccess());
			}),
			catchError((error: unknown) =>
				ctx.dispatch(
					new AuthActions.LogoutFailure({
						error,
					}),
				),
			),
		);
	}

	/**
	 * Action for register user.
	 * @param ctx StateContext<IAuthStateModel>
	 * @param payload AuthActions.Register
	 * @param payload.payload IUserCreateFriend
	 * @returns Observable<void>
	 */
	@Action(AuthActions.Register)
	public register(
		ctx: StateContext<IAuthStateModel>,
		{ payload }: AuthActions.Register,
	): Observable<Observable<void> | void> {
		return this.authApiService.register(payload).pipe(
			map((user: IUserAuth) => {
				const state = ctx.getState();

				ctx.setState({
					...state,
					logged: true,
					user: user,
					error: {},
				});

				this.sessionAsyncStorage.setItems({
					[StorageKeys.AuthToken]: user.access_token,
				});

				return ctx.dispatch(new AuthActions.RegisterSuccess(user));
			}),
			catchError((error: unknown) =>
				ctx.dispatch(
					new AuthActions.RegisterFailure({
						error,
					}),
				),
			),
		);
	}

	/**
	 * Selector that returns the logged from state.
	 * @param state IAuthStateModel IAuthStateModel
	 * @returns IAuthStateModel['logged']
	 */
	@Selector()
	public static logged(state: IAuthStateModel): IAuthStateModel['logged'] {
		return state.logged;
	}

	/**
	 * Selector that returns the user from state.
	 * @param state IAuthStateModel
	 * @returns IAuthStateModel['logged']
	 */
	@Selector()
	public static user(state: IAuthStateModel): IAuthStateModel['user'] {
		return state.user;
	}

	/**
	 * Selector that returns the user from state.
	 * @param state IAuthStateModel
	 * @returns IAuthStateModel['error']
	 */
	@Selector()
	public static error(state: IAuthStateModel): IAuthStateModel['error'] {
		return state.error;
	}

	public ngxsOnInit(ctx: StateContext<IAuthStateModel>): void {
		ctx.dispatch(new AuthActions.Init());
	}
}
