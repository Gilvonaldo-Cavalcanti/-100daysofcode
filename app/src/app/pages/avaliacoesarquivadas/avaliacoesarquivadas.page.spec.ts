import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacoesarquivadasPage } from './avaliacoesarquivadas.page';

describe('AvaliacoesarquivadasPage', () => {
  let component: AvaliacoesarquivadasPage;
  let fixture: ComponentFixture<AvaliacoesarquivadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaliacoesarquivadasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacoesarquivadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
