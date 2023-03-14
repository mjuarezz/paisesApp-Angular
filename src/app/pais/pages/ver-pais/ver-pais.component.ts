import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";

import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html'
})
export class VerPaisComponent implements OnInit{

  pais! : Country;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService) {}

  // Opcion 1 para acceder a id en la URL
  // ngOnInit(): void {
  //   this.activatedRoute.params
  //     .subscribe( params => {
  //       console.log(params['idPais']);
  //       console.log(params);
  //     })
  // }


  // Opcion 2 para obtener la info existente en la URL 
  // y llamar al servicio para realizar la busqueda
  // ngOnInit(): void {
  //   this.activatedRoute.params
  //     .subscribe( ({ idPais }) => {
  //       console.log(idPais );

  //       this.paisService.buscarPaisPorCodigo(idPais)
  //         .subscribe( pais => {
  //           console.log(pais );
  //         });
  //     })
  // }

  // Opcion 3 otra forma de implementar funcionalidad de opcion 2
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ( param ) => this.paisService.buscarPaisPorCodigo(param['idPais'] ) ),
        tap(console.log)
      )
      .subscribe( pais => this.pais = pais[0]);
  }

}
