import { Injectable } from '@angular/core';
import { ApiService } from '@oc/core/api/service';
import { StorageKeys } from '@oc/frontend-api/types/model';
import type { IUserCreate, IUserSecretsF } from '@oc/frontend-api/types/user';
import { plainToInstance } from 'class-transformer';
import { jwtDecode } from 'jwt-decode';
import { Observable, of } from 'rxjs';
import { LocalSyncStorage } from 'storage-local';
import { IMatrixElement, MatrixElement } from 'types-matrix';

export enum MatrixApiRoutesEnum {
	MATRIX = 'matrix',
}

export const MATRIX_API_ROUTES: Record<MatrixApiRoutesEnum, string> = {
	[MatrixApiRoutesEnum.MATRIX]: '/matrix',
};

@Injectable()
export class MatrixApiMockService {
	public constructor(
		protected readonly apiService: ApiService,
		private readonly localSyncStorage: LocalSyncStorage,
	) {
	}

	public getAll(): Observable<MatrixElement[][]> {
		const authToken: IUserSecretsF['access_token'] = this.localSyncStorage.getItem(StorageKeys.AuthToken) ?? '';
		const matrixSrt: string = this.localSyncStorage.getItem(StorageKeys.Matrix) ?? '';

		const mapMatrix: Map<IUserCreate['username'], MatrixElement[][]> =
			new Map<IUserCreate['username'], MatrixElement[][]>(
				JSON.parse(matrixSrt),
			);

		const access: IUserCreate = jwtDecode<IUserCreate>(authToken);

		const result = mapMatrix.get(access.username) ?? [];

		return of(result.map((item: IMatrixElement[]) => {
			return plainToInstance<MatrixElement, IMatrixElement>(MatrixElement, item);
		}));
	}

	public setAll(matrix: MatrixElement[][]): Observable<MatrixElement[][]> {
		const authToken: IUserSecretsF['access_token'] = this.localSyncStorage.getItem(StorageKeys.AuthToken) ?? '';
		const matrixSrt: string = this.localSyncStorage.getItem(StorageKeys.Matrix) ?? '';

		const mapMatrix: Map<IUserCreate['username'], MatrixElement[][]> =
			new Map<IUserCreate['username'], MatrixElement[][]>(
				JSON.parse(matrixSrt),
			);

		const access: IUserCreate = jwtDecode<IUserCreate>(authToken);

		mapMatrix.set(access.username, matrix)

		const result = mapMatrix.get(access.username) ?? [];

		this.localSyncStorage.setItem(StorageKeys.Matrix, JSON.stringify(Array.from(mapMatrix.entries())));

		return of(result.map((item: IMatrixElement[]) => {
			return plainToInstance<MatrixElement, IMatrixElement>(MatrixElement, item);
		}));
	}

	public create(matrixEl: MatrixElement): Observable<MatrixElement> {

		const authToken: IUserSecretsF['access_token'] = this.localSyncStorage.getItem(StorageKeys.AuthToken) ?? '';
		const matrixSrt: string = this.localSyncStorage.getItem(StorageKeys.Matrix) ?? '';

		const mapMatrix: Map<IUserCreate['username'], MatrixElement[][]> =
			new Map<IUserCreate['username'], MatrixElement[][]>(
				JSON.parse(matrixSrt),
			);

		const access: IUserCreate = jwtDecode<IUserCreate>(authToken);

		const matrixArr: MatrixElement[][] = mapMatrix.get(access.username) ?? [];

		const el: MatrixElement[] = matrixArr[matrixEl.placeId];

		el.push(matrixEl);

		mapMatrix.set(access.username, matrixArr);

		this.localSyncStorage.setItem(StorageKeys.Matrix, JSON.stringify(Array.from(mapMatrix.entries())));

		return of(matrixEl);
	}

	public updateOne(matrixEl: MatrixElement): Observable<MatrixElement> {
		return of(matrixEl);
	}

	public deleteOne(placeId: MatrixElement['_placeId']): Observable<MatrixElement['_placeId']> {
		return of(placeId);
	}
}
