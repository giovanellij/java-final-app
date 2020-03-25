import { Injectable } from '@angular/core';
import { ICategoria } from '../interfaces/categorias';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private API: string = environment.api;

  constructor(
    private http: HttpClient,
  ) {}

   GetAll() {
    return this.http.get(`${this.API}/categorias`).pipe(
      map((categorias: ICategoria[]) => {
        return categorias;
      })
    );
  }
}
