import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, EventEmitter, Injectable, Injector, Type } from '@angular/core';
import { DialogDinamicFormComponent } from '../dialog-dinamic-form/dialog-dinamic-form.component';
import { DialogConfig } from '../models/dialogConfig';
import { Base } from '../models/form-models';

@Injectable({
  providedIn: 'root'
})
export class DynamicDialogFormService {

  private onSave : EventEmitter<any>;

  private componentRef : ComponentRef<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, 
              private injector : Injector, 
              private appRef: ApplicationRef)
  {}

  /**
   * Return a Component Reference from Component Type
   * @param component 
   */
  private createComponentReference(component : Type<any>):ComponentRef<any>{
    const componentRef = this.componentFactoryResolver
    .resolveComponentFactory(component)
    .create(this.injector);

    return componentRef;
  }

  /**
   * Return HTML element from component Ref 
   * @param componentRef 
   */
  private getDomElementFromComponent(componentRef : ComponentRef<any>): HTMLElement{
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  /**
   * Append to body the argument element
   * @param htmlElement 
   */
  private appendToBody(htmlElement : HTMLElement){
    document.body.appendChild(htmlElement);
  }

  /**
   * Remove the element from Ng component tree  
   * and destroy component Reference
   * @param componentRef 
   */
  private removeElement(componentRef : ComponentRef<any>){
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }


  /**
   * Load dynamically a dialog, appended to body element
   * @param formConfig 
   */
  public showDialog(formConfig : Base<any>[], dialogConfig? : DialogConfig):EventEmitter<any>{
    if (this.componentRef != null ) return;

    // 1. Create a component reference from the component 
    this.componentRef = this.createComponentReference(DialogDinamicFormComponent);

    // 2. Initialize Component's properties
    (this.componentRef.instance as DialogDinamicFormComponent).init(formConfig, dialogConfig);

    // 3. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(this.componentRef.hostView);

    // 4. Get DOM element from component
    let element = this.getDomElementFromComponent(this.componentRef);

    // 5. Append DOM element to the body
    this.appendToBody(element);

    // 6. return onSave event emitter, to respond on hide event 
    this.onSave = new EventEmitter();
    return this.onSave;
  }

  /**
   * Hide dialog, and remove it from DOM
   */
  public hideAndRemoveDialog(){
    (this.componentRef.instance as DialogDinamicFormComponent).hide();

    // this.onSave.unsubscribe();

    this.removeElement(this.componentRef);
  }


  public _onSave(){
    // this.displayDialog = false;
    if ( this.onSave ){
      this.onSave.emit('Dialog chiuso');
    }
  }
}
