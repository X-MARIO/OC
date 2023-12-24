import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiValidationError } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';

@Component({
	selector: 'oc-modal-process-error-modal-process-error',
	standalone: true,
	imports: [CommonModule, TuiErrorModule, TuiButtonModule],
	templateUrl: './modal-process-error.component.html',
	styleUrls: ['./modal-process-error.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalProcessErrorComponent {
	public readonly error: TuiValidationError = new TuiValidationError(
		'Извините, не удалось загрузить процессы',
	);

	public onRefresh(): void {}
}
