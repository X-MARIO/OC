import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalRenameComponent } from './modal-rename.component';

describe('ModalRenameComponent', () => {
	let component: ModalRenameComponent;
	let fixture: ComponentFixture<ModalRenameComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ModalRenameComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ModalRenameComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
