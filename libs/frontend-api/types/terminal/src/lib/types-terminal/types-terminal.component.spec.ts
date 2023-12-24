import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypesTerminalComponent } from './types-terminal.component';

describe('TypesTerminalComponent', () => {
	let component: TypesTerminalComponent;
	let fixture: ComponentFixture<TypesTerminalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TypesTerminalComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TypesTerminalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
