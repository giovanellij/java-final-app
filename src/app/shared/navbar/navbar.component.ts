import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../security/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  isAdmin() {
    return this.loginService.isAdmin();
  }

}
