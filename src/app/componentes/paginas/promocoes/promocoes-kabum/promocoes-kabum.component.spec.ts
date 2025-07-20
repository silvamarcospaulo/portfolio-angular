import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocoesKabumComponent } from './promocoes-kabum.component';

describe('PromocoesKabumComponent', () => {
  let component: PromocoesKabumComponent;
  let fixture: ComponentFixture<PromocoesKabumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocoesKabumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromocoesKabumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
