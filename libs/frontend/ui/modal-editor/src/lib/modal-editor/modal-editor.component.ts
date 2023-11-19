import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'oc-modal-editor',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './modal-editor.component.html',
	styleUrls: ['./modal-editor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalEditorComponent {}
