import { ModalDeleteComponent } from './modal-delete.component';

import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

describe('modalDeleteComponent', () => {
	let component: ModalDeleteComponent;
	let fixture: ComponentFixture<ModalDeleteComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ModalDeleteComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ModalDeleteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
