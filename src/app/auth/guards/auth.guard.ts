import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {

  constructor(
    private authService:AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if(this.authService.auth.id) {
        return true;
      }
      console.log('Bloqueado por el AuthGuard - CanActivated')

      return this.authService.verificarAutenticacion()
        .pipe(
          tap( estaAutuentificado => {
            if(!estaAutuentificado) {
              this.router.navigate(['./auth/login']);
            }
          })
        );

    return false;
  }

  // Solo sirve para prevenir que el usuario cargue el modulo, si ya estaba cargado si podra entrar
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      // console.log('canLoad', true);
      // console.log(route);
      // console.log(segments)

      return this.authService.verificarAutenticacion()
        .pipe(
          tap( estaAutuentificado => {
            if(!estaAutuentificado) {
              this.router.navigate(['./auth/login']);
            }
          })
        );

      if(this.authService.auth.id) {
        return true;
      }
      console.log('Bloqueado por el AuthGuard - CanLoad')

    return false;
  }
}
