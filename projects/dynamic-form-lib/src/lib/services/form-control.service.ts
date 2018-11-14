import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Base, Numberbox, Textbox } from '../models/form-models';

@Injectable({
  providedIn:'root'
})
export class FormControlService {

  constructor() { }

  toFormGroup(elements: Base<any>[], target?:any) : FormGroup{
    let group: any = {};
    elements = elements.sort((a, b) => a.order - b.order);
    elements.forEach(element => {
      /**
       * Se l'oggetto di destinazione ha già un valore per questo campo, lo carico nella form
       */
      if (target && target[element.key]){
        element.value = target[element.key];
      }
      //Validatori 
      let vs = [];

      if ( element.controlType == 'number'){
        (<Numberbox>element).min ? vs.push(Validators.min((<Numberbox>element).min)) : null;
        (<Numberbox>element).max ? vs.push(Validators.max((<Numberbox>element).max)) : null;

      }else if(element.controlType == 'textbox'){
        (<Textbox>element).maxLength ? vs.push(Validators.minLength((<Textbox>element).minLength)) : null;
        (<Textbox>element).minLength ? vs.push(Validators.maxLength((<Textbox>element).maxLength)) : null;
      }

      /* Aggiungo i validatori custom passati dall'esterno */
      if ( element.customValidators && element.customValidators.length > 0){
        vs = [...vs, ...element.customValidators];
      }

      group[element.key] = element.required ? new FormControl({value: element.value, disabled: element.disabled} || '', [...vs, Validators.required])
                                            : new FormControl({value: element.value, disabled: element.disabled} || '', vs);

      
    });
    return new FormGroup(group);
  }

}
