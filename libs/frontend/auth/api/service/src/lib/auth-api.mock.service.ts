import { Injectable } from '@angular/core';
import { ApiService } from '@oc/core/api/service';
import type {
	IUserAuth,
	IUserCreate,
	IUserLogin,
	IUserRecovery,
} from '@oc/frontend-api/types/user';
import sign from 'jwt-encode';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';

export enum AuthApiRoutesEnum {
	LOGIN = 'login',
	RECOVERY = 'recovery',
	REGISTER = 'register',
}

export const AUTH_API_ROUTES: Record<AuthApiRoutesEnum, string> = {
	[AuthApiRoutesEnum.LOGIN]: '/users/login',
	[AuthApiRoutesEnum.RECOVERY]: '/users/recovery',
	[AuthApiRoutesEnum.REGISTER]: '/users',
};

@Injectable()
export class AuthApiMockService {
	public constructor(private readonly apiService: ApiService) {}

	public login(payload: IUserLogin): Observable<IUserAuth> {
		const secret = 'secret';
		const jwt: string = sign(payload, secret);

		const result: IUserAuth = {
			access_token: jwt,
			token_type: 'T',
			expires_in: 10000,
		};

		return of(result);
	}

	public recovery(payload: IUserRecovery): Observable<void> {
		return this.apiService.post(AUTH_API_ROUTES[AuthApiRoutesEnum.RECOVERY], payload);
	}

	public register(payload: IUserCreate): Observable<IUserAuth> {
		const secret = 'secret';
		const jwt: string = sign(payload, secret);

		const result: IUserAuth = {
			access_token: jwt,
			token_type: 'T',
			expires_in: 10000,
		};

		return of(result);
	}
}
