import type { CdkDragDrop } from '@angular/cdk/drag-drop';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Page component for dashboard application
 */
// eslint-disable-next-line @angular-eslint/prefer-standalone-component
@Component({
	selector: 'oc-dashboard-home-page',
	templateUrl: './page.component.html',
	styleUrls: ['./page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
	// 2
	// public movies: string[] = [
	// 	'Episode I - The Phantom Menace',
	// 	'Episode II - Attack of the Clones',
	// 	'Episode III - Revenge of the Sith',
	// 	'Episode IV - A New Hope',
	// 	'Episode V - The Empire Strikes Back',
	// 	'Episode VI - Return of the Jedi',
	// 	'Episode VII - The Force Awakens',
	// 	'Episode VIII - The Last Jedi',
	// 	'Episode IX – The Rise of Skywalker',
	// ];
	//
	// public drop(event: CdkDragDrop<string[]>): void {
	// 	moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
	// }

	// 3
	public todo: string[] = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

	public done: string[] = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

	public drop(event: CdkDragDrop<string[]>): void {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex,
			);
		}
	}
}
