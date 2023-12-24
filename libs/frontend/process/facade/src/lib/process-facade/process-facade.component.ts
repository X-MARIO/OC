import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'oc-process-facade-process-facade',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './process-facade.component.html',
	styleUrls: ['./process-facade.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessFacadeComponent {}
