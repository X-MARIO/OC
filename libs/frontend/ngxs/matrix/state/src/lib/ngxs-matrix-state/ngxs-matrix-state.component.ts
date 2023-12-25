import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'oc-ngxs-matrix-state-ngxs-matrix-state',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './ngxs-matrix-state.component.html',
	styleUrl: './ngxs-matrix-state.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxsMatrixStateComponent {}
