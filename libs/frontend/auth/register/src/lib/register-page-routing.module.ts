import { RegisterPageComponent } from './register-page/register-page.component';

import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: RegisterPageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RegisterPageRoutingModule {}
