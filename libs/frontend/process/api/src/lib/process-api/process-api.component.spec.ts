import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessApiComponent } from './process-api.component';

describe('ProcessApiComponent', () => {
	let component: ProcessApiComponent;
	let fixture: ComponentFixture<ProcessApiComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ProcessApiComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ProcessApiComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
