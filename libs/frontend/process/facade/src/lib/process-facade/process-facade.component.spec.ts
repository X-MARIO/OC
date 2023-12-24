import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessFacadeComponent } from './process-facade.component';

describe('ProcessFacadeComponent', () => {
	let component: ProcessFacadeComponent;
	let fixture: ComponentFixture<ProcessFacadeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ProcessFacadeComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ProcessFacadeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
