import { LoginPageComponent } from './login-page/login-page.component';

import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: LoginPageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LoginPageRoutingModule {}
