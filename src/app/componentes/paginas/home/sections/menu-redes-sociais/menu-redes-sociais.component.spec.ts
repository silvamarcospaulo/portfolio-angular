import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRedesSociaisComponent } from './menu-redes-sociais.component';

describe('MenuRedesSociaisComponent', () => {
  let component: MenuRedesSociaisComponent;
  let fixture: ComponentFixture<MenuRedesSociaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuRedesSociaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuRedesSociaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
