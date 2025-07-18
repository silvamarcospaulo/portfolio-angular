import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocoesAliexpressComponent } from './promocoes-aliexpress.component';

describe('PromocoesAliexpressComponent', () => {
  let component: PromocoesAliexpressComponent;
  let fixture: ComponentFixture<PromocoesAliexpressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocoesAliexpressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromocoesAliexpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
