import { BehaviorSubject, take } from 'rxjs';

import { Injectable } from '@angular/core';
import type { Flavor } from '@oc/core/types';
import type { Observable } from 'rxjs';

export type IMatrixElementBasePlaceId = Flavor<number, 'IMatrixElementBaseId-placeId'>;

export interface IMatrixElementBase {
	readonly _placeId: IMatrixElementBasePlaceId;
}

export class MatrixElementBase implements IMatrixElementBase {
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

export class MatrixElementShort extends MatrixElementBase implements IMatrixElementShort {
	public readonly _iconId: IMatrixElementShort['_iconId'] = -1;

	public readonly _mime: IMatrixElementShort['_mime'] = EFileType.FILE;

	public readonly _icon: IMatrixElementShort['_icon'] = '';

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

export class MatrixElement extends MatrixElementShort implements IMatrixElement {
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

export interface IQueryParamsEditIcon {
	readonly iconId: IMatrixElementShort['_iconId'];
}

@Injectable({
	providedIn: 'root',
})
export class MatrixEmitService<T extends MatrixElementBase = MatrixElementBase> {
	private matrixData: T[][] = [];

	private readonly matrixData$: BehaviorSubject<T[][]> = new BehaviorSubject<T[][]>([]);

	private hasInit = false;

	public initialize(): Observable<T[][]> {
		if (this.hasInit) {
			return this.getMatrixData$().pipe(take(1));
		}

		this.hasInit = true;
		this.setMatrixData(this.getArr());
		return this.getMatrixData$().pipe(take(1));
	}

	public getMatrixData(): T[][] {
		return this.matrixData;
	}

	public getMatrixData$(): Observable<T[][]> {
		return this.matrixData$.asObservable();
	}

	public setMatrixData(value: T[][]): void {
		this.matrixData = value;
		this.matrixData$.next(value);
	}

	public create(): Observable<T[][]> {
		return this.getMatrixData$();
	}

	public update(data: T): Observable<T[][]> {
		const el: T[] | undefined = this.matrixData.find(
			(value: T[]) => value[0]?.placeId === data.placeId,
		);

		if (!el) {
			throw new Error('');
		}

		const matrixEl: T | undefined = el[0];

		if (matrixEl === undefined) {
			throw new Error('');
		}

		matrixEl.update(data);

		this.setMatrixData(this.matrixData);

		return this.getMatrixData$();
	}

	public delete(): Observable<T[][]> {
		return this.getMatrixData$();
	}

	private getArr(): T[][] {
		const array: number[] = Array(128)
			.fill(null)
			.map((u, i) => i); //массив, можно использовать массив объектов
		const size = 1; //размер подмассива
		const subarray: MatrixElementBase[][] = []; //массив в который будет выведен результат.
		for (let i = 0; i < Math.ceil(array.length / size); i++) {
			subarray[i] =
				i === 55
					? [
							new MatrixElement({
								_placeId: 55,
								_iconId: 1,
								_icon: 'tuiIconFileLarge',
								_name: '1',
								_mime: EFileType.FILE,
								_content: '',
							}),
					  ]
					: i === 56
					? [
							new MatrixElement({
								_placeId: 56,
								_iconId: 2,
								_icon: 'tuiIconFolderLarge',
								_name: '2',
								_mime: EFileType.FOLDER,
								_content: '',
							}),
					  ]
					: [];
		}
		console.log('subarray', subarray);
		// @ts-expect-error
		return subarray;
	}
}
