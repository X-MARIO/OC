import { of } from 'rxjs';

import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NAVIGATION_PATHS, routesNameEnumNames } from '@oc/core/navigation/common';
import { AuthFacade } from '@oc/frontend/auth/facade';
import type { Observable } from 'rxjs';

export interface IMenuItem {
	title: string;
	navigation: string[];
}

@Component({
	selector: 'oc-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
	public readonly logged$: AuthFacade['logged$'] = this.authFacade.logged$;

	public menuItems$: Observable<IMenuItem[]> = of([]);

	public readonly home: IMenuItem = {
		title: 'Актуальная',
		navigation: [NAVIGATION_PATHS.home],
	};

	private readonly menu: IMenuItem[] = [
		{
			title: routesNameEnumNames[NAVIGATION_PATHS.authLogin],
			navigation: [NAVIGATION_PATHS.authLogin],
		},
		{
			title: routesNameEnumNames[NAVIGATION_PATHS.authRegister],
			navigation: [NAVIGATION_PATHS.authRegister],
		},
	];

	public constructor(
		private readonly authFacade: AuthFacade,
		private readonly router: Router,
	) {}

	public ngOnInit(): void {
		this.menuItems$ = of(this.menu);
	}

	public navigate(item: IMenuItem): void {
		void this.router.navigate(item.navigation).then().catch();
	}
}
