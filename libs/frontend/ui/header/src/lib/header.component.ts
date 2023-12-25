import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationService } from '@oc/core/navigation/service';
import { AuthFacade } from '@oc/frontend/auth/facade';
import type { TuiContextWithImplicit, TuiIdentityMatcher, TuiStringHandler } from '@taiga-ui/cdk';
import { TuiDay } from '@taiga-ui/cdk';
import type { TuiSizeL, TuiSizeS } from '@taiga-ui/core';

const FAVORITES = {
	name: 'Favorites',
	items: [
		'Terminal Emulator',
		'Root Terminal Emulator',
		'File Manager',
		'Text Editor',
		'Web Browser',
		'Kali Linux',
		'Kali Docs',
		'Kali Bugs',
		'OffSec Training',
		'Exploit Database',
		'VulnHub',
	],
};

const EXPENSES = {
	name: 'Usual Applications',
	items: ['01 - Information Gathering', '03 - Web Application Analysis', '...'],
};

class Language {
	public constructor(public readonly name: string) {}
}

// eslint-disable-next-line @angular-eslint/prefer-standalone-component
@Component({
	selector: 'oc-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
	public dropdownOpen = false;

	public readonly size: TuiSizeL | TuiSizeS = 'm';

	public readonly dayForm = new FormGroup({
		day: new FormControl(new TuiDay(2017, 0, 15)),
	});

	public languages: Language[] = [new Language('RU'), new Language('EN')];

	public readonly languageForm = new FormGroup({
		language: new FormControl(this.languages[0]),
	});

	public readonly logged$: AuthFacade['logged$'] = this.authFacade.logged$;

	value = [];

	public readonly items = [FAVORITES, EXPENSES];

	public readonly identityMatcher: TuiIdentityMatcher<readonly string[]> = (items1, items2) =>
		items1.length === items2.length && items1.every((item) => items2.includes(item));

	public readonly valueContent: TuiStringHandler<TuiContextWithImplicit<readonly string[]>> = ({
		$implicit,
	}) => {
		if (!$implicit.length) {
			return 'All';
		}

		const selected = this.items.find(({ items }) => this.identityMatcher($implicit, items));

		return selected ? `${selected.name} only` : `Selected: ${$implicit.length}`;
	};

	public constructor(
		private readonly authFacade: AuthFacade,
		private readonly navigationService: NavigationService,
	) {}

	public ngOnInit(): void {}

	public onShutDown(): void {
		this.navigationService
			.navigateByUrl(this.navigationService.getPaths().authLogin)
			.then()
			.catch();
	}

	public onOpenList($event: MouseEvent) {}
}
