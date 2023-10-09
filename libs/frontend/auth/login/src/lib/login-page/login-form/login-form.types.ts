import type { IUserLogin } from '@oc/frontend-api/types/user';

export enum FormModelLogin {
	username = 'username',
	password = 'password',
}

export interface IFormModelLogin {
	[FormModelLogin.username]: IUserLogin['username'];
	[FormModelLogin.password]: IUserLogin['password'];
}
