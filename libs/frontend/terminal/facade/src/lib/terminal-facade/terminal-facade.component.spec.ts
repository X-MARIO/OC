import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerminalFacadeComponent } from './terminal-facade.component';

describe('TerminalFacadeComponent', () => {
	let component: TerminalFacadeComponent;
	let fixture: ComponentFixture<TerminalFacadeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TerminalFacadeComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TerminalFacadeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
