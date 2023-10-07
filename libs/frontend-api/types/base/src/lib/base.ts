import type { Flavor } from '@oc/core/types';

export type IBaseCreatedAt = Flavor<number, 'IBaseCreatedAt'>;
export type IBaseUpdatedAt = Flavor<number, 'IBaseUpdatedAt'>;

export interface IBase {
	readonly id: number;
	readonly createdAt: IBaseCreatedAt;
	readonly updatedAt: IBaseUpdatedAt;
}

export abstract class BaseEntity implements IBase {
	public readonly id: number = 0;

	public readonly createdAt: number = 0;

	public readonly updatedAt: number = 0;
}
