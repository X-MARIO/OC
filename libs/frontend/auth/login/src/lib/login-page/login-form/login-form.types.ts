import type { IUserLogin } from '@oc/frontend-api/types/user';

export enum FormModelLogin {
	email = 'email',
	password = 'password',
}

export interface IFormModelLogin {
	[FormModelLogin.email]: IUserLogin['email'];
	[FormModelLogin.password]: IUserLogin['password'];
}
