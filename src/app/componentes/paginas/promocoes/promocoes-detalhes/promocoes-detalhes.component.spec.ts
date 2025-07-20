import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocoesDetalhesComponent } from './promocoes-detalhes.component';

describe('PromocoesDetalhesComponent', () => {
  let component: PromocoesDetalhesComponent;
  let fixture: ComponentFixture<PromocoesDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocoesDetalhesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromocoesDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
