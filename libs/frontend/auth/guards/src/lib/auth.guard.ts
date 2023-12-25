import { map, take } from 'rxjs/operators';

import { Inject, Injectable } from '@angular/core';
import type { CanActivate, UrlTree } from '@angular/router';
import { INavigationPaths, PATHS } from '@oc/core/navigation/common';
import { NavigationService } from '@oc/core/navigation/service';
import { StorageKeys } from '@oc/frontend-api/types/model';
import type { IUserSecretsF } from '@oc/frontend-api/types/user';
import type { Observable } from 'rxjs';
import { LocalAsyncStorage } from 'storage-local';

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(
		private readonly navigationService: NavigationService,
		private readonly localAsyncStorage: LocalAsyncStorage,
		@Inject(PATHS) private readonly paths: INavigationPaths,
	) {}

	public canActivate(): Observable<UrlTree | boolean> {
		return this.localAsyncStorage
			.getItem<IUserSecretsF['access_token']>(StorageKeys.AuthToken)
			.pipe(
				take(1),
				map((authToken: IUserSecretsF['access_token'] | null) => {
					if (Boolean(authToken)) {
						this.navigationService
							.navigateByUrl(this.navigationService.getPaths().dashboard)
							.then()
							.catch();
					}

					return !Boolean(authToken);
				}),
			);
	}
}
