import { ChangeDetectionStrategy, Component } from '@angular/core';

// eslint-disable-next-line @angular-eslint/prefer-standalone-component
@Component({
	selector: 'oc-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {}
