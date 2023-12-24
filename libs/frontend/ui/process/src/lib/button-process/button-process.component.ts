import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationService } from '@oc/core/navigation/service';
import { TuiButtonModule, TuiHostedDropdownModule } from '@taiga-ui/core';

@Component({
	selector: 'lib-button-process',
	standalone: true,
	imports: [CommonModule, TuiButtonModule, TuiHostedDropdownModule],
	templateUrl: './button-process.component.html',
	styleUrls: ['./button-process.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonProcessComponent {
	public constructor(private readonly navigationService: NavigationService) {}

	public onOpenProcess(): void {
		void this.navigationService
			.navigateByUrl(this.navigationService.getPaths().process)
			.then()
			.catch();
	}
}
