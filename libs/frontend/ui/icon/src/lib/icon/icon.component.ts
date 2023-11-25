import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavigationService } from '@oc/core/navigation/service';
import type { IQueryParamsEditIcon } from '@oc/frontend/ui/matrix';
import { MatrixElementShort } from '@oc/frontend/ui/matrix';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
	selector: 'oc-icon',
	standalone: true,
	imports: [CommonModule, TuiButtonModule],
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
	@Input({
		required: true,
	})
	public data!: MatrixElementShort;

	public constructor(private readonly navigationService: NavigationService) {}

	public onClick($event: MouseEvent): void {
		const queryParams: IQueryParamsEditIcon = {
			iconId: this.data.iconId,
		};

		void this.navigationService
			.navigateByUrl(this.navigationService.getPaths().dashboardFileEdit, undefined, {
				queryParams: queryParams,
			})
			.then()
			.catch();
	}
}
