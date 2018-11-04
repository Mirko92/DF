import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[mPElementTemplate]',
  host:{}
})
export class ElementDirective {
  @Input() type: string;
  
  @Input('mTemplate') name: string;
  
  constructor(public template: TemplateRef<any>) {}
  
  getType(): string {
      return this.name;
  }

}



