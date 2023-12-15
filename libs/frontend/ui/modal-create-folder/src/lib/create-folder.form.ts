import { FormModelCreateFolder } from './create-folder.types';

import { FormControl, FormGroup, Validators } from '@angular/forms';

export class CreateFolderForm {
	public form: FormGroup = new FormGroup({});

	public readonly formFields: typeof FormModelCreateFolder = FormModelCreateFolder;

	public static newForm(): FormGroup {
		return new FormGroup({
			[FormModelCreateFolder.folderName]: new FormControl('The best name folder', [
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(255),
			]),
		});
	}
}
