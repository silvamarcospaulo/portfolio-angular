import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocoesAmazonComponent } from './promocoes-amazon.component';

describe('PromocoesAmazonComponent', () => {
  let component: PromocoesAmazonComponent;
  let fixture: ComponentFixture<PromocoesAmazonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocoesAmazonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromocoesAmazonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
