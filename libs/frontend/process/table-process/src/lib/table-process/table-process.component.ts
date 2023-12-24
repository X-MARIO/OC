import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'oc-table-process-table-process',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './table-process.component.html',
	styleUrls: ['./table-process.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableProcessComponent {}
