import { Injectable } from '@angular/core';
import { ApiService } from '@oc/core/api/service';
import { plainToInstance } from 'class-transformer';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';
import { IMatrixElement, MatrixElement } from 'types-matrix';

export enum MatrixApiRoutesEnum {
	MATRIX = 'matrix',
}

export const MATRIX_API_ROUTES: Record<MatrixApiRoutesEnum, string> = {
	[MatrixApiRoutesEnum.MATRIX]: '/matrix',
};

@Injectable()
export class MatrixApiService {
	public constructor(protected readonly apiService: ApiService) {}

	public getAll(): Observable<MatrixElement[][]> {
		return this.apiService
			.get<IMatrixElement[][]>(MATRIX_API_ROUTES[MatrixApiRoutesEnum.MATRIX])
			.pipe(
				map((res: IMatrixElement[][]) => {
					return res.map((item: IMatrixElement[]) => {
						return plainToInstance<MatrixElement, IMatrixElement>(MatrixElement, item);
					});
				}),
			);
	}

	public setAll(matrix: MatrixElement[][]): Observable<MatrixElement[][]> {
		return this.apiService
			.post<IMatrixElement[][]>(MATRIX_API_ROUTES[MatrixApiRoutesEnum.MATRIX])
			.pipe(
				map((res: IMatrixElement[][]) => {
					return res.map((item: IMatrixElement[]) => {
						return plainToInstance<MatrixElement, IMatrixElement>(MatrixElement, item);
					});
				}),
			);
	}

	public updateOne(matrixEl: MatrixElement): Observable<MatrixElement> {
		return this.apiService
			.patch<IMatrixElement>(MATRIX_API_ROUTES[MatrixApiRoutesEnum.MATRIX], matrixEl)
			.pipe(
				map((res: IMatrixElement) => {
					return plainToInstance<MatrixElement, IMatrixElement>(MatrixElement, res);
				}),
			);
	}

	public deleteOne(placeId: MatrixElement['_placeId']): Observable<MatrixElement['_placeId']> {
		return this.apiService
			.patch<void>(MATRIX_API_ROUTES[MatrixApiRoutesEnum.MATRIX], placeId)
			.pipe(
				map(() => {
					return placeId;
				}),
			);
	}
}
