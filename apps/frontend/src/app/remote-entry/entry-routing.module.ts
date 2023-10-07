import type { Type } from '@angular/core';
import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import type { PagesModule } from '@oc/frontend/ngxs/auth/pages';

const routes: Routes = [
	{
		path: '',
		loadChildren: async (): Promise<Type<PagesModule>> => {
			return import('@oc/frontend/ngxs/auth/pages').then(
				(m: { PagesModule: Type<PagesModule> }) => m.PagesModule,
			);
		},
	},
	{ path: '', redirectTo: '', pathMatch: 'full' },
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EntryRoutingModule {}
