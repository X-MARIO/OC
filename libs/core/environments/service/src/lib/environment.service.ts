import type { IEnvironments } from './environment.interface';
import { ENVIRONMENTS, ENVIRONMENTS_DEFAULT } from './environment.interface';

import { Inject, Injectable, Optional } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class EnvironmentService {
	private readonly environments: IEnvironments;

	public constructor(
		@Optional() @Inject(ENVIRONMENTS) environments: Partial<IEnvironments> | null,
	) {
		this.environments = { ...ENVIRONMENTS_DEFAULT, ...environments };
	}

	public getEnvironments(): IEnvironments {
		return this.environments;
	}
}
