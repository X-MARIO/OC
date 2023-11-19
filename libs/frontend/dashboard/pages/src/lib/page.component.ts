import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Page component for dashboard application
 */
// eslint-disable-next-line @angular-eslint/prefer-standalone-component
@Component({
	selector: 'oc-dashboard-home-page',
	templateUrl: './page.component.html',
	styleUrls: ['./page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {}
