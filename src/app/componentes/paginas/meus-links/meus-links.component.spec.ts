import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusLinksComponent } from './meus-links.component';

describe('MeusLinksComponent', () => {
  let component: MeusLinksComponent;
  let fixture: ComponentFixture<MeusLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusLinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeusLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
