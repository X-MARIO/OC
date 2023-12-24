import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { Process } from 'types-process';

@Component({
	selector: 'oc-table-process-table-process',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './table-process.component.html',
	styleUrls: ['./table-process.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableProcessComponent {
	@Input({
		required: true,
	})
	public process: Process[] = [];
}
