import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
})
export class PorCapitalComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) {} // inyectar servicio en el constructor

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    // para que un observable se dispara tengo que tener un subscribe
    this.paisService.buscarCapital( termino )
    .subscribe( (paises) => {
        console.log(paises);
        this.paises = paises;
    }, (err) => {
      this.hayError = true;
      this.paises = [];
    });
  }
}
