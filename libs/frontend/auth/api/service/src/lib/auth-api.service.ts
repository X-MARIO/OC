import { Injectable } from '@angular/core';
import { ApiService } from '@oc/core/api/service';
import type {
	IUserAuth,
	IUserCreate,
	IUserLogin,
	IUserRecovery,
} from '@oc/frontend-api/types/user';
import type { Observable } from 'rxjs';

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
export class AuthApiService {
	public constructor(private readonly apiService: ApiService) {}

	public login(payload: IUserLogin): Observable<IUserAuth> {
		return this.apiService.post<IUserAuth>(AUTH_API_ROUTES[AuthApiRoutesEnum.LOGIN], payload);
	}

	public recovery(payload: IUserRecovery): Observable<void> {
		return this.apiService.post(AUTH_API_ROUTES[AuthApiRoutesEnum.RECOVERY], payload);
	}

	public register(payload: IUserCreate): Observable<IUserAuth> {
		return this.apiService.post<IUserAuth>(
			AUTH_API_ROUTES[AuthApiRoutesEnum.REGISTER],
			payload,
		);
	}
}
