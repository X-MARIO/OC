import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { MatrixFacade } from 'matrix-facade';
import { Observable, take, takeUntil } from 'rxjs';
import { State } from 'store-root';
import { MatrixElementBase } from 'types-matrix';

/**
 * Page component for dashboard application
 */
// eslint-disable-next-line @angular-eslint/prefer-standalone-component
@Component({
	selector: 'oc-dashboard-home-page',
	templateUrl: './page.component.html',
	styleUrls: ['./page.component.scss'],
	providers: [TuiDestroyService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements OnInit {
	public readonly matrix$: Observable<MatrixElementBase[][]> = this.matrixFacade.matrix$;

	public readonly state$: Observable<State> = this.matrixFacade.state$;

	public constructor(
		private readonly matrixFacade: MatrixFacade,
		@Inject(TuiDestroyService) private readonly destroy$: TuiDestroyService,
	) {}

	public ngOnInit(): void {
		this.state$.pipe(take(1), takeUntil(this.destroy$)).subscribe({
			next: (state: State) => {
				if (state !== State.READY) {
					this.matrixFacade.getMatrix();
				}
			},
		});
	}

	public setMatrixData($event: MatrixElementBase[][]) {
		this.matrixFacade.setMatrix($event);
	}
}
