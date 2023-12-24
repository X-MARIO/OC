import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableProcessComponent } from './table-process.component';

describe('TableProcessComponent', () => {
	let component: TableProcessComponent;
	let fixture: ComponentFixture<TableProcessComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TableProcessComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TableProcessComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
