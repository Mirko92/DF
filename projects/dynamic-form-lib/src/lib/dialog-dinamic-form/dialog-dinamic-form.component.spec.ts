import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDinamicFormComponent } from './dialog-dinamic-form.component';

describe('DialogDinamicFormComponent', () => {
  let component: DialogDinamicFormComponent;
  let fixture: ComponentFixture<DialogDinamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDinamicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDinamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
