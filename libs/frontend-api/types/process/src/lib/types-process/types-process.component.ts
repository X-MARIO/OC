import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'oc-types-process-types-process',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './types-process.component.html',
	styleUrls: ['./types-process.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypesProcessComponent {}
