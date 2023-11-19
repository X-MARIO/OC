import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalEditorComponent } from './modal-editor.component';

describe('ModalEditorComponent', () => {
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
		expect(component).toBeTruthy();
	});
});
