import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreinoPage } from './treino.page';

describe('TreinoPage', () => {
  let component: TreinoPage;
  let fixture: ComponentFixture<TreinoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreinoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreinoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
