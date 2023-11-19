import type { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
	CdkDrag,
	CdkDragPlaceholder,
	CdkDropList,
	CdkDropListGroup,
	moveItemInArray,
	transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
	selector: 'oc-matrix',
	standalone: true,
	imports: [
		CommonModule,
		//
		CdkDrag,
		CdkDropList,
		CdkDropListGroup,
		CdkDragPlaceholder,
	],
	templateUrl: './matrix.component.html',
	styleUrls: ['./matrix.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixComponent {
	@ContentChild('content') public content!: TemplateRef<unknown>;

	public readonly matrix: number[][] = this.getArr();

	public matrixLength: number = this.matrix.length;

	public listsMatrixIndex: string[] = Array(this.matrixLength)
		.fill(null)
		.map((u, i) => i.toString());

	public trackByIndex(index: number, item: number[]): number {
		return index;
	}

	public getIdToString(id: number): string {
		return id.toString();
	}

	public getCdkDropListConnectedToList(idx: number): string[] {
		const idxStr: string = idx.toString();
		return this.listsMatrixIndex.filter((item: string) => item !== idxStr);
	}

	public drop(event: CdkDragDrop<number[][]>): void {
		console.log('drop', event);
		const currentContainerIndexId: number = +event.container.id;
		if (event.previousContainer === event.container) {
			moveItemInArray(
				event.container.data[currentContainerIndexId],
				event.previousIndex,
				event.currentIndex,
			);
		} else {
			const previousContainerId: number = +event.previousContainer.id;
			transferArrayItem(
				event.previousContainer.data[previousContainerId],
				event.container.data[currentContainerIndexId],
				event.previousIndex,
				event.currentIndex,
			);
		}
	}

	/**
	 * Predicate function that only allows even numbers to be dropped into a list.
	 * @param drag
	 * @param drop
	 */
	public evenPredicate(drag: CdkDrag<number>, drop: CdkDropList<number[][]>): boolean {
		const dropContainerId: number = +drop.id;
		return !drop.data[dropContainerId].length;
	}

	private getArr(): number[][] {
		const array: number[] = Array(128)
			.fill(null)
			.map((u, i) => i); //массив, можно использовать массив объектов
		const size = 1; //размер подмассива
		const subarray: number[][] = []; //массив в который будет выведен результат.
		for (let i = 0; i < Math.ceil(array.length / size); i++) {
			subarray[i] = i === 55 ? [55] : i === 56 ? [56] : [];
		}
		console.log('subarray', subarray);
		return subarray;
	}
}
