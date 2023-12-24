import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalProcessComponent } from './modal-process.component';

describe('ModalProcessComponent', () => {
	let component: ModalProcessComponent;
	let fixture: ComponentFixture<ModalProcessComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ModalProcessComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ModalProcessComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
