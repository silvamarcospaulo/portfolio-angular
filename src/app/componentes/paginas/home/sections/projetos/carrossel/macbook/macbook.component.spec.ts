import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacbookComponent } from './macbook.component';

describe('MacbookComponent', () => {
  let component: MacbookComponent;
  let fixture: ComponentFixture<MacbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacbookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MacbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
