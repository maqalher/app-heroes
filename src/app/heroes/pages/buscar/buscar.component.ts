import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor( private heroesService:HeroesService ) { }

  ngOnInit(): void {
  }

  buscando() {
    this.heroesService.getSugerencias( this.termino.trim() )
      .subscribe(heroes => this.heroes = heroes)
  }

  opcionSeleccionada( event:any ) {
    // console.log(event)

    // validar si es un string vacio
    if(!event.option.value) {
      console.log('No hay valor');
      this.heroeSeleccionado = undefined;
      return;
    }


    const heroe:Heroe = event.option.value; // es donde se encuenta la infomacion
    // console.log(heroe);
    this.termino = heroe.superhero;

    this.heroesService.getHeroesPorId(heroe.id!)
      .subscribe(heroe => this.heroeSeleccionado = heroe);

  }

}
