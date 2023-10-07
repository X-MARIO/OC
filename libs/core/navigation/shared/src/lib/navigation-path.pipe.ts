import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import { NavigationService } from '@oc/core/navigation/service';

@Pipe({
	name: 'path',
})
export class NavigationPathPipe implements PipeTransform {
	public constructor(private readonly navigationService: NavigationService) {}

	public transform(path: string, params?: Record<string, number | string | undefined>): string {
		const route = this.navigationService.getRoute(path, params);

		return route.length > 1 ? `/${route.slice(1).join('/')}` : `${route[0]}`;
	}
}
