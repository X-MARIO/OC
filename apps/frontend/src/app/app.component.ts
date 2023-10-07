import { ChangeDetectionStrategy, Component } from '@angular/core';

// eslint-disable-next-line @angular-eslint/prefer-standalone-component
@Component({
	selector: 'oc-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	//
}
