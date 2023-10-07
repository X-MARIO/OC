import type { Flavor, ICodeTitle } from '@oc/core/types';
import type { User, UserDB, UserSecrets } from '@oc/frontend-api/types/model';

export type IUserIdField = Flavor<User['id'], 'User-id-field'>;
export type IUserUsernameField = Flavor<User['username'], 'User-username-field'>;
export type IUserEmailField = Flavor<User['email'], 'User-email-field'>;
export type IUserPasswordField = Flavor<User['password'], 'User-password-field'>;
export type IUserPromoCodeField = Flavor<string, 'User-promoCode-field'>;
export type IUserCreatedAtField = Flavor<UserDB['createdAt'], 'User-createdAt-field'>;
export type IUserUpdatedAtField = Flavor<UserDB['updatedAt'], 'User-updatedAt-field'>;

export type TTokenType = UserSecrets['token_type'];

export type ITokenType = ICodeTitle<TTokenType>;

export type AccessTokenField = Flavor<UserSecrets['access_token'], 'User-access_token-field'>;
export type TokenTypeField = Flavor<TTokenType, 'User-token_type-field'>;
export type ExpiresInField = Flavor<UserSecrets['expires_in'], 'User-ExpiresIn-field'>;

export interface IUserF extends User {
	/**
	 * Ункальный идентификатор пользователя
	 */
	readonly id: IUserIdField;
	/**
	 * Уникальный тектовый идентификатор пользователя
	 */
	readonly username: IUserUsernameField;
	/**
	 * Почта пользователя
	 */
	readonly email: IUserEmailField;
	/**
	 * Пароль пользователя
	 */
	readonly password: IUserPasswordField;
	/**
	 * Промокод действующего пользователя
	 */
	readonly promoCode?: IUserPromoCodeField;
}

export interface IUserDBF extends UserDB {
	readonly createdAt: IUserCreatedAtField;
	readonly updatedAt: IUserUpdatedAtField;
}

export interface IUserSecretsF extends UserSecrets {
	/**
	 * Дата до которой действует токен авторизации
	 */
	access_token: AccessTokenField;
	token_type: TokenTypeField;
	/**
	 * Дата до которой действует токен авторизации
	 */
	expires_in: ExpiresInField;
}

export type IUserAuth = IUserSecretsF;

export type IUserLogin = Required<Readonly<Pick<User, 'email' | 'password'>>>;

export type IUserRecovery = Required<Readonly<Pick<User, 'email'>>>;

export type IUserCreate = Required<Readonly<Pick<User, 'email' | 'password' | 'username'>>>;

export type IUserCreatePromo = IUserCreate & { promoCode?: IUserF['promoCode'] };
