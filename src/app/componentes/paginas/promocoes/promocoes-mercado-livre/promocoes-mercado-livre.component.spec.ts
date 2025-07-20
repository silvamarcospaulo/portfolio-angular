import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocoesMercadoLivreComponent } from './promocoes-mercado-livre.component';

describe('PromocoesMercadoLivreComponent', () => {
  let component: PromocoesMercadoLivreComponent;
  let fixture: ComponentFixture<PromocoesMercadoLivreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocoesMercadoLivreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromocoesMercadoLivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
