import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProjetosComponent } from './card-projetos.component';

describe('MacbookComponent', () => {
  let component: CardProjetosComponent;
  let fixture: ComponentFixture<CardProjetosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProjetosComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardProjetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
