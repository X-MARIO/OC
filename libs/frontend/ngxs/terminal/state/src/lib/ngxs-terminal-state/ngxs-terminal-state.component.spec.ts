import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsTerminalStateComponent } from './ngxs-terminal-state.component';

describe('NgxsTerminalStateComponent', () => {
	let component: NgxsTerminalStateComponent;
	let fixture: ComponentFixture<NgxsTerminalStateComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NgxsTerminalStateComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(NgxsTerminalStateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
