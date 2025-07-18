import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocoesHeaderComponent } from './promocoes-header.component';

describe('PromocoesHeaderComponent', () => {
  let component: PromocoesHeaderComponent;
  let fixture: ComponentFixture<PromocoesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocoesHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromocoesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
