import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationService } from '@oc/core/navigation/service';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
	selector: 'oc-icon',
	standalone: true,
	imports: [CommonModule, TuiButtonModule],
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
	public constructor(private readonly navigationService: NavigationService) {}

	public onClick($event: MouseEvent): void {
		console.log($event);
		console.log(
			'this.navigationService.getPaths().dashboardFileEdit',
			this.navigationService.getPaths().dashboardFileEdit,
		);
		void this.navigationService
			.navigateByUrl(this.navigationService.getPaths().dashboardFileEdit)
			.then()
			.catch();
	}
}
