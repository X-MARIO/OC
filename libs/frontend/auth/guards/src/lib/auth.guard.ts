import { map, take } from 'rxjs/operators';

import { Inject, Injectable } from '@angular/core';
import type { CanActivate, UrlTree } from '@angular/router';
import { INavigationPaths, PATHS } from '@oc/core/navigation/common';
import { NavigationService } from '@oc/core/navigation/service';
import { SessionAsyncStorage } from '@oc/core/storage/session';
import { StorageKeys } from '@oc/frontend-api/types/model';
import type { IUserSecretsF } from '@oc/frontend-api/types/user';
import type { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(
		private readonly navigationService: NavigationService,
		private readonly sessionAsyncStorage: SessionAsyncStorage,
		@Inject(PATHS) private readonly paths: INavigationPaths,
	) {}

	public canActivate(): Observable<UrlTree | boolean> {
		return this.sessionAsyncStorage
			.getItem<IUserSecretsF['access_token']>(StorageKeys.AuthToken)
			.pipe(
				take(1),
				map(
					(authToken: IUserSecretsF['access_token'] | null) =>
						!Boolean(authToken) ||
						this.navigationService.createUrlTree(this.paths.home),
				),
			);
	}
}
