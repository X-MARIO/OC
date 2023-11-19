import type {
	IUserAuth,
	IUserCreate,
	IUserLogin,
	IUserRecovery,
} from '@oc/frontend-api/types/user';

export class Init {
	public static readonly type = '[Auth] Init';
}

export class Login {
	public static readonly type = '[Auth] Login';

	public constructor(public readonly payload: IUserLogin) {}
}

export class LoginSuccess {
	public static readonly type = '[Auth] Login Success';

	public constructor(public readonly payload: IUserAuth) {}
}

export class LoginFailure {
	public static readonly type = '[Auth] Login Failure';

	public constructor(public readonly error: Record<string, any>) {}
}

export class Logout {
	public static readonly type = '[Auth] Logout';
}

export class LogoutSuccess {
	public static readonly type = '[Auth] Logout Success';
}

export class LogoutFailure {
	public static readonly type = '[Auth] Logout Failure';

	public constructor(public readonly error: Record<string, any>) {}
}

export class Restore {
	public static readonly type = '[Auth] Restore';

	public constructor(public readonly logged: boolean) {}
}

export class RestoreSuccess {
	public static readonly type = '[Auth] Restore Success';
}

export class RestoreFailure {
	public static readonly type = '[Auth] Restore Failure';

	public constructor(public readonly error: Record<string, any>) {}
}

export class Recovery {
	public static readonly type = '[Auth] Recovery';

	public constructor(public readonly payload: IUserRecovery) {}
}

export class RecoverySuccess {
	public static readonly type = '[Auth] Recovery Success';
}

export class RecoveryFailure {
	public static readonly type = '[Auth] Recovery Failure';

	public constructor(public readonly error: Record<string, any>) {}
}

export class Register {
	public static readonly type = '[Auth] Register';

	public constructor(public readonly payload: IUserCreate) {}
}

export class RegisterSuccess {
	public static readonly type = '[Auth] Register Success';

	public constructor(public readonly payload: IUserAuth) {}
}

export class RegisterFailure {
	public static readonly type = '[Auth] Register Failure';

	public constructor(public readonly error: Record<string, any>) {}
}

export class Clear {
	public static readonly type = '[Auth] Clear';
}

export class ClearSuccess {
	public static readonly type = '[Auth] Clear Success';
}

export class ClearFailure {
	public static readonly type = '[Auth] Clear Failure';

	public constructor(public readonly error: Record<string, any>) {}
}
