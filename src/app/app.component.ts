import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Base, DynamicDialogFormService, FormControlService, Numberbox, RadioOptions, Textbox } from 'dynamic-form-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TEST DYNAMIC FORM';

  /**
   * Gestione dialog con form dinamica 
   */
  public displayForm : boolean = false;

  public target : any = {};

  constructor(private _formControlSVC : FormControlService, private dialogSVC : DynamicDialogFormService){
    console.debug(`APP_COMPONENT: Constructor`);
  }

  btn_trayForm(){
    this.displayForm = true;
  }

  get elements(){
    return ecForm;
  }

  get first(){
    return ecForm[0];
  }

  formChange(event : any){
    debugger;
    console.log('FORM: Change Value Event');
  }

  showDialog(){
    let result = this.dialogSVC.showDialog(ecForm, { target:  { code:"Ciao", 
                                                                ert:"Ciaone",
                                                                id:1
                                                              }
                                                    }
                                          );

    debugger;

    result.subscribe(x => {
      console.debug("Salvataggio form: ", x);
    })
  }
  
}

const baseForm : Base<any>[] = [
  new Textbox({     key: 'code',         label: 'Code',         required:true,    order: 1,   minLength:1,   maxLength:16, customValidators:[emailValidator]  }),
  new Textbox({     key: 'ert',          label: 'ERT',          required:true,    order: 6,   minLength:1,   maxLength:16 }),
  new Numberbox({   key: 'wcRatio',      label: 'A/C',          required:true,    order: 2,   min:0,  max:2,    step:0.001  }),
  new Numberbox({   key: 'minCement',    label: 'Min Cement',   required:true,    order: 3,   min:0,  max:2000, step:1 }),
  new RadioOptions({key: 'isAirPresent', label: 'Air',          required:true,    order: 5,   
                      options:[
                        {label:'YES',  value:true},
                        {label:'NO',   value:false},
                      ]
                  }),
  new Numberbox({key: 'rckMin',       label: 'Rck',   required:true,    order: 4, min:0,  max:100,  step:1  })
];

const ecForm: Base<any>[] = [...baseForm, {type:'pippo', key: 'prova',         label: 'Label della prova ',            order: 5 }];


/**
 * Validatore Custom per le email inserite nelle form 
 * @param control :FormControl
 */
export function emailValidator(control: FormControl): {[key: string]: any} {
  var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;    
  if (control.value && !emailRegexp.test(control.value)) {
      return {invalidEmail: true};
  }
}