import { RecoveryPageComponent } from './recovery-page/recovery-page.component';

import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: RecoveryPageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RecoveryPageRoutingModule {}
