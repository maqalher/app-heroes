import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth() {
    // se desestrucutura para que no se pueda modificar el usuario
    return {...this._auth}
  }

  constructor( private http: HttpClient) { }

  verificarAutenticacion(): Observable<boolean> {

    if(!localStorage.getItem('token')){
      // of transforma en un observable
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map( auth => {  // transforma la respuesta de arriba de tipo Auth en tipo boolen
          // console.log('map', auth);
          this._auth = auth;
          return true;
        })
      )

  }

  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        // para mantener el usuario
        tap( auth => this._auth = auth),
        tap( auth => localStorage.setItem('token', auth.id))
      );
  }

  logut() {
    this._auth = undefined;
  }
}
