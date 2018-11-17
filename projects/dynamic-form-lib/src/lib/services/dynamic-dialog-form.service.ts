import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { Base } from 'dynamic-form-lib/public_api';

@Injectable({
  providedIn: 'root'
})
export class DynamicDialogFormService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver, 
              private injector : Injector, 
              private appRef: ApplicationRef)
  {

  }

  private appendComponentToBody(component: any) {
    // 1. Create a component reference from the component 
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);
    
    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);
    
    // 3. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    
    // 4. Append DOM element to the body
    document.body.appendChild(domElem);
    
    // 5. Wait some time and remove it from the component tree and from the DOM
    setTimeout(() => {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }, 3000);
  }

  public showDialog(formConfig : Base<any>[]){

  }
}
