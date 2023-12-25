import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavigationService } from '@oc/core/navigation/service';
import { TerminalService } from '@oc/frontend/ui/terminal';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import {
	TuiButtonModule,
	TuiDataListModule,
	TuiDropdownModule,
	type TuiSizeL,
	type TuiSizeS,
} from '@taiga-ui/core';
import { TuiDataListDropdownManagerModule } from '@taiga-ui/kit';
import { EFileType, IQueryParamsBase, IQueryParamsCreate } from 'types-matrix';

@Component({
	selector: 'lib-create',
	standalone: true,
	imports: [
		CommonModule,
		TuiButtonModule,
		TuiDataListDropdownManagerModule,
		TuiDataListModule,
		TuiDropdownModule,
		TuiActiveZoneModule,
	],
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {
	@Input() public id: number = -1;

	public readonly size: TuiSizeL | TuiSizeS = 'm';

	public dropdownOpen = false;

	public constructor(
		private readonly navigationService: NavigationService,
		private readonly _terminalService: TerminalService,
	) {}

	public onOpenContextMenu($event: MouseEvent): void {
		$event.preventDefault();
		this.dropdownOpen = !this.dropdownOpen;
	}

	public onOpenCreateFolder($event: MouseEvent): void {
		const queryParams: IQueryParamsCreate = {
			iconId: this.id,
			fileType: EFileType.FOLDER,
		};

		void this.navigationService
			.navigateByUrl(this.navigationService.getPaths().dashboardCreate, undefined, {
				queryParams: queryParams,
			})
			.then()
			.catch();
	}

	public onOpenCreateDocument($event: MouseEvent): void {
		const queryParams: IQueryParamsBase = {
			iconId: this.id,
		};

		void this.navigationService
			.navigateByUrl(this.navigationService.getPaths().dashboardCreate, undefined, {
				queryParams: queryParams,
			})
			.then()
			.catch();
	}

	public onOpenTerminal($event: MouseEvent): void {
		this._terminalService.setOpenTerminal(true);
	}
}
