/**
 * OC
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { TokenType } from './tokenType';


export interface UserSecrets { 
    /**
     * Дата до которой действует токен авторизации
     */
    access_token: string;
    token_type: TokenType;
    /**
     * Дата до которой действует токен авторизации
     */
    expires_in: number;
}
export namespace UserSecrets {
}

