import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    li {
      cursor: pointer;
    }
    `
  ]
})
export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  paises : Country[] = [];
  paisesSugeridos  : Country[] = [];
  mostrarSugerencias : boolean = false;

  constructor(private paisService : PaisService) {}

  buscar( termino : string ) {
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPais(this.termino)
      .subscribe({
        next: (paises) => {
          this.paises = paises;
        },
        error: (err) => {
          console.log('error');
          this.hayError = true;
          console.info(err);
          this.paises = [];
        },
        complete: () => console.info('complete')       
      });
  }

  sugerencias( termino : string ) {
    this.mostrarSugerencias = true;
    this.hayError = false;
    this.termino = termino;
    if(termino.length === 0 ) { return; }
    this.termino = termino;
    this.paisService.buscarPais( termino )
      .subscribe( 
        paises => this.paisesSugeridos = paises.slice(0,5),
        (err) => this.paisesSugeridos = []
        );
  }

  buscarSugerido( termino : string ) {
    this.buscar( termino );
  } 

}
