import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ElementDirective } from '../directives/element.directive';
import { FormControlService } from '../services/form-control.service';


@Component({
  selector: 'MP-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  /**
   * Di tipo Base<any>[]
   * [BUG] - NgPackagr non comprende l'ereditarietà
   */
  @Input() 
  public elements: any[] = [];
  
  @Input() 
  public target: any;
  @Output()
  public targetChange = new EventEmitter<any>();

  @Output()
  public onSave = new EventEmitter<FormGroup>();

  @Output()
  public formChange = new EventEmitter<any>();

  @ContentChildren(ElementDirective) 
  custom_element_templates : QueryList<any>;

  
  form: FormGroup;
 
  constructor(private _formSVC: FormControlService) {  }
 
  ngOnInit() {
    console.debug(`Ricevuti elementi per form dinamica: `, this.elements);
  }

  ngOnChanges(changes : SimpleChanges){
    if ( changes['elements']){
      this.form = this._formSVC.toFormGroup(this.elements);
      this.form.valueChanges.subscribe( event => this.formChange.emit(event));
    }
    if ( changes['target'] && !changes['target'].firstChange){
      if ( this.target.id ){
        this.form = this._formSVC.toFormGroup(this.elements, this.target);
      }
    }
  }
 
  onSubmit() {
    console.debug(`OnSubmit Functions: `, this.form);
    this.onSave.emit(this.form);
  }

}
