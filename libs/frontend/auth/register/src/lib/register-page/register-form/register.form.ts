import { FormModelRegister } from './register-form.types';

import { FormControl, FormGroup, Validators } from '@angular/forms';

export class RegisterForm {
	public form: FormGroup = new FormGroup({});

	public readonly formFields: typeof FormModelRegister = FormModelRegister;

	public static newForm(): FormGroup {
		return new FormGroup({
			[FormModelRegister.email]: new FormControl('', [
				Validators.required,
				Validators.email,
				Validators.minLength(5),
				Validators.maxLength(64),
			]),
			[FormModelRegister.username]: new FormControl('', [
				Validators.required,
				Validators.minLength(5),
				Validators.maxLength(64),
			]),
			[FormModelRegister.password]: new FormControl('', [
				Validators.required,
				Validators.minLength(11),
				Validators.maxLength(64),
			]),
		});
	}
}
