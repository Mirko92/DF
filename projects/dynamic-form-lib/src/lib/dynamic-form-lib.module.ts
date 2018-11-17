import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SpinnerModule } from 'primeng/spinner';
import { DialogDinamicFormComponent } from './dialog-dinamic-form/dialog-dinamic-form.component';
import { ElementDirective } from './directives/element.directive';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormElementComponent } from './form-element/form-element.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MultiSelectModule,
    RadioButtonModule,
    ButtonModule,
    InputTextModule,
    SpinnerModule,
    DropdownModule,
    DialogModule
  ],
  declarations: [
    FormElementComponent,
    DynamicFormComponent,
    ElementDirective,
    DialogDinamicFormComponent
  ],
  exports: [
    FormElementComponent, 
    DynamicFormComponent,
    ElementDirective
  ],
  entryComponents:[
    DialogDinamicFormComponent
  ]
})
export class DynamicFormLibModule { }
