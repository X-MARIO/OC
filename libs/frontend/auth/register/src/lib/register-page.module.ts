import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RegisterPageRoutingModule } from './register-page-routing.module';
import { RegisterFormModule } from './register-page/register-form/register-form.module';
import { RegisterPageComponent } from './register-page/register-page.component';

@NgModule({
	imports: [CommonModule, RegisterPageRoutingModule, RegisterFormModule],
	declarations: [RegisterPageComponent],
})
export class RegisterPageModule {}
