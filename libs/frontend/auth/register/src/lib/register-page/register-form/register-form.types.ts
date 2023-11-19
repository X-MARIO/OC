import type { IUserCreate } from '@oc/frontend-api/types/user';

export enum FormModelRegister {
	email = 'email',
	username = 'username',
	password = 'password',
}

export interface IFormModelRegister {
	[FormModelRegister.email]: IUserCreate['email'];
	[FormModelRegister.username]: IUserCreate['username'];
	[FormModelRegister.password]: IUserCreate['password'];
}
