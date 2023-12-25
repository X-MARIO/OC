import type { Type } from '@angular/core';
import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@oc/frontend/auth/guards';
import type { LoginPageModule } from '@oc/frontend/auth/login';
import type { RecoveryPageModule } from '@oc/frontend/auth/recovery';
import type { RegisterPageModule } from '@oc/frontend/auth/register';

/**
 * Auth page
 */
const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full',
	},
	{
		path: 'login',
		canActivate: [AuthGuard],
		loadChildren: async (): Promise<Type<LoginPageModule>> => {
			return import('@oc/frontend/auth/login').then(
				(m: { LoginPageModule: Type<LoginPageModule> }) => m.LoginPageModule,
			);
		},
	},
	{
		path: 'register',
		canActivate: [AuthGuard],
		loadChildren: async (): Promise<Type<RegisterPageModule>> => {
			return import('@oc/frontend/auth/register').then(
				(m: { RegisterPageModule: Type<RegisterPageModule> }) => m.RegisterPageModule,
			);
		},
	},
	{
		path: 'recovery',
		canActivate: [AuthGuard],
		loadChildren: async (): Promise<Type<RecoveryPageModule>> => {
			return import('@oc/frontend/auth/recovery').then(
				(m: { RecoveryPageModule: Type<RecoveryPageModule> }) => m.RecoveryPageModule,
			);
		},
	},
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: '**', redirectTo: 'login', pathMatch: 'full' },
];

/**
 * Auth page
 */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PageRoutingModule {}
