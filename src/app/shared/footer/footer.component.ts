import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../security/services/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  isAdmin() {
    return this.loginService.isAdmin();
  }

}
