import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from './page.service';
import { MessageService } from './message.service';

import { Page } from './page';

@Component({
  selector: 'my-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  pages: Page[];
  origName: string;
  selectedPage: Page;
  messageList: string;
  messageEdit: string;

  constructor(
    private router: Router,
    private pageService: PageService,
    private messageService: MessageService
  ) {}
  
  ngOnInit(): void {
    this.getPages();
    this.messageList = this.messageService.collect('message');
  }
  
  getPages(): void {
    this.pageService.getPages()
      .then(pages => {
        console.log("got pages");
        console.log(pages);
        this.pages = pages;
      })
      .catch(err => {
        if (err == "Invalid token"){
          this.loginExpired();
          return;
        }
      });
  }
  
  onSelect(page: Page): void {
    this.selectedPage = page;
    this.origName = page.name;
  }
  
  clearMessages(): void {
    this.messageList = undefined;
    this.messageEdit = undefined;
  }
  
  save(): void {
    this.pageService.update(this.origName, this.selectedPage)
      .then(mess => {
        this.origName = this.selectedPage.name;
        this.clearMessages();
        this.messageEdit = mess;
      })
      .catch(err => {
        if (err == "Invalid token"){
          this.loginExpired();
          return;
        }
        this.clearMessages();
        this.messageEdit = `Failed to save! ${err}`;
      });
  }
  
  delete(page: Page): void {
    this.pageService.delete(page.name)
      .then(mess => {
        if (this.origName == page.name){
          this.origName = undefined;
          this.selectedPage = undefined;
        }
        this.clearMessages();
        this.messageList = mess;
        this.getPages();
      })
      .catch(err => {
        if (err == "Invalid token"){
          this.loginExpired();
          return;
        }
        this.clearMessages()
        this.messageList = `Fail! ${err}`;
      });
  }
  
  loginExpired(): void {
    this.messageService.set('message', 'Login expired');
    this.logout();
  }
  
  logout(): void {
    this.router.navigate(['/login']);
  }
  
  goToCreate(): void {
    this.router.navigate(['/create']);
  }
}
