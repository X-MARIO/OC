import { PageComponent } from './page.component';

import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

/**
 * Dashboard page
 */
const routes: Routes = [
	{
		path: '',
		component: PageComponent,
	},
	{ path: '', redirectTo: '', pathMatch: 'full' },
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

/**
 * Dashboard page
 */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PageRoutingModule {}
