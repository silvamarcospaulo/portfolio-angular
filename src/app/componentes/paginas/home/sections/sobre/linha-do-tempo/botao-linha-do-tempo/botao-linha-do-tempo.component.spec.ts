import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoLinhaDoTempoComponent } from './botao-linha-do-tempo.component';

describe('BotaoLinhaDoTempoComponent', () => {
  let component: BotaoLinhaDoTempoComponent;
  let fixture: ComponentFixture<BotaoLinhaDoTempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoLinhaDoTempoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoLinhaDoTempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
