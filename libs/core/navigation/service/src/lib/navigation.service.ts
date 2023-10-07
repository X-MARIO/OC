import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import type { NavigationExtras, UrlCreationOptions, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { INavigationPaths, PATHS } from '@oc/core/navigation/common';

@Injectable({
	providedIn: 'root',
})
export class NavigationService {
	public constructor(
		private readonly router: Router,
		@Inject(PATHS) private readonly paths: INavigationPaths,
		@Inject(DOCUMENT) public readonly document: Document,
	) {}

	public get url(): string {
		return this.router.url;
	}

	public getPaths(): INavigationPaths {
		return this.paths;
	}

	public createUrlTree(
		path: (number | string)[] | string,
		navigationExtras?: UrlCreationOptions,
	): UrlTree {
		return this.router.createUrlTree(
			typeof path === 'string' ? this.getRoute(path) : path,
			navigationExtras,
		);
	}

	public getRoute(navigationPath: string, params: Record<string, any> = {}): (number | string)[] {
		const segments = navigationPath.split('/').filter((value) => value?.length);
		const routeWithParams: (number | string)[] = ['/'];

		for (const segment of segments) {
			if (segment.startsWith(':')) {
				const paramName = segment.slice(1);
				if (params && params[paramName]) {
					routeWithParams.push(params[paramName]);
				} else {
					routeWithParams.push(paramName);
				}
			} else {
				routeWithParams.push(segment);
			}
		}

		return routeWithParams;
	}

	public async navigate(
		navigationPath: (number | string)[],
		extras?: NavigationExtras,
	): Promise<boolean> {
		return this.router.navigate(navigationPath, extras);
	}

	public async navigateByUrl(
		navigationPath: string,
		params?: Record<string, any>,
		extras?: NavigationExtras,
	): Promise<boolean> {
		return this.navigate(this.getRoute(navigationPath, params), extras);
	}

	public goToPage(navigationPath: string): void {
		this.document.location.href = navigationPath;
	}
}
