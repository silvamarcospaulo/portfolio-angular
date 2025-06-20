import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardExperienciaProfissionalComponent } from './card-experiencia-profissional.component';

describe('CardExperienciaProfissionalComponent', () => {
  let component: CardExperienciaProfissionalComponent;
  let fixture: ComponentFixture<CardExperienciaProfissionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardExperienciaProfissionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardExperienciaProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
