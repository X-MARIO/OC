import type { IConfig } from './config.interface';

import { Injectable } from '@angular/core';

export const CONFIG_DEFAULT: IConfig = {
	apiHost: '',
	apiPrefix: '',
	version: 'local',
};

@Injectable({
	providedIn: 'root',
})
export class ConfigService {
	public readonly config: IConfig;

	public constructor() {
		this.config = {
			apiHost: process.env['API_HOST'] ?? CONFIG_DEFAULT.apiHost,
			apiPrefix: process.env['API_PREFIX'] ?? CONFIG_DEFAULT.apiPrefix,
			version: process.env['VERSION'] ?? CONFIG_DEFAULT.version,
		};
	}

	public getConfig(): IConfig {
		return this.config;
	}
}
