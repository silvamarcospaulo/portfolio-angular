import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchDiaNoiteComponent } from './switch-dia-noite.component';

describe('SwitchDiaNoiteComponent', () => {
  let component: SwitchDiaNoiteComponent;
  let fixture: ComponentFixture<SwitchDiaNoiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchDiaNoiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchDiaNoiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
