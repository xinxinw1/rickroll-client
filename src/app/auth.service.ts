import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  public token: string;

  constructor(private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }
  
  private headers: Headers = new Headers({
    'Content-Type': 'application/json'
  });
  
  loggedIn(): boolean {
    return !!this.token;
  }

  login(username: string, password: string): Promise<boolean> {
    console.log("login", username, password);
    return this.http
      .post('/api/auth', JSON.stringify({
        username: username,
        password: password
      }), {headers: this.headers})
      .toPromise()
      .then(res => {
        let token = res.json() && res.json().token;
        if (token) {
          this.token = token;

          localStorage.setItem('currentUser', JSON.stringify({
            username: username,
            token: token
          }));

          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<boolean> {
    console.error('An error occurred', error);
    return Promise.resolve(false);
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}