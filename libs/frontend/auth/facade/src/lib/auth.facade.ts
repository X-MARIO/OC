import { Injectable } from '@angular/core';
import type {
	IUserAuth,
	IUserCreate,
	IUserLogin,
	IUserRecovery,
} from '@oc/frontend-api/types/user';
import type { Observable } from 'rxjs';

/**
 * Facade to encapsulate State Management such as Ngxs
 */
@Injectable()
export abstract class AuthFacade {
	/**
	 * A flag that indicates whether posts have been logged in by the user.
	 */
	public logged$!: Observable<boolean | null>;

	/**
	 * A flag that indicates whether posts have been logged in by the user.
	 */
	public user$!: Observable<IUserAuth | undefined>;

	/**
	 * A flag that indicates whether posts have been logged in by the user.
	 */
	public error$!: Observable<Record<string, any>>;

	/**
	 * The user is logged in successfully
	 */
	public loginSuccess$!: Observable<IUserAuth>;

	/**
	 * The user is logged in unsuccessfully
	 */
	public loginFailure$!: Observable<Record<string, any>>;

	/**
	 * The user has successfully reset the password
	 */
	public recoverySuccess$!: Observable<void>;

	/**
	 * The user has unsuccessfully reset the password
	 */
	public recoveryFailure$!: Observable<Record<string, any>>;

	/**
	 * The user has been successfully registered
	 */
	public registerSuccess$!: Observable<IUserAuth>;

	/**
	 * The user has been unsuccessfully registered
	 */
	public registerFailure$!: Observable<Record<string, any>>;

	/**
	 * Storage cleared successfully
	 */
	public clearSuccess$!: Observable<void>;

	/**
	 * Storage cleared unsuccessfully
	 */
	public clearFailure$!: Observable<Record<string, any>>;

	/**
	 * User authorization method
	 * @param payload IUserLogin
	 */
	public abstract login(payload: IUserLogin): void;

	/**
	 * Method of exiting the profile
	 */
	public abstract logout(): void;

	/**
	 * User recovery method
	 * @param payload IUserRecovery
	 */
	public abstract recovery(payload: IUserRecovery): void;

	/**
	 * User register method
	 * @param payload IUserCreateFriend
	 */
	public abstract register(payload: IUserCreate): void;

	/**
	 * Method clear storage
	 */
	public abstract clear(): void;
}
