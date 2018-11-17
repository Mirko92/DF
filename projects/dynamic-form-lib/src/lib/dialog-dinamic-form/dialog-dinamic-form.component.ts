import { Component } from '@angular/core';
import { DialogConfig } from '../models/dialogConfig';
import { DynamicDialogFormService } from '../services/dynamic-dialog-form.service';

@Component({
  selector: 'MP-dialog-dinamic-form',
  templateUrl: './dialog-dinamic-form.component.html',
  styleUrls: ['./dialog-dinamic-form.component.css']
})
export class DialogDinamicFormComponent{

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

  saveLabel : string = "Salva";

  cancelLabel : string = "Chiudi";

  constructor(private dialogSVC : DynamicDialogFormService) { }

  init(elements: any[], config? : DialogConfig){
    this.header = (config && config.header)||"Form Dinamica";


    this.visible = true;
  }

  onSaveClick(){
    this.visible = false;
  }

  onCancelClick(){
    this.hide();
  }

  hide(){
    this.visible = false;
  }

  onHide(){
    this.dialogSVC.hideAndRemoveDialog()
  }

}
