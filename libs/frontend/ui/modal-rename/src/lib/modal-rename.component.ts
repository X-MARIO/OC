import { RenameForm } from './rename.form';

import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { NavigationService } from '@oc/core/navigation/service';

// eslint-disable-next-line @angular-eslint/prefer-standalone-component
@Component({
	selector: 'lib-modal-rename',
	templateUrl: './modal-rename.component.html',
	styleUrls: ['./modal-rename.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalRenameComponent extends RenameForm implements OnInit {
	public constructor(private readonly navigationService: NavigationService) {
		super();
	}

	public ngOnInit(): void {
		this.initForm();
	}

	public onCancel(): void {
		void this.navigationService
			.navigateByUrl(this.navigationService.getPaths().dashboard)
			.then()
			.catch();
	}

	public onRename(): void {}

	private initForm(): void {
		this.form = RenameForm.newForm();
	}
}
