import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'oc-ngxs-process-state-ngxs-process-state',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './ngxs-process-state.component.html',
	styleUrls: ['./ngxs-process-state.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxsProcessStateComponent {}
