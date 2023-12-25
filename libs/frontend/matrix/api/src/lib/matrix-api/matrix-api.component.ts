import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'oc-matrix-api-matrix-api',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './matrix-api.component.html',
	styleUrl: './matrix-api.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixApiComponent {}
