import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import { ApiService } from '@oc/core/api/service';
import { NavigationService } from '@oc/core/navigation/service';

@Pipe({
	name: 'externalPath',
})
export class NavigationExternalPathPipe implements PipeTransform {
	public constructor(
		private readonly navigationService: NavigationService,
		private readonly apiService: ApiService,
	) {}

	public transform(path: string, params?: Record<string, number | string | undefined>): string {
		return this.apiService.makeUrl(
			this.navigationService.getRoute(path, params).join('/').slice(1),
		);
	}
}
