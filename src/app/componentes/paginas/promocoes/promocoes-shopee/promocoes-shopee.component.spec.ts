import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocoesShopeeComponent } from './promocoes-shopee.component';

describe('PromocoesShopeeComponent', () => {
  let component: PromocoesShopeeComponent;
  let fixture: ComponentFixture<PromocoesShopeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocoesShopeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromocoesShopeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
