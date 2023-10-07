import { concatMap, map, take } from 'rxjs/operators';

import type { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionAsyncStorage } from '@oc/core/storage/session';
import { StorageKeys } from '@oc/frontend-api/types/model';
import type { IUserSecretsF } from '@oc/frontend-api/types/user';
import { decodeJwt } from 'jose';
import type { JWTPayload } from 'jose/dist/types/types';
import type { Observable } from 'rxjs';

export interface IRequestUpdate {
	setHeaders?: {
		Authorization: string;
	};
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	public constructor(private readonly sessionAsyncStorage: SessionAsyncStorage) {}

	public intercept<Body = unknown>(
		req: HttpRequest<Body>,
		next: HttpHandler,
	): Observable<HttpEvent<Body>> {
		return req.url.includes('/users/login')
			? next.handle(req)
			: this.getAuthHeader().pipe(
					concatMap((reqUpdate: IRequestUpdate) =>
						next.handle(req.clone<Body>(reqUpdate)),
					),
			  );
	}

	public getAuthHeader(): Observable<IRequestUpdate> {
		return this.sessionAsyncStorage
			.getItem<IUserSecretsF['access_token']>(StorageKeys.AuthToken)
			.pipe(
				take(1),
				map((authToken: IUserSecretsF['access_token'] | null) => {
					if (!authToken) {
						return {};
					}

					const token: JWTPayload = decodeJwt(authToken);

					if (!token.exp) {
						return {};
					}

					const valid: boolean = token.exp ? Date.now().valueOf() >= token.exp : true;

					return valid ? { setHeaders: { Authorization: `Bearer ${authToken}` } } : {};
				}),
			);
	}
}
