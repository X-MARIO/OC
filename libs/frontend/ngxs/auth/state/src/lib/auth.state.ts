import { Injectable } from '@angular/core';
import type { NgxsOnInit } from '@ngxs/store';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { StorageKeys } from '@oc/frontend-api/types/model';
import type { IUserAuth, IUserCreate, IUserSecretsF } from '@oc/frontend-api/types/user';
import { AuthApiService } from '@oc/frontend/auth/api/service';
import { jwtDecode } from 'jwt-decode';
import { catchError, map, Observable, of, switchMap, take } from 'rxjs';
import { LocalAsyncStorage, LocalSyncStorage } from 'storage-local';
import { EFileType, MatrixElement, type MatrixElementBase } from 'types-matrix';

import * as AuthActions from './auth.actions';

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
	 * @param localAsyncStorage Any storage service
	 * @param localSyncStorage Any storage service
	 */
	public constructor(
		private readonly authApiService: AuthApiService,
		private readonly localAsyncStorage: LocalAsyncStorage,
		private readonly localSyncStorage: LocalSyncStorage,
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
				this.localAsyncStorage
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
		return this.localAsyncStorage.getItems([StorageKeys.Users]).pipe(
			take(1),
			switchMap(([users]: [string]) => {
				const mapUsers: Map<IUserCreate['username'], IUserSecretsF['access_token']> =
					new Map<IUserCreate['username'], IUserSecretsF['access_token']>(
						JSON.parse(users),
					);

				if (!mapUsers.has(payload.username)) {
					throw new Error('18d57062-1644-4663-a82b-ea7e7ae07945');
				}

				return this.authApiService.login(payload).pipe(
					map((user: IUserAuth) => {
						const state = ctx.getState();

						const token: string = mapUsers.get(payload.username) ?? '';
						const access: IUserCreate = jwtDecode<IUserCreate>(token);

						if (access.password !== payload.password) {
							throw new Error('fa023ac1-a2ea-4f6d-a410-10d38343cd56');
						}

						ctx.setState({
							...state,
							logged: true,
							user: user,
							error: {},
						});

						mapUsers.set(payload.username, user.access_token);

						this.localSyncStorage.setItem(StorageKeys.AuthToken, user.access_token);
						this.localAsyncStorage.setItems({
							[StorageKeys.AuthToken]: user.access_token,
						});

						return ctx.dispatch(new AuthActions.LoginSuccess(user));
					}),
				);
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

				this.localSyncStorage.removeItem(StorageKeys.AuthToken);
				this.localAsyncStorage.removeItems([StorageKeys.AuthToken]);

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
		return this.localAsyncStorage.getItems([StorageKeys.Users]).pipe(
			take(1),
			switchMap(([ users]: [string]) => {
				const matrix: string = this.localSyncStorage.getItem(StorageKeys.Matrix) ?? '';
				const mapUsers: Map<IUserCreate['username'], IUserSecretsF['access_token']> =
					new Map<IUserCreate['username'], IUserSecretsF['access_token']>(
						JSON.parse(users),
					);

				console.log('mapUsers r', mapUsers);
				console.log('matrix', matrix);

				if (mapUsers.has(payload.username)) {
					throw new Error('202ae438-30a8-4c91-bc4a-5e2078c0b860');
				}

				console.log('matrix r', matrix);

				const mapMatrix: Map<IUserCreate['username'], MatrixElement[][]> =
					new Map<IUserCreate['username'], MatrixElement[][]>(
						matrix ? JSON.parse(matrix) : [],
					);

				mapMatrix.set(payload.username, this.getArr());

				console.log('mapMatrix r', mapMatrix);

				this.localSyncStorage.setItem(StorageKeys.Matrix, JSON.stringify(Array.from(mapMatrix.entries())));

				return this.authApiService.register(payload).pipe(
					map((user: IUserAuth) => {
						const state = ctx.getState();

						ctx.setState({
							...state,
							logged: true,
							user: user,
							error: {},
						});

						mapUsers.set(payload.username, user.access_token);

						this.localSyncStorage.setItem(StorageKeys.AuthToken, user.access_token);
						this.localAsyncStorage.setItems({
							[StorageKeys.AuthToken]: user.access_token,
							[StorageKeys.Users]: JSON.stringify(Array.from(mapUsers.entries())),
						});

						return ctx.dispatch(new AuthActions.RegisterSuccess(user));
					}),
				);
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

	private getArr(): MatrixElement[][] {
		const array: number[] = Array(128)
			.fill(null)
			.map((u, i) => i); //массив, можно использовать массив объектов
		const size = 1; //размер подмассива
		const subarray: MatrixElementBase[][] = []; //массив в который будет выведен результат.
		for (let i = 0; i < Math.ceil(array.length / size); i++) {
			subarray[i] =
				i === 55
					? [
						new MatrixElement({
							_placeId: 55,
							_iconId: 1,
							_icon: "tuiIconFileLarge",
							_name: '1',
							_mime: EFileType.FILE,
							_content: '',
						}),
					]
					: i === 56
						? [
							new MatrixElement({
								_placeId: 56,
								_iconId: 2,
								_icon: 'tuiIconFolderLarge',
								_name: '2',
								_mime: EFileType.FOLDER,
								_content: '',
							}),
						]
						: [];
		}
		console.log('subarray', subarray);
		// @ts-expect-error
		return subarray;
	}
}
