import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[mpElementTemplate]',
  host:{}
})
export class ElementDirective {
  @Input() type: string;
  
  @Input('mpElementTemplate') name: string;
  
  constructor(public template: TemplateRef<any>) {}
  
  getType(): string {
      return this.name;
  }

}



