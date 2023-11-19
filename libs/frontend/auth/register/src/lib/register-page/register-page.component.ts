import { ChangeDetectionStrategy, Component } from '@angular/core';

// eslint-disable-next-line @angular-eslint/prefer-standalone-component
@Component({
	selector: 'oc-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {}
