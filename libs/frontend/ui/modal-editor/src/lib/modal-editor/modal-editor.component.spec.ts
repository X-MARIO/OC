import { ModalEditorComponent } from './modal-editor.component';

import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

describe('modalEditorComponent', () => {
	let component: ModalEditorComponent;
	let fixture: ComponentFixture<ModalEditorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ModalEditorComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ModalEditorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect.hasAssertions();
		expect(component).toBeTruthy();
	});
});
