import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'oc-storage-local',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './storage-local.component.html',
	styleUrl: './storage-local.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorageLocalComponent {}
