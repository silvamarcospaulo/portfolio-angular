import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownIdiomasComponent } from './dropdown-idiomas.component';

describe('DropdownIdiomasComponent', () => {
  let component: DropdownIdiomasComponent;
  let fixture: ComponentFixture<DropdownIdiomasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownIdiomasComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DropdownIdiomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});