import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { NavigationService } from '@oc/core/navigation/service';
import { TuiActiveZoneModule, TuiDestroyService } from '@taiga-ui/cdk';
import {
	TuiAlertService,
	TuiButtonModule,
	TuiDataListModule,
	TuiDropdownModule,
	TuiNotification,
	TuiSizeL,
	TuiSizeS,
} from '@taiga-ui/core';
import { TuiDataListDropdownManagerModule } from '@taiga-ui/kit';
import { take, takeUntil } from 'rxjs';
import { EFileType, IQueryParamsBase, IQueryParamsCreate, MatrixElementShort } from 'types-matrix';

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
	providers: [TuiDestroyService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
	@Input({
		required: true,
	})
	public data!: MatrixElementShort;

	public dropdownOpen = false;

	public readonly size: TuiSizeL | TuiSizeS = 'm';

	public constructor(
		private readonly navigationService: NavigationService,
		@Inject(TuiAlertService) private readonly alerts$: TuiAlertService,
		@Inject(TuiDestroyService) private readonly destroy$: TuiDestroyService,
	) {}

	public onOpenContextMenu($event: MouseEvent): void {
		$event.preventDefault();
		this.dropdownOpen = !this.dropdownOpen;
	}

	public onOpen($event: MouseEvent): void {
		if (this.data.type !== EFileType.FILE) {
			this.alerts$
				.open(undefined, {
					label: 'Сущность данного типа нельзя открыть',
					status: TuiNotification.Error,
					hasCloseButton: true,
					hasIcon: true,
					autoClose: 3000,
				})
				.pipe(take(1), takeUntil(this.destroy$))
				.subscribe();
			return;
		}

		const queryParams: IQueryParamsBase = {
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
		const queryParams: IQueryParamsBase = {
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
		const queryParams: IQueryParamsCreate = {
			iconId: this.data.iconId,
			fileType: this.data.type,
		};

		void this.navigationService
			.navigateByUrl(this.navigationService.getPaths().dashboardFileRename, undefined, {
				queryParams: queryParams,
			})
			.then()
			.catch();
	}
}
