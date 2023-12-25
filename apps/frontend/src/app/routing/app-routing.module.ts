import type { Type } from '@angular/core';
import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NAVIGATION_PATHS } from '@oc/core/navigation/common';
import { AccessTokenCheckGuard } from '@oc/frontend/auth/guards';
import type { PagesModule as AuthPagesModule } from '@oc/frontend/ngxs/auth/pages';
import type { PagesModule as DashboardPagesModule } from '@oc/frontend/ngxs/dashboard/pages';
import { HeaderComponent } from '@oc/frontend/ui/header';
import { LayoutComponent } from '@oc/ui/layout';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				component: HeaderComponent,
				outlet: 'header',
			},
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full',
			},
			{
				path: 'dashboard',
				canActivate: [AccessTokenCheckGuard],
				loadChildren: async (): Promise<Type<DashboardPagesModule>> => {
					return import('@oc/frontend/ngxs/dashboard/pages').then(
						(m: { PagesModule: Type<DashboardPagesModule> }) => m.PagesModule,
					);
				},
			},
			{
				path: NAVIGATION_PATHS.auth,
				loadChildren: async (): Promise<Type<AuthPagesModule>> => {
					return import('@oc/frontend/ngxs/auth/pages').then(
						(m: { PagesModule: Type<AuthPagesModule> }) => m.PagesModule,
					);
				},
			},
		],
	},
	{ path: '', redirectTo: NAVIGATION_PATHS.auth, pathMatch: 'full' },
	{ path: '**', redirectTo: NAVIGATION_PATHS.auth, pathMatch: 'full' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			initialNavigation: 'enabledBlocking',
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
