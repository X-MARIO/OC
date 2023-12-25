import { Injectable } from '@angular/core';
import { ApiService } from '@oc/core/api/service';
import { Observable, of } from 'rxjs';
import { EFileType, MatrixElement, type MatrixElementBase } from 'types-matrix';

export enum MatrixApiRoutesEnum {
	MATRIX = 'matrix',
}

export const MATRIX_API_ROUTES: Record<MatrixApiRoutesEnum, string> = {
	[MatrixApiRoutesEnum.MATRIX]: '/matrix',
};

@Injectable()
export class MatrixApiMockService {
	public constructor(protected readonly apiService: ApiService) {}

	public getAll(): Observable<MatrixElement[][]> {
		return of(this.getArr());
	}

	public setAll(matrix: MatrixElement[][]): Observable<MatrixElement[][]> {
		return of(matrix);
	}

	public updateOne(matrixEl: MatrixElement): Observable<MatrixElement> {
		return of(matrixEl);
	}

	public deleteOne(placeId: MatrixElement['_placeId']): Observable<MatrixElement['_placeId']> {
		return of(placeId);
	}

	private getArr(): MatrixElement[][] {
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
