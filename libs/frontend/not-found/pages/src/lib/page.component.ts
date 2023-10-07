import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

@Component({
	selector: 'oc-not-found-page',
	templateUrl: './page.component.html',
	styleUrls: ['./page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
	public constructor(@Inject(DOCUMENT) private readonly document: Document) {
		this.document.location.href = 'https://csfull.ru/';
	}
}
