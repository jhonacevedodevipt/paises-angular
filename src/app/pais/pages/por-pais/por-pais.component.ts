import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
})
export class PorPaisComponent {

  termino : string  = '';
  hayError: boolean = false;
  paises  : Country[] = [];
  // hayPaises: boolean = false;

  constructor( private paisService: PaisService) { } // inyectar servicio en el constructor

  buscar( termino: string) {
    this.hayError = false;
    this.termino = termino;
    // para que un observable se dispara tengo que tener un subscribe
    this.paisService.buscarPais( termino )
      .subscribe( (paises) => {
        console.log(paises);
        this.paises = paises;
      }, (err) => {
        this.hayError = true;
        this.paises = [];
      }
      );
  }

  sugerencias( termino: string ) {
    this.hayError = false
    // TODO: crear sugerencias
  }

}
