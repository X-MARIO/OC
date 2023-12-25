import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import type { MatrixElementBase } from 'types-matrix';

@Injectable({
	providedIn: 'root',
})
export class MatrixEmitService<T extends MatrixElementBase = MatrixElementBase> {
	private matrixData: T[][] = [];

	private readonly matrixData$: BehaviorSubject<T[][]> = new BehaviorSubject<T[][]>([]);

	public getMatrixData$(): Observable<T[][]> {
		return this.matrixData$.asObservable();
	}

	public setMatrixData(value: T[][]): void {
		this.matrixData = value;
		this.matrixData$.next(value);
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
}
