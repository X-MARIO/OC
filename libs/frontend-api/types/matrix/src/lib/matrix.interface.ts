import type { Flavor } from '@oc/core/types';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export type IMatrixElementBasePlaceId = Flavor<number, 'IMatrixElementBaseId-placeId'>;

export interface IMatrixElementBase {
	readonly _placeId: IMatrixElementBasePlaceId;
}

@Exclude()
export class MatrixElementBase implements IMatrixElementBase {
	@IsNotEmpty()
	@IsNumber()
	@Expose()
	@Type(() => Number)
	public readonly _placeId: IMatrixElementBase['_placeId'] = -1;

	public constructor(params: IMatrixElementBase) {
		this.update(params);
	}

	public get placeId(): IMatrixElementBase['_placeId'] {
		return this._placeId;
	}

	public update(params: Partial<IMatrixElementBase>): this {
		return Object.assign(this, params);
	}
}

export enum EFileType {
	FILE = 'file',
	FOLDER = 'folder',
}

export type IMatrixElementShortIconId = Flavor<number, 'IMatrixElementShort-iconId'>;
export type IMatrixElementShortMime = Flavor<EFileType, 'IMatrixElementShort-mime'>;
export type IMatrixElementShortIcon = Flavor<string, 'IMatrixElementShort-icon'>;
export type IMatrixElementShortName = Flavor<string, 'IMatrixElementShort-name'>;
export type IMatrixElementShortContent = Flavor<string, 'IMatrixElementShort-content'>;

export interface IMatrixElementShort extends IMatrixElementBase {
	readonly _iconId: IMatrixElementShortIconId;
	readonly _mime: IMatrixElementShortMime;
	readonly _icon: IMatrixElementShortIcon;
	readonly _name: IMatrixElementShortName;
}

@Exclude()
export class MatrixElementShort extends MatrixElementBase implements IMatrixElementShort {
	@IsNotEmpty()
	@IsNumber()
	@Expose()
	@Type(() => Number)
	public readonly _iconId: IMatrixElementShort['_iconId'] = -1;

	@IsNotEmpty()
	@Expose()
	public readonly _mime: IMatrixElementShort['_mime'] = EFileType.FILE;

	@IsNotEmpty()
	@IsString()
	@Expose()
	@Type(() => String)
	public readonly _icon: IMatrixElementShort['_icon'] = '';

	@IsNotEmpty()
	@IsString()
	@Expose()
	@Type(() => String)
	public readonly _name: IMatrixElementShort['_name'] = '';

	public constructor(params: IMatrixElementShort) {
		super(params);
		this.update(params);
	}

	public get iconId(): IMatrixElementShort['_iconId'] {
		return this._iconId;
	}

	public get type(): IMatrixElementShort['_mime'] {
		return this._mime;
	}

	public get icon(): IMatrixElementShort['_icon'] {
		return this._icon;
	}

	public get name(): IMatrixElementShort['_name'] {
		return this._name;
	}

	public override update(params: Partial<IMatrixElementShort>): this {
		return Object.assign(this, params);
	}
}

export interface IMatrixElement extends IMatrixElementShort {
	readonly _content: IMatrixElementShortContent;
}

@Exclude()
export class MatrixElement extends MatrixElementShort implements IMatrixElement {
	@IsNotEmpty()
	@IsString()
	@Expose()
	public readonly _content: IMatrixElement['_content'] = '';

	public constructor(params: IMatrixElement) {
		super(params);
		this.update(params);
	}

	public get content(): IMatrixElement['_content'] {
		return this._content;
	}

	public override update(params: Partial<IMatrixElement>): this {
		return Object.assign(this, params);
	}
}

export interface IQueryParamsBase {
	readonly iconId: IMatrixElementShort['_iconId'];
}

export interface IQueryParamsCreate extends IQueryParamsBase {
	readonly fileType: IMatrixElementShort['_mime'];
}
