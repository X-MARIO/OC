import { CreateFolderForm } from './create-folder.form';

import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { NavigationService } from '@oc/core/navigation/service';

// eslint-disable-next-line @angular-eslint/prefer-standalone-component
@Component({
	selector: 'lib-modal-create-folder',
	templateUrl: './modal-create-folder.component.html',
	styleUrls: ['./modal-create-folder.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalCreateFolderComponent extends CreateFolderForm implements OnInit {
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

	public onCreate(): void {}

	private initForm(): void {
		this.form = CreateFolderForm.newForm();
	}
}
