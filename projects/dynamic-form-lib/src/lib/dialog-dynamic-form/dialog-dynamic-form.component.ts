import { Component, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { DialogConfig } from '../models/dialogConfig';
import { DynamicDialogFormService } from '../services/dynamic-dialog-form.service';

@Component({
  selector: 'MP-dialog-dynamic-form',
  templateUrl: './dialog-dynamic-form.component.html',
  styleUrls: ['./dialog-dynamic-form.component.css']
})
export class DialogDynamicFormComponent{

  /**
   * Gestisce la visibilità del DIALOG
   */
  visible : boolean = false;

  /**
   * Stringa visualizzata nell'HEADER del DIALOG
   */
  header : string;

  /**
   * Di tipo Base<any>[]
   * [BUG] - NgPackagr non comprende l'ereditarietà
   */
  elements: any[] = [];


  public target : any = {};

  saveLabel : string = "Salva";

  cancelLabel : string = "Chiudi";

  @ViewChild('dialogForm')
  dynamicForm : DynamicFormComponent;

  constructor(private dialogSVC : DynamicDialogFormService) { }

  init(elements: any[], config? : DialogConfig){
    this.header = (config && config.header)||"Form Dinamica";

    this.elements = elements;

    this.target = config.target;

    this.visible = true;
  }

  /**
   * Handler 'OnClick' save button event
   */
  onSaveClick(){
    let form = this.dynamicForm._form;

    this.dialogSVC._onSave(form);
  }

  /**
   * Handler 'OnClick' cancel button event 
   */
  onCancelClick(){
    this.hide();
  }

  hide(){
    this.visible = false;
  }

  /**
   * Handler 'OnHide' dialog event 
   */
  onHide(){
    this.dialogSVC.hideAndRemoveDialog()
  }

}
