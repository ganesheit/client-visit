import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BaseComponent } from './components/base/base.component';
import { RequestDetailsComponent } from './components/base/request-details/request-details.component';
import { RequestComponent } from './components/base/request/request.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'base',
    component:  BaseComponent,
    // canActivate: [AuthGuardService],
    children: [
      { path: 'request', component: RequestComponent, data: { name: 'Client Request' } },
      // { path: 'requests', component: RequestListingComponent, data: { name: 'Request List' } },
      // { path: 'new-request', component: NewRequestComponent, data: { name: 'New Request' }  },
      { path: 'details/:id', component: RequestDetailsComponent, data: { name: 'Request Details' } },
      { path: '',   redirectTo: 'requests', pathMatch: 'full' }, 
    ]
  },
  
  { path: '',   redirectTo: 'base', pathMatch: 'full' }, 
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
