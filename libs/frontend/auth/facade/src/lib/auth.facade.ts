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
	 * Storage cleared successfully
	 */
	public clearSuccess$!: Observable<void>;

	/**
	 * Storage cleared unsuccessfully
	 */
	public clearFailure$!: Observable<Record<string, any>>;

	/**
	 * Get process method
	 * @param payload IUserLogin
	 */
	public abstract getProcess(payload: IUserLogin): void;

	/**
	 * Method clear storage
	 */
	public abstract clear(): void;
}
