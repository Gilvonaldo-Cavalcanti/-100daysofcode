import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreinosarquivadosPage } from './treinosarquivados.page';

describe('TreinosarquivadosPage', () => {
  let component: TreinosarquivadosPage;
  let fixture: ComponentFixture<TreinosarquivadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreinosarquivadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreinosarquivadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
