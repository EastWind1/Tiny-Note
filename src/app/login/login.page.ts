import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../util/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.login(this.loginForm.value);
  }

  signUp() {
    this.userService.signUp(this.loginForm.value);
  }
}
