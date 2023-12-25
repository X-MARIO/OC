import { InjectionToken } from '@angular/core';

export interface INavigationPaths {
	home: string;
	dashboard: string;
	dashboardFileEdit: string;
	dashboardFileRename: string;
	dashboardFileDelete: string;
	dashboardCreate: string;
	process: string;
	about: string;

	auth: string;
	authLogin: string;
	authRecovery: string;
	authRegister: string;

	user: string;
	notFound: string;
}

export const NAVIGATION_PATHS: INavigationPaths = {
	home: '',
	dashboard: 'dashboard',
	dashboardFileEdit: 'dashboard/file/edit',
	dashboardFileRename: 'dashboard/file/rename',
	dashboardFileDelete: 'dashboard/file/delete',
	dashboardCreate: 'dashboard/create',
	process: 'dashboard/process',
	about: 'dashboard/about',

	auth: 'auth',
	authLogin: 'auth/login',
	authRecovery: 'auth/recovery',
	authRegister: 'auth/register',

	user: 'user',

	notFound: 'not-found',
};

export const routesNameEnumNames: Record<string, string> = {
	[NAVIGATION_PATHS.home]: 'Текущая',
	[NAVIGATION_PATHS.dashboard]: 'Актуальная',
	[NAVIGATION_PATHS.authLogin]: 'Войти',
	[NAVIGATION_PATHS.authRegister]: 'Регистрация',
};

export interface INavigationLink {
	route: string;
	label: string;
	params?: Record<string, any>;
}

export const PATHS = new InjectionToken<Record<string, any>>('NavigationPaths');
