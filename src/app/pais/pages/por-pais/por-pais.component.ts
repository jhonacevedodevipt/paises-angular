import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li {
      cursor: pointer;
    }
  `]
})
export class PorPaisComponent {

  termino : string  = '';
  hayError: boolean = false;
  paises  : Country[] = [];

  paisesSugeridos   : Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor( private paisService: PaisService) { } // inyectar servicio en el constructor

  buscar( termino: string) {

    this.mostrarSugerencias = false;
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
    this.termino = termino;
    this.mostrarSugerencias = true;
    // TODO: crear sugerencias
    this.paisService.buscarPais( termino )
      .subscribe(
        paises => this.paisesSugeridos = paises.splice(0,5),
        ( err ) => this.paisesSugeridos = []
      );
  }

  buscarSugerido( termino: string) {
    this.buscar( termino );
  }

}
