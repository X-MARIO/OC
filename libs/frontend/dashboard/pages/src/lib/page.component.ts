import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { MatrixElement } from '@oc/frontend/ui/matrix';
import { MatrixEmitService } from '@oc/frontend/ui/matrix';
import type { Observable } from 'rxjs';

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
export class PageComponent {
	public readonly matrix$: Observable<MatrixElement[][]> = this.matrixEmitService.initialize();

	public constructor(private readonly matrixEmitService: MatrixEmitService<MatrixElement>) {}
}
