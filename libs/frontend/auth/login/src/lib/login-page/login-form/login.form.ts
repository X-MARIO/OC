import { FormModelLogin } from './login-form.types';

import { FormControl, FormGroup, Validators } from '@angular/forms';

export class LoginForm {
	public form: FormGroup = new FormGroup({});

	public readonly formFields: typeof FormModelLogin = FormModelLogin;

	public static newForm(): FormGroup {
		return new FormGroup({
			[FormModelLogin.username]: new FormControl('', [
				Validators.required,
				Validators.minLength(4),
				Validators.maxLength(64),
			]),
			[FormModelLogin.password]: new FormControl('', [
				Validators.required,
				Validators.minLength(4),
				Validators.maxLength(64),
			]),
		});
	}
}
