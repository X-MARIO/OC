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
	public constructor(protected readonly apiService: ApiService) {
	}

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
}
