import { RegisterPageComponent } from './register-page/register-page.component';
import { RegisterPageRoutingModule } from './register-page-routing.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [CommonModule, RegisterPageRoutingModule],
	declarations: [RegisterPageComponent],
})
export class RegisterPageModule {}
