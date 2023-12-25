import type { Type } from '@angular/core';
import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import type { PageModule } from '@oc/frontend/dashboard/pages';

/**
 * Routes for Ngxs application
 */
const routes: Routes = [
	{
		path: '',
		// canActivate: [AccessTokenCheckGuard],
		loadChildren: async (): Promise<Type<PageModule>> => {
			return import('@oc/frontend/dashboard/pages').then(
				(m: { PageModule: Type<PageModule> }) => m.PageModule,
			);
		},
	},
];

/**
 * Router module for Ngxs application
 */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PagesRoutingModule {}
