import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StorageLocalComponent } from './storage-local.component';

describe('StorageLocalComponent', () => {
	let component: StorageLocalComponent;
	let fixture: ComponentFixture<StorageLocalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [StorageLocalComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(StorageLocalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
