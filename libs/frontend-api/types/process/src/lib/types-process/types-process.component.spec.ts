import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypesProcessComponent } from './types-process.component';

describe('TypesProcessComponent', () => {
	let component: TypesProcessComponent;
	let fixture: ComponentFixture<TypesProcessComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TypesProcessComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TypesProcessComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
