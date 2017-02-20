import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PageService {
  constructor(
    private http: Http
  ) { }
  
  private getHeaders(): Headers {
    return new Headers({
      'Content-Type': 'application/json'
    });
  }

  create(name: string, pretend: string): Promise<any> {
    return this.http
      .post('api/create', JSON.stringify({
        name: name,
        pretend: pretend
      }), {headers: this.getHeaders()})
      .toPromise()
      .then(res => res.json());
  }
}
