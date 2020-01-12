import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message =  '';
  err = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.userService.signin({email: email, password: password})
      .subscribe(
        (response) => {
          const data = response;
          if (data['success']) {
            const token = data['token'];
            localStorage.setItem('token', token);
            this.router.navigate(['']);
          } else {
            switch (data['message']) {
              case 'email and password not match':
              this.err = true;
              this.message = 're enter email and password correctly';
              break;
            }
          }
        }
      );
  }
}
