import { HeaderComponent } from './header.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import {
	TuiButtonModule,
	TuiDataListModule,
	TuiErrorModule,
	TuiHostedDropdownModule,
	TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
	TuiDataListDropdownManagerModule,
	TuiDataListWrapperModule,
	TuiFieldErrorPipeModule,
	TuiInputDateModule,
	TuiSelectModule,
} from '@taiga-ui/kit';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		TuiSelectModule,
		TuiDataListWrapperModule,
		TuiDataListDropdownManagerModule,
		TuiActiveZoneModule,
		TuiErrorModule,
		TuiInputDateModule,
		TuiFieldErrorPipeModule,
		TuiHostedDropdownModule,
		TuiButtonModule,
		TuiTextfieldControllerModule,
		TuiDataListModule,
	],
	declarations: [HeaderComponent],
	exports: [HeaderComponent],
})
export class HeaderModule {}
