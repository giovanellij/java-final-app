import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { IUsuario } from '../interfaces/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const user: IUsuario = {
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password
    };

    this.loginService.login(user).subscribe(
      (response: any) => {
        localStorage.setItem('userName', response.userName);
        localStorage.setItem('isAdmin', response.administrador);
      },
      (error: any) => {
        console.log(error);
      },
      () => {}
    );
  }
}
