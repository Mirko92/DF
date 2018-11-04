
export abstract class Base<T> {
    /**
     * Valore del campo 
     */
    public value?: T;
    /**
     * Nome della property => 'formControlName' 
     */
    public key?: string = '';
    /**
     * Etichetta visualizzata 
     */
    public label?: string = '';
    /**
     * TRUE = Campo obbligatorio 
     * FALSE = Non obbligatorio 
     */
    public required?: boolean = false;
    /**
     * TRUE = Campo ReadOnly
     * FALSE = Campo Editabile
     */
    public disabled?:boolean;
    /**
     * Ordine di visualizzazione 
     */
    public order?: number = 1;

    public controlType?: string = '';

    public customValidators? : any[];
   
    constructor(options: Base<T>) 
    {
      Object.assign(this, options);
    }
  }

  /**
   * Textbox -> Per le tipologie di input testuali: text, email, url
   * Valorizzando "type"
   */
  export class Textbox extends Base<string> {
    public controlType? = 'textbox';
    public type?: string = '';

    public maxLength?:number;
    public minLength?:number;
  
    constructor(options: Textbox) {
      super(options);
      Object.assign(this, options);
    }
  }

  /**
   * 
   */
  export class Numberbox extends Base<number> {
    public controlType? = 'number';
    public type?: string = 'number';

    public min?   : number;
    public max?   : number;
    public step?  : number;
  
    constructor(options: Numberbox) {
      super(options);
      Object.assign(this, options);
    }
  }

  /**
   * DropDown -> per una select 
   */
  export class Dropdown extends Base<any> {
    public controlType? = 'dropdown';
    /**
     * Opzioni della select 
     */
    public options: SelectItem[] = [];
    
    public defaultLabel : string = 'COMMON.TO_SELECT';
    constructor(options:Dropdown) {
      super(options);
      Object.assign(this, options);
    }
  }

  export class Multiselect extends Dropdown{
    public controlType? = 'multiselect';
    public values? : Array<any> = [];

    constructor(options: Multiselect) {
      super(options);
      Object.assign(this, options);
    }
  }


  export class RadioOptions extends  Base<any> {
    public controlType? = 'radio';

    public groupName? = 'radioElement';

    /**
     * Opzioni di scelta 
     */
    public options: SelectItem[] = [];

    constructor(options : RadioOptions){
      super(options);
      Object.assign(this, options);
    }
  }


  export class SelectItem{
    public value:any;

    public label:any;
  }