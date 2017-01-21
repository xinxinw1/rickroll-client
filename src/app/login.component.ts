import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from './message.service';
import { AuthService } from './auth.service';
 
@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  model: any = {};
  message: string;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.logout();
    this.message = this.messageService.collect('message');
  }

  login() {
    this.authService.login(this.model.username, this.model.password)
      .then(result => {
          if (result === true) {
            this.router.navigate(['/list']);
          } else {
            // login failed
            this.message = 'Username or password is incorrect';
          }
      });
  }
}