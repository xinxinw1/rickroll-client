import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Page } from './page';

import { AuthService } from './auth.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PageService {
  constructor(
    private http: Http,
    private authService: AuthService
  ) { }
  
  get(name: string): Promise<Page> {
    return this.http.get(`api/get/${name}`)
             .toPromise()
             .then(res => res.json() as Page)
             .catch(this.handleError);
  }
  
  private getHeaders(): Headers {
    return this.getHeadersToken(this.authService.token);
  }
  
  private getHeadersToken(token: string): Headers {
    return new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
  }

  getPages(): Promise<Page[]> {
    return this.http
      .get('api/getAll', {headers: this.getHeaders()})
      .toPromise()
      .then(res => res.json() as Page[])
      .catch(this.handleError);
  }
  
  create(name: string, pretend: string): Promise<any> {
    return this.http
      .post('api/create', JSON.stringify({
        name: name,
        pretend: pretend
      }), {headers: this.getHeaders()})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  
  update(origName: string, page: Page, token: string = this.authService.token): Promise<any> {
    return this.http
      .post('api/update', JSON.stringify({
        origName: origName,
        page: page
      }), {headers: this.getHeadersToken(token)})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  
  delete(name: string, token: string = this.authService.token): Promise<string> {
    return this.http
      .post('api/delete', JSON.stringify({
        name: name
      }), {headers: this.getHeadersToken(token)})
      .toPromise()
      .then(res => res.text())
      .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<void> {
    console.error('An error occurred', error);
    return Promise.reject(error.text());
  }
}
