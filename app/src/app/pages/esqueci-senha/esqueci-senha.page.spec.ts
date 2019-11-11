import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsqueciSenhaPage } from './esqueci-senha.page';

describe('EsqueciSenhaPage', () => {
  let component: EsqueciSenhaPage;
  let fixture: ComponentFixture<EsqueciSenhaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsqueciSenhaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsqueciSenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
