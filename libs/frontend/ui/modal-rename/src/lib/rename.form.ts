import { FormModelRename } from './rename-form.types';

import { FormControl, FormGroup, Validators } from '@angular/forms';

export class RenameForm {
	public form: FormGroup = new FormGroup({});

	public readonly formFields: typeof FormModelRename = FormModelRename;

	public static newForm(): FormGroup {
		return new FormGroup({
			[FormModelRename.fileName]: new FormControl('The best name', [
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(255),
			]),
		});
	}
}
