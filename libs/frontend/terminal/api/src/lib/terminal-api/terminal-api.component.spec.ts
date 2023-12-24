import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerminalApiComponent } from './terminal-api.component';

describe('TerminalApiComponent', () => {
	let component: TerminalApiComponent;
	let fixture: ComponentFixture<TerminalApiComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TerminalApiComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TerminalApiComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
