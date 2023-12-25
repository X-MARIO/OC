import { FormModelCreateItem } from './create-folder.types';

import { FormControl, FormGroup, Validators } from '@angular/forms';

export class CreateFolderForm {
	public form: FormGroup = new FormGroup({});

	public readonly formFields: typeof FormModelCreateItem = FormModelCreateItem;

	public static newForm(): FormGroup {
		return new FormGroup({
			[FormModelCreateItem.itemName]: new FormControl('The best name folder', [
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(255),
			]),
		});
	}
}
