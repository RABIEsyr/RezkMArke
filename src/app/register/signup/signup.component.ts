import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from './../../services/user.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private userSevice: UserService, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit() {
  }

  onSignup(form1: NgForm) {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    console.log(returnUrl);

    const name = form1.value.name;
    const email = form1.value.email;
    const password = form1.value.password;

    this.userSevice.signup({name: name, email: email, password: password})
      .subscribe(response => {
            localStorage.setItem('token', response['token']);
            this.router.navigate(['/upload-photo']);
      });
  }

}
