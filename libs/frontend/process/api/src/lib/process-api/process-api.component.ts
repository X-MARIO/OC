import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'oc-process-api-process-api',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './process-api.component.html',
	styleUrls: ['./process-api.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessApiComponent {}
