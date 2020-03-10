import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../security/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userName: string;

  constructor(
    private loginService: LoginService
  ) {
    this.userName = localStorage.getItem('userName');
  }

  ngOnInit() {
  }

  isAdmin() {
    return this.loginService.isAdmin();
  }

  isAuth() {
    return this.loginService.isAuthenticated();
  }

  logOut() {
    this.loginService.logOut();
    window.location.reload();
  }
}
