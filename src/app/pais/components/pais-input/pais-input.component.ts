import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
})
export class PaisInputComponent implements OnInit{

  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter(); //onDebounce se va a emitir cuando la persona deja de escribir

  debouncer: Subject<string> = new Subject();

  termino: string = '';

  // obserbable es como una promesa, en lugar de .then es .subscribe
  // el ngOnInit se dispara una única vez cuando un componente es creado
  ngOnInit() {

    this.debouncer
      .pipe(debounceTime(300))
      .subscribe( valor => {
        // console.log('debouncer: ', valor);
        this.onDebounce.emit( valor )
    })

  }

  buscar() {

    this.onEnter.emit( this. termino );

  }

  teclaPresionada( event: any) {

    const valor = event.target.value;

    // console.log(valor);
    // console.log(this.termino);

    this.debouncer.next( this.termino );

  }

}
