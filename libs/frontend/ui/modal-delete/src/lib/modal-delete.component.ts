import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationService } from '@oc/core/navigation/service';

// eslint-disable-next-line @angular-eslint/prefer-standalone-component
@Component({
	selector: 'lib-modal-delete',
	templateUrl: './modal-delete.component.html',
	styleUrls: ['./modal-delete.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDeleteComponent {
	public constructor(private readonly navigationService: NavigationService) {}
	public onCancel(): void {
		void this.navigationService
			.navigateByUrl(this.navigationService.getPaths().dashboard)
			.then()
			.catch();
	}

	public onDelete(): void {}
}
