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
	Inject,
	TemplateRef,
} from '@angular/core';
import {
	EFileType,
	MatrixElement,
	MatrixElementBase,
	MatrixElementShort,
	MatrixEmitService,
} from './matrix-emit.service';

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

	public readonly matrix: MatrixElementBase[][] = this.getArr();

	public matrixLength: number = this.matrix.length;

	public listsMatrixIndex: string[] = Array(this.matrixLength)
		.fill(null)
		.map((u, i) => i.toString());

	public constructor(
		@Inject(MatrixEmitService) private readonly matrixEmitService: MatrixEmitService,
	) {}

	public trackByIndex(index: number, item: MatrixElementBase[]): number {
		return index;
	}

	public getIdToString(id: number): string {
		return id.toString();
	}

	public getCdkDropListConnectedToList(idx: number): string[] {
		const idxStr: string = idx.toString();
		return this.listsMatrixIndex.filter((item: string) => item !== idxStr);
	}

	public drop(event: CdkDragDrop<MatrixElementBase[][]>): void {
		console.log('event', event);
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
		this.matrixEmitService.setMatrixData([...event.container.data]);
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

	private getArr(): MatrixElementBase[][] {
		const array: number[] = Array(128)
			.fill(null)
			.map((u, i) => i); //массив, можно использовать массив объектов
		const size = 1; //размер подмассива
		const subarray: MatrixElementBase[][] = []; //массив в который будет выведен результат.
		for (let i = 0; i < Math.ceil(array.length / size); i++) {
			subarray[i] =
				i === 55
					? [
							new MatrixElement({
								_placeId: 55,
								_iconId: 1,
								_icon: 'tuiIconFileLarge',
								_name: '1',
								_mime: EFileType.FILE,
								_content: '',
							}),
					  ]
					: i === 56
					? [
							new MatrixElement({
								_placeId: 56,
								_iconId: 2,
								_icon: 'tuiIconFolderLarge',
								_name: '2',
								_mime: EFileType.FOLDER,
								_content: '',
							}),
					  ]
					: [];
		}
		console.log('subarray', subarray);
		return subarray;
	}
}
