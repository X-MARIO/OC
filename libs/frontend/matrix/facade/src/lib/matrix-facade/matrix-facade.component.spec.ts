import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatrixFacadeComponent } from './matrix-facade.component';

describe('MatrixFacadeComponent', () => {
	let component: MatrixFacadeComponent;
	let fixture: ComponentFixture<MatrixFacadeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MatrixFacadeComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MatrixFacadeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
