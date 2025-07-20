import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocoesHostingerComponent } from './promocoes-hostinger.component';

describe('PromocoesHostingerComponent', () => {
  let component: PromocoesHostingerComponent;
  let fixture: ComponentFixture<PromocoesHostingerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocoesHostingerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromocoesHostingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
