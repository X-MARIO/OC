import { FormModelLogin } from './login-form.types';

import { FormControl, FormGroup, Validators } from '@angular/forms';

export class LoginForm {
	public form: FormGroup = new FormGroup({});

	public readonly formFields: typeof FormModelLogin = FormModelLogin;

	public static newForm(): FormGroup {
		return new FormGroup({
			[FormModelLogin.email]: new FormControl('', [
				Validators.required,
				Validators.email,
				Validators.minLength(5),
				Validators.maxLength(64),
			]),
			[FormModelLogin.password]: new FormControl('', [
				Validators.required,
				Validators.minLength(11),
				Validators.maxLength(64),
			]),
		});
	}
}
