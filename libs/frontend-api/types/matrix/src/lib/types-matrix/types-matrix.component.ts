import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'oc-types-matrix-types-matrix',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './types-matrix.component.html',
	styleUrl: './types-matrix.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypesMatrixComponent {}
