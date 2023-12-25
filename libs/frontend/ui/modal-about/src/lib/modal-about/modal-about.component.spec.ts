import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalAboutComponent } from './modal-about.component';

describe('ModalAboutComponent', () => {
	let component: ModalAboutComponent;
	let fixture: ComponentFixture<ModalAboutComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ModalAboutComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ModalAboutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
