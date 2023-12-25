import { BehaviorSubject, take } from 'rxjs';

import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { MatrixElementBase } from 'types-matrix';
import { EFileType, MatrixElement } from 'types-matrix';

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
