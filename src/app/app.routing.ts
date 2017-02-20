import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { CreateComponent } from './create.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'create'
  },
  {
    path: 'create',
    component: CreateComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
