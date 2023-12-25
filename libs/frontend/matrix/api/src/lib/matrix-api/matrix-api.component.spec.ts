import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatrixApiComponent } from './matrix-api.component';

describe('MatrixApiComponent', () => {
	let component: MatrixApiComponent;
	let fixture: ComponentFixture<MatrixApiComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MatrixApiComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MatrixApiComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
