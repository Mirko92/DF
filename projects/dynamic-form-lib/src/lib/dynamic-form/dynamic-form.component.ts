import { Component, ContentChildren, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ElementDirective } from '../directives/element.directive';
import { FormControlService } from '../services/form-control.service';


@Component({
  selector: 'MP-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnChanges {

  /**
   * Di tipo Base<any>[]
   * [BUG] - NgPackagr non comprende l'ereditarietà
   */
  @Input() 
  public elements: any[] = [];
  
  /**
   * Oggetto contenitore e destinatario dei valori costruiti dalla form 
   */
  @Input() 
  public target: any;
  @Output()
  public targetChange = new EventEmitter<any>();

  @ContentChildren(ElementDirective) 
  custom_element_templates : QueryList<any>;

  // @Output('form')
  // public onFormChange = new EventEmitter<FormGroup>();
  _form: FormGroup;
 
  constructor(private _formSVC: FormControlService) {  }

  ngOnChanges(changes : SimpleChanges){
    if ( changes['elements']){
      this._form = this._formSVC.toFormGroup(this.elements);
    }
    if ( changes['target'] && !changes['target'].firstChange){
      if ( this.target.id ){
        this._form = this._formSVC.toFormGroup(this.elements, this.target);
      }
    }

    // this.onFormChange.emit(this._form);
  }

}
