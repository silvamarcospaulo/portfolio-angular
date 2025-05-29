import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadosLinksComponent } from './afiliados-links.component';

describe('AfiliadosLinksComponent', () => {
  let component: AfiliadosLinksComponent;
  let fixture: ComponentFixture<AfiliadosLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfiliadosLinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfiliadosLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
