import { FormModelTerminal } from './terminal-form.types';

import { FormControl, FormGroup, Validators } from '@angular/forms';

export class TerminalForm {
	public form: FormGroup = new FormGroup({});

	public readonly formFields: typeof FormModelTerminal = FormModelTerminal;

	public static newForm(): FormGroup {
		return new FormGroup({
			[FormModelTerminal.command]: new FormControl('', [Validators.required]),
		});
	}

	public getItem(controlName: FormModelTerminal): FormControl {
		return this.form.get(controlName) as unknown as FormControl;
	}
}
