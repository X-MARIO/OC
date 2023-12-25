import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypesMatrixComponent } from './types-matrix.component';

describe('TypesMatrixComponent', () => {
	let component: TypesMatrixComponent;
	let fixture: ComponentFixture<TypesMatrixComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TypesMatrixComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TypesMatrixComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
