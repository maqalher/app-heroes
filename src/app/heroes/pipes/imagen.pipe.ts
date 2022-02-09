import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  // pure: false
})
export class ImagenPipe implements PipeTransform {

  transform( heroe: Heroe ): string {

    if(!heroe.id && !heroe.alt_img) {
      // no tiene id o no existe la propiedad alt_img
      return 'assets/no-image.png';
    } else if(heroe.alt_img) {
      // si existe alt_img
      return heroe.alt_img;
    } else {
      return `assets/heroes/${heroe.id}.jpg`;
    }

  }

}
