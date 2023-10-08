import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
	imports: [CommonModule, LoginPageRoutingModule],
	declarations: [LoginPageComponent],
})
export class LoginPageModule {}
