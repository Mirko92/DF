import { Component, Input, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Base, Numberbox } from '../models/form-models';

@Component({
  selector: 'MP-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss']
})
export class FormElementComponent {

  /**
   * Oggetto della form che si andrà a visualizzare
   */
  @Input() 
  public form: FormGroup;

  /**
   * Di tipo Base<any> 
   * Singolo elemento della form da renderizzare 
   * [BUG] - NgPackagr non comprende l'ereditarietà
   */
  @Input() 
  public element: any;


  /**
   * Di tipo Base<any> 
   * [BUG] - NgPackagr non comprende l'ereditarietà
   * 
   * Templates custom per la rappresentazione degli elementi della form.
   */
  @Input() 
  public custom_element_templates: QueryList<any>;
  
  get isValid():boolean { 
    if(this.form.controls && this.form.controls[this.element.key]){
       return this.form.controls[this.element.key].valid;
    }
    return null;
  }

  textOnBlur(event:any, element:Base<string>){
    let value = <string>this.form.value[element.key];
    if (value){
      this.form.controls[element.key].setValue((<string>value).trim());
    }  
  }

  numberOnBlur(event:any, element:Base<number>){
    let value = this.form.value[element.key];
    if (value != null){
      let precision = (<Numberbox>element).step ? (1/(<Numberbox>element).step) : 1;
      this.form.controls[element.key].setValue(Math.round(value * precision) / precision);
    }
  }
}
