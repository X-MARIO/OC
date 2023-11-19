import { RegisterFormComponent } from './register-form.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,

		// taiga-ui
		TuiInputModule,
		TuiErrorModule,
		TuiInputPasswordModule,
		TuiButtonModule,
		TuiFieldErrorPipeModule,
	],
	declarations: [RegisterFormComponent],
	exports: [RegisterFormComponent],
})
export class RegisterFormModule {}
