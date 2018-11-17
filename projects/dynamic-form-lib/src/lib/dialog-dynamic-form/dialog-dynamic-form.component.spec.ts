import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogDynamicFormComponent } from './dialog-dynamic-form.component';


describe('DialogDynamicFormComponent', () => {
  let component: DialogDynamicFormComponent;
  let fixture: ComponentFixture<DialogDynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDynamicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
