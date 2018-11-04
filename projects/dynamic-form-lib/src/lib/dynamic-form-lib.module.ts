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
import { DialogDynamicFormComponent } from './dialog-dynamic-form/dialog-dynamic-form.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormElementComponent } from './form-element/form-element.component';
import { ElementDirective } from './directives/element.directive';


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
    DialogDynamicFormComponent,
    DynamicFormComponent,
    ElementDirective
  ],
  exports: [
    FormElementComponent, 
    DialogDynamicFormComponent,
    DynamicFormComponent
  ]
})
export class DynamicFormLibModule { }
