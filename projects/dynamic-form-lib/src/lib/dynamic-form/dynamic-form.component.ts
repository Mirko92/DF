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
  elements: any[] = [];
  
  /**
   * Oggetto contenitore e destinatario dei valori costruiti dalla form 
   */
  @Input() 
  target: any;
  @Output()
  targetChange = new EventEmitter<any>();

  /**
   * Evento di output
   * Espone all'esterno la form al momento della creazione
   */
  @Output()
  public form = new EventEmitter<FormGroup>();

  _form: FormGroup;
  
  @ContentChildren(ElementDirective) 
  custom_element_templates : QueryList<any>;
 
  constructor(private _formSVC: FormControlService) {  }

  ngOnChanges(changes : SimpleChanges){
    console.debug("DynamicFormComponent.OnChange", changes); //TODO: Controllare che non funzioni in prod 

    if ( changes['target']){
      console.debug("Cambiamento rilevato in target");
      if ( this.target.id ){
        console.debug("Target ha un ID");
        this.buildForm(this.elements, this.target);
      }
    }else{
      if ( changes['elements']){
        console.debug("Cambiamento rilevato in elements"); //TODO: Controllare che non funzioni in prod 
        this.buildForm(this.elements);
      }
    }

  }

  /**
   * Costruisce la form e la espone all'esterno del componente 
   * @param elements 
   * @param target 
   */
  private buildForm(elements :any[], target? :any){
    console.debug("DynamicFormComponent.buildForm", elements, target); //TODO: Controllare che non funzioni in prod 
    this._form = this._formSVC.toFormGroup(elements, target);

    this.form.emit(this._form);
  }

}
