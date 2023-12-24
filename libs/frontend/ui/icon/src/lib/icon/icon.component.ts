import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavigationService } from '@oc/core/navigation/service';
import type { IQueryParamsEditIcon } from '@oc/frontend/ui/matrix';
import { MatrixElementShort } from '@oc/frontend/ui/matrix';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import type { TuiSizeL, TuiSizeS } from '@taiga-ui/core';
import { TuiButtonModule, TuiDataListModule, TuiDropdownModule } from '@taiga-ui/core';
import { TuiDataListDropdownManagerModule } from '@taiga-ui/kit';

@Component({
	selector: 'oc-icon',
	standalone: true,
	imports: [
		CommonModule,
		TuiButtonModule,
		TuiDataListModule,
		TuiDataListDropdownManagerModule,
		TuiDropdownModule,
		TuiActiveZoneModule,
	],
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
	@Input({
		required: true,
	})
	public data!: MatrixElementShort;

	public dropdownOpen = false;

	public readonly size: TuiSizeL | TuiSizeS = 'm';

	public constructor(private readonly navigationService: NavigationService) {}

	public onOpenContextMenu($event: MouseEvent): void {
		$event.preventDefault();
		this.dropdownOpen = !this.dropdownOpen;
	}

	public onOpen($event: MouseEvent): void {
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

	public onDelete($event: MouseEvent): void {
		const queryParams: IQueryParamsEditIcon = {
			iconId: this.data.iconId,
		};

		void this.navigationService
			.navigateByUrl(this.navigationService.getPaths().dashboardFileDelete, undefined, {
				queryParams: queryParams,
			})
			.then()
			.catch();
	}

	public onRename($event: MouseEvent): void {
		const queryParams: IQueryParamsEditIcon = {
			iconId: this.data.iconId,
		};

		void this.navigationService
			.navigateByUrl(this.navigationService.getPaths().dashboardFileRename, undefined, {
				queryParams: queryParams,
			})
			.then()
			.catch();
	}
}
