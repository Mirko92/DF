-   Aggiungere servizio per la localizzazione delle stringhe ??
-   Portare a fattor comune in una classe il codice in comune tra DialogForm e Form, magari l'uno estende l'altro 
-   Aggiungere componente senza Dialog
-   Restituire form e testarne il controllo da fuori 
-   Validatori custom --> Con relativi messaggi 
-   Enter su campi Form (key.enter)="enter" /*Stop Propagation && CheckIsValid*/
-	Al blur dei campi testo, oltre il trim va aggiunto che se la Stringa è '' (vuota) va sostituita con NULL [OPZIONE DISATTIVABILE]
-	Il tema ngPrime dovrebbe essere una dependencies 
-	Aggiunti commenti e funzionalità in smartlab:

  /**
   * Configurazione FORM 
   */
  @Input() 
  public elements: Base<any>[] = [];

  /**
   * Intestazione Dialog 
   */
  @Input() 
  public header: string;
  
  /**
   * Oggetto su cui è modellata la form 
   */
  @Input() 
  public target: any;
  @Output()
  public targetChange = new EventEmitter<any>();

  /**
   * Gestione del Dialog, visibile o meno 
   */
  @Input() 
  public displayForm: boolean = false;
  @Output()
  public displayFormChange = new EventEmitter<boolean>();

  /**
   * Evento di Save 
   */
  @Output()
  public onSave = new EventEmitter<FormGroup>();

  /**
   * Evento di Change su FORM
   */
  @Output()
  public formChange = new EventEmitter<any>();

  /**
   * FORM generata in output 
   */
  public formOutput = new EventEmitter<FormGroup>();

  
  form: FormGroup;
 
  constructor(private qcs: FormControlService) {  }
 
  ngOnInit() {
    console.debug(`Ricevuti elementi per form dinamica: `, this.elements);
  }

  ngOnChanges(changes : SimpleChanges){
    if ( changes['elements']){
      this.form = this.qcs.toFormGroup(this.elements);
      this.form.valueChanges.subscribe( event => this.formChange.emit(event));
      this.formOutput.emit(this.form);
    }
    if ( changes['target'] && !changes['target'].firstChange){
      if ( this.target.id ){
        this.form = this.qcs.toFormGroup(this.elements, this.target);
        this.formOutput.emit(this.form);
      }
    }
  }