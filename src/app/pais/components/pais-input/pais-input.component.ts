import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
})
export class PaisInputComponent implements OnInit{

  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter(); //onDebounce se va a emitir cuando la persona deja de escribir

  debouncer: Subject<string> = new Subject();

  termino: string = '';

  // el ngOnInit se dispara una única vez cuando un componente es creado
  ngOnInit() {
    this.debouncer.subscribe( valor => {
      console.log('debouncer: ', valor);
    })
  }

  buscar() {
    this.onEnter.emit( this. termino );
  }

  teclaPresionada( event: any) {
    const valor = event.target.value;
    console.log(valor);
    console.log(this.termino);

    this.debouncer.next( this.termino );

  }

}
