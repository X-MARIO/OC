import { InjectionToken } from '@angular/core';

export interface IEnvironments {
	production: boolean;
}

export const ENVIRONMENTS = new InjectionToken<Partial<IEnvironments>>('ENVIRONMENTS');

export const ENVIRONMENTS_DEFAULT: IEnvironments = {
	production: false,
};
