import { map } from 'rxjs';

import { Injectable } from '@angular/core';
import { ApiService } from '@oc/core/api/service';
import { plainToInstance } from 'class-transformer';
import type { Observable } from 'rxjs';
import type { IProcess } from 'types-process';
import { Process } from 'types-process';

export enum ProcessApiRoutesEnum {
	PROCESS = 'process',
}

export const PROCESS_API_ROUTES: Record<ProcessApiRoutesEnum, string> = {
	[ProcessApiRoutesEnum.PROCESS]: '/process',
};

@Injectable()
export class ProcessApiService {
	public constructor(protected readonly apiService: ApiService) {}

	public getAll(): Observable<Process[]> {
		return this.apiService
			.post<IProcess[]>(PROCESS_API_ROUTES[ProcessApiRoutesEnum.PROCESS])
			.pipe(
				map((res: IProcess[]) => {
					return plainToInstance<Process, IProcess>(Process, res);
				}),
			);
	}
}
