import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalProcessErrorComponent } from './modal-process-error.component';

describe('ModalProcessErrorComponent', () => {
	let component: ModalProcessErrorComponent;
	let fixture: ComponentFixture<ModalProcessErrorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ModalProcessErrorComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ModalProcessErrorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
