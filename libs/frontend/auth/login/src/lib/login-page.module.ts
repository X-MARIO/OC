import { LoginFormModule } from './login-page/login-form/login-form.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginPageRoutingModule } from './login-page-routing.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [CommonModule, LoginPageRoutingModule, LoginFormModule],
	declarations: [LoginPageComponent],
})
export class LoginPageModule {}
