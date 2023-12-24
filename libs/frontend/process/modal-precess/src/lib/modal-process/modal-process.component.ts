import { switchMap, takeUntil } from 'rxjs';

import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { NavigationService } from '@oc/core/navigation/service';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { ProcessFacade } from 'process-facade';

// eslint-disable-next-line @angular-eslint/prefer-standalone-component
@Component({
	selector: 'lib-modal-process',
	templateUrl: './modal-process.component.html',
	styleUrls: ['./modal-process.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalProcessComponent implements OnInit {
	public process$: ProcessFacade['process$'] = this.processFacade.process$;

	public constructor(
		private readonly processFacade: ProcessFacade,
		private readonly navigationService: NavigationService,
		@Inject(TuiAlertService) private readonly alerts$: TuiAlertService,
		@Inject(TuiDestroyService) private readonly destroy$: TuiDestroyService,
	) {}

	public ngOnInit(): void {
		this.processFacade.getProcess();
		this.setSubscriptions();
	}

	/** Устанаваливаем подписки */
	private setSubscriptions(): void {
		this.processFacade.processFailure$
			.pipe(
				switchMap(() => {
					return this.alerts$.open(undefined, {
						label: 'Не удалось загрузить процессы',
						status: TuiNotification.Error,
						hasCloseButton: true,
						hasIcon: true,
						autoClose: 5000,
					});
				}),
				takeUntil(this.destroy$),
			)
			.subscribe();
	}
}
