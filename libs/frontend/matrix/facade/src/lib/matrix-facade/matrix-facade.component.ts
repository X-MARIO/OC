import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'oc-matrix-facade-matrix-facade',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './matrix-facade.component.html',
	styleUrl: './matrix-facade.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixFacadeComponent {}
