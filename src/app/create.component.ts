import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { PageService } from './page.service';
import { LocalPageService } from './localpage.service';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';

import { Page } from './page';

import { NGValidators } from 'ng-validators';

@Component({
  selector: 'my-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  mimicForm: FormGroup;
  mimicSubmitted: boolean = false;
  linkForm: FormGroup;
  linkSubmitted: boolean = false;
  page: any;
  section: string;
  message: string;
  copyText: string = 'Copy';

  constructor(
    private router: Router,
    private pageService: PageService,
    private localPageService: LocalPageService,
    private messageService: MessageService,
    private authService: AuthService,
    private location: Location,
    private fb: FormBuilder
  ) {}
  
  ngOnInit(): void {
    this.message = this.messageService.collect('message');
    this.mimicForm = this.fb.group({
      'pretend': ['', [
        Validators.required,
        NGValidators.isURL()
      ]]
    });
    this.linkForm = this.fb.group({
      'name': ['', [Validators.required]]
    });
    this.mimicNew();
  }
  
  mimicNew(): void {
    this.page = {};
    this.mimicForm.reset();
    this.mimic();
  }

  mimic(): void {
    this.section = 'mimic';
    this.message = null;
    this.mimicSubmitted = false;
  }
  
  submitMimic(): void {
    this.mimicSubmitted = true;
    if (!this.mimicForm.valid){
      this.message = 'Invalid Url';
    } else {
      this.page.pretend = normalizeUrl(this.mimicForm.value.pretend);
      this.link();
    }
  }
  
  link(): void {
    this.section = 'link';
    this.message = null;
    this.linkSubmitted = false;
    this.linkForm.reset();
  }
  
  submitLink(): void {
    this.linkSubmitted = true;
    if (!this.linkForm.valid){
      this.message = 'Invalid link';
    } else {
      this.page.name = this.linkForm.value.name;
      this.pageService.create(this.page.name, this.page.pretend)
        .then(obj => {
          this.page.url = 'http://galible.com/' + this.page.name;
          this.done();
        })
        .catch(err => this.message = `Fail! ${err}`);
    }
  }
  
  done(): void {
    this.section = 'done';
    this.message = null;
  }
}
