import { map } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthState } from './auth.state';

import { Injectable } from '@angular/core';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import type { AuthFacade } from '@oc/frontend/auth/facade';
import type { IUserCreate, IUserLogin, IUserRecovery } from '@oc/frontend-api/types/user';

/**
 * Ngxs implementation MatrixFacade
 */
@Injectable()
export class NgxsAuthFacade implements AuthFacade {
	@Select(AuthState.logged)
	public logged$!: AuthFacade['logged$'];

	@Select(AuthState.user)
	public user$!: AuthFacade['user$'];

	@Select(AuthState.error)
	public error$!: AuthFacade['error$'];

	public loginSuccess$: AuthFacade['loginSuccess$'] = this.actions$.pipe(
		ofActionDispatched(AuthActions.LoginSuccess),
		map(({ payload }) => payload),
	);

	public loginFailure$: AuthFacade['loginFailure$'] = this.actions$.pipe(
		ofActionDispatched(AuthActions.LoginFailure),
		map(({ error }) => error),
	);

	public recoverySuccess$: AuthFacade['recoverySuccess$'] = this.actions$.pipe(
		ofActionDispatched(AuthActions.RecoverySuccess),
		map(() => undefined),
	);

	public recoveryFailure$: AuthFacade['recoveryFailure$'] = this.actions$.pipe(
		ofActionDispatched(AuthActions.RecoveryFailure),
		map(({ error }) => error),
	);

	public registerSuccess$: AuthFacade['registerSuccess$'] = this.actions$.pipe(
		ofActionDispatched(AuthActions.RegisterSuccess),
		map(({ payload }) => payload),
	);

	public registerFailure$: AuthFacade['registerFailure$'] = this.actions$.pipe(
		ofActionDispatched(AuthActions.RegisterFailure),
		map(({ error }) => error),
	);

	public clearSuccess$: AuthFacade['clearSuccess$'] = this.actions$.pipe(
		ofActionDispatched(AuthActions.ClearSuccess),
		map(() => undefined),
	);

	public clearFailure$: AuthFacade['clearFailure$'] = this.actions$.pipe(
		ofActionDispatched(AuthActions.ClearFailure),
		map(({ error }) => error),
	);

	public constructor(private readonly store: Store, private readonly actions$: Actions) {}

	public login(payload: IUserLogin): void {
		this.store.dispatch(new AuthActions.Login(payload));
	}

	public logout(): void {
		this.store.dispatch(new AuthActions.Logout());
	}

	public recovery(payload: IUserRecovery): void {
		this.store.dispatch(new AuthActions.Recovery(payload));
	}

	public register(payload: IUserCreate): void {
		this.store.dispatch(new AuthActions.Register(payload));
	}

	public clear(): void {
		this.store.dispatch(new AuthActions.Clear());
	}
}
