import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonAboutComponent } from './button-about.component';

describe('ButtonAboutComponent', () => {
	let component: ButtonAboutComponent;
	let fixture: ComponentFixture<ButtonAboutComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ButtonAboutComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ButtonAboutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
