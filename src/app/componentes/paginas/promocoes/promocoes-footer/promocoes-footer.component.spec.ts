import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocoesFooterComponent } from './promocoes-footer.component';

describe('PromocoesFooterComponent', () => {
  let component: PromocoesFooterComponent;
  let fixture: ComponentFixture<PromocoesFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocoesFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromocoesFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
