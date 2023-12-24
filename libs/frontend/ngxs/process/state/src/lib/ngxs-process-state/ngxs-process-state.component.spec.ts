import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsProcessStateComponent } from './ngxs-process-state.component';

describe('NgxsProcessStateComponent', () => {
	let component: NgxsProcessStateComponent;
	let fixture: ComponentFixture<NgxsProcessStateComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NgxsProcessStateComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(NgxsProcessStateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
