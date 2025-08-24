import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSliderComponent } from './lista-slider.component';

describe('ListaSliderComponent', () => {
  let component: ListaSliderComponent;
  let fixture: ComponentFixture<ListaSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
