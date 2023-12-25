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
import {
	ChangeDetectionStrategy,
	Component,
	ContentChild,
	EventEmitter,
	Input,
	Output,
	TemplateRef,
} from '@angular/core';
import { CreateComponent } from '@oc/frontend/ui/create';
import type { MatrixElementBase } from 'types-matrix';

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
		CreateComponent,
	],
	templateUrl: './matrix.component.html',
	styleUrls: ['./matrix.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixComponent {
	@ContentChild('content') public content!: TemplateRef<unknown>;

	public _matrix: MatrixElementBase[][] = [];

	public _matrixLength = -1;

	public _listsMatrixIndex: string[] = [];

	@Input({
		required: true,
	})
	public set matrix(value: MatrixElementBase[][]) {
		this._matrix = value;
		this._matrixLength = value.length;
		this._listsMatrixIndex = Array(this._matrixLength)
			.fill(null)
			.map((u, i) => i.toString());
	}

	@Output() public onDrop: EventEmitter<MatrixElementBase[][]> = new EventEmitter<
		MatrixElementBase[][]
	>();

	public constructor() {}

	public trackByIndex(index: number, item: MatrixElementBase[]): number {
		return index;
	}

	public getIdToString(id: number): string {
		return id.toString();
	}

	public getCdkDropListConnectedToList(idx: number): string[] {
		const idxStr: string = idx.toString();
		return this._listsMatrixIndex.filter((item: string) => item !== idxStr);
	}

	public drop(event: CdkDragDrop<MatrixElementBase[][]>): void {
		const currentContainerIndexId: number = +event.container.id;
		if (event.previousContainer === event.container) {
			moveItemInArray(
				event.container.data[currentContainerIndexId],
				event.previousIndex,
				event.currentIndex,
			);
		} else {
			const previousContainerId: number = +event.previousContainer.id;
			console.log(
				'event.previousContainer.data[previousContainerId]',
				event.previousContainer.data[previousContainerId],
			);
			console.log(
				'event.container.data[currentContainerIndexId]',
				event.container.data[currentContainerIndexId],
			);
			console.log('event.previousIndex', event.previousIndex);
			console.log('event.currentIndex', event.currentIndex);
			transferArrayItem(
				event.previousContainer.data[previousContainerId],
				event.container.data[currentContainerIndexId],
				event.previousIndex,
				event.currentIndex,
			);
		}
		this.onDrop.emit([...event.container.data]);
	}

	/**
	 * Predicate function that only allows even numbers to be dropped into a list.
	 * @param drag
	 * @param drop
	 */
	public evenPredicate(drag: CdkDrag<number>, drop: CdkDropList<MatrixElementBase[][]>): boolean {
		const dropContainerId: number = +drop.id;
		return !drop.data[dropContainerId].length;
	}
}
