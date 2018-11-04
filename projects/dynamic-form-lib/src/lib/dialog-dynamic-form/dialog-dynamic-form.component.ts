import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlService } from '../services/form-control.service';

@Component({
  selector: 'MP-dialog-dynamic-form',
  templateUrl: './dialog-dynamic-form.component.html',
  styleUrls: ['./dialog-dynamic-form.component.scss']
})
export class DialogDynamicFormComponent implements OnInit, OnChanges {

  /**
   * Di tipo Base<any>[]
   * [BUG] - NgPackagr non comprende l'ereditarietà
   */
  @Input() 
  public elements: any[] = [];

  @Input() 
  public header: string;
  
  @Input() 
  public target: any;
  @Output()
  public targetChange = new EventEmitter<any>();

  @Input() 
  public displayForm: boolean = false;
  @Output()
  public displayFormChange = new EventEmitter<boolean>();

  @Output()
  public onSave = new EventEmitter<FormGroup>();

  @Output()
  public formChange = new EventEmitter<any>();

  
  form: FormGroup;
  payLoad = '';
 
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

  public close(){
    this.displayForm = false;
    this.displayFormChange.emit(false);
  }

  public onHide(event){
    console.debug(`Chiuso form-dialog`);
    this.target = null;
    this.form.reset();
    if ( this.displayForm)
    this.displayFormChange.emit(false);
  }
 
  onSubmit() {
    console.debug(`OnSubmit Functions: `, this.form);
    this.onSave.emit(this.form);
  }

}
