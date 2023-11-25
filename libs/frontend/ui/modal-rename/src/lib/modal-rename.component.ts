import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationService } from '@oc/core/navigation/service';

@Component({
	selector: 'lib-modal-rename',
	templateUrl: './modal-rename.component.html',
	styleUrls: ['./modal-rename.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalRenameComponent {
	public constructor(private readonly navigationService: NavigationService) {}
	public onCancel(): void {
		void this.navigationService
			.navigateByUrl(this.navigationService.getPaths().dashboard)
			.then()
			.catch();
	}

	public onDelete(): void {}
}
