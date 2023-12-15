import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import {
	TuiButtonModule,
	TuiDataListModule,
	TuiDropdownModule,
	type TuiSizeL,
	type TuiSizeS,
} from '@taiga-ui/core';
import { TuiDataListDropdownManagerModule } from '@taiga-ui/kit';

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
	public readonly size: TuiSizeL | TuiSizeS = 'm';

	public dropdownOpen = false;

	public onOpenContextMenu($event: MouseEvent): void {
		$event.preventDefault();
		this.dropdownOpen = !this.dropdownOpen;
	}
}
