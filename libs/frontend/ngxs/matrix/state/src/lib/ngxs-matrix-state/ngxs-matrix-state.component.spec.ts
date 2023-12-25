import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsMatrixStateComponent } from './ngxs-matrix-state.component';

describe('NgxsMatrixStateComponent', () => {
	let component: NgxsMatrixStateComponent;
	let fixture: ComponentFixture<NgxsMatrixStateComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NgxsMatrixStateComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(NgxsMatrixStateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
