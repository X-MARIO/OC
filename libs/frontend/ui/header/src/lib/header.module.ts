import { HeaderComponent } from './header.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TuiActiveZoneModule, TuiLetModule } from '@taiga-ui/cdk';
import {
	TuiButtonModule,
	TuiDataListModule,
	TuiErrorModule,
	TuiHostedDropdownModule,
	TuiSvgModule,
	TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
	TuiDataListDropdownManagerModule,
	TuiDataListWrapperModule,
	TuiFieldErrorPipeModule,
	TuiInputDateModule,
	TuiSelectModule,
} from '@taiga-ui/kit';
import { ButtonProcessComponent } from 'button-process';
import { ButtonAboutComponent } from 'button-about';

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
		FormsModule,
		TuiSvgModule,
		ButtonProcessComponent,
		TuiLetModule,
		ButtonAboutComponent,
	],
	declarations: [HeaderComponent],
	exports: [HeaderComponent],
})
export class HeaderModule {}
