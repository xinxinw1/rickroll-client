import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  private mess = {};
  
  get(name: string): any {
    return this.mess[name];
  }
  
  set(name: string, val: any): any {
    return this.mess[name] = val;
  }
  
  clear(name: string): any {
    let val = this.mess[name];
    delete this.mess[name];
    return val;
  }
  
  isset(name: string): boolean {
    return this.mess[name] !== undefined;
  }
  
  collect(name: string): any {
    console.log("collecting", name);
    if (this.isset(name)){
      let m = this.get(name);
      this.clear(name);
      return m;
    }
    return null;
  }
}
