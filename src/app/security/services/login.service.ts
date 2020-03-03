import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IUsuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API: string = environment.api;

  private options = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  isAuthenticated() {
    let isAuthenticated = false;

    if (localStorage.getItem('userName') !== null) {
      isAuthenticated = true;
    }

    return isAuthenticated;
  }

  isAdmin() {
    let isAuthenticated = false;
    let isAdmin = false;

    if (localStorage.getItem('userName') !== null) {
      isAuthenticated = true;
      if (localStorage.getItem('isAdmin') === 'true') {
        isAdmin = true;
      }
    }

    return isAuthenticated && isAdmin;
  }

  login(user: IUsuario) {
    const url = `${this.API}/usuarios`;
    return this.http.post<IUsuario>(url, user, this.options);
  }

  logOut() {
    localStorage.removeItem('userName');
    localStorage.removeItem('password');
  }
}
