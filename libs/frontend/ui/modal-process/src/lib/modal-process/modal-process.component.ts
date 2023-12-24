import { CommonModule } from '@angular/common';
import type { OnDestroy, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { NavigationService } from '@oc/core/navigation/service';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiAlertService, TuiButtonModule } from '@taiga-ui/core';

@Component({
	selector: 'lib-modal-process',
	standalone: true,
	imports: [CommonModule, TuiButtonModule],
	templateUrl: './modal-process.component.html',
	styleUrls: ['./modal-process.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalProcessComponent implements OnInit, OnDestroy {
	public constructor(
		private readonly navigationService: NavigationService,
		@Inject(TuiAlertService) private readonly alerts$: TuiAlertService,
		@Inject(TuiDestroyService) private readonly destroy$: TuiDestroyService,
	) {}

	public ngOnDestroy(): void {
		throw new Error('Method not implemented.');
	}

	public ngOnInit(): void {
		throw new Error('Method not implemented.');
	}
}
