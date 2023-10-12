import { Inject, Injectable } from '@angular/core';
import type { CanActivate, UrlTree } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { INavigationPaths, PATHS } from '@oc/core/navigation/common';
import { NavigationService } from '@oc/core/navigation/service';
import { SessionAsyncStorage } from '@oc/core/storage/session';
import { StorageKeys } from '@oc/frontend-api/types/model';
import type { IUserSecretsF } from '@oc/frontend-api/types/user';
import { AuthFacade } from '@oc/frontend/auth/facade';
import { decodeJwt } from 'jose';
import type { JWTPayload } from 'jose/dist/types/types';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AccessTokenCheckGuard implements CanActivate {
	public constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly authFacade: AuthFacade,
		private readonly navigationService: NavigationService,
		private readonly sessionAsyncStorage: SessionAsyncStorage,
		@Inject(PATHS) private readonly paths: INavigationPaths,
	) {}

	public canActivate(): Observable<UrlTree | boolean> {
		return of(true);

		return this.sessionAsyncStorage
			.getItem<IUserSecretsF['access_token']>(StorageKeys.AuthToken)
			.pipe(
				take(1),
				map((authToken: IUserSecretsF['access_token'] | null) => {
					if (!authToken) {
						return this.navigationService.createUrlTree(this.paths.authLogin);
					}

					const token: JWTPayload = decodeJwt(authToken);

					if (!token.exp) {
						this.authFacade.logout();
						return this.navigationService.createUrlTree(this.paths.authLogin);
					}

					const valid: boolean = token.exp ? Date.now().valueOf() >= token.exp : true;

					if (valid) {
						return true;
					}

					this.authFacade.logout();

					return this.navigationService.createUrlTree(this.paths.authLogin);
				}),
			);
	}
}
