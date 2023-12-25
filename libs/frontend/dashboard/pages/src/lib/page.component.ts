import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatrixFacade } from 'matrix-facade';
import type { Observable } from 'rxjs';
import type { MatrixElement } from 'types-matrix';

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
export class PageComponent implements OnInit {
	public readonly matrix$: Observable<MatrixElement[][]> = this.matrixFacade.matrix$;

	public constructor(private readonly matrixFacade: MatrixFacade) {}

	public ngOnInit(): void {
		this.matrixFacade.getMatrix();
	}
}
