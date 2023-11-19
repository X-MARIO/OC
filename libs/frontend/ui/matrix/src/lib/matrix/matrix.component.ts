import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'oc-matrix',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './matrix.component.html',
	styleUrls: ['./matrix.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixComponent {}
