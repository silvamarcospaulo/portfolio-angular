import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciasProfissionaisComponent } from './experiencias-profissionais.component';

describe('ExperienciasProfissionaisComponent', () => {
  let component: ExperienciasProfissionaisComponent;
  let fixture: ComponentFixture<ExperienciasProfissionaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienciasProfissionaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienciasProfissionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
