import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(
    private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialod: MatDialog
  ) { }

  ngOnInit(): void {

    // si no es la pagina de editar
    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroeService.getHeroesPorId(id))
      )
      .subscribe(heroe => this.heroe = heroe)
    // .subscribe(({id}) => console.log(id))

  }

  guardar() {
    // console.log(this.heroe);
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      // Actualiza
      this.heroeService.actualizarHeroe(this.heroe)
        .subscribe(resp => {
          console.log('Actualizando', resp);
          this.mostrarSnackbar('Registro Actualizado');
        })
    } else {
      // Crea
      this.heroeService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          // console.log('Respuesta', heroe);
          this.mostrarSnackbar('Registro Creado');
          this.router.navigate(['/heroes/editar', heroe.id])
        })
    }
  }

  borrarHeroe() {

    const dialog = this.dialod.open(ConfirmarComponent, {
      width: '250px',
      //  data: {...this.heroe}
      data: this.heroe
    });

    dialog.afterClosed().subscribe(
      (result) => {
        // si es true
        if (result) {
          this.heroeService.borrarHeroe(this.heroe.id!)
            .subscribe(resp => {
              this.router.navigate(['/heroes']);
            })
        }
      }
    )


  }

  mostrarSnackbar(mensaje: string) {
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    });
  }

}
