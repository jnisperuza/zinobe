import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimulatorComponent } from './simulator/simulator.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UserComponent } from './user/user.component';
import { RequestComponent } from './request/request.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'simulator',
  pathMatch: 'full'
},{
  path: 'simulator',
  component: SimulatorComponent,
  children: []
},{
  path: 'transaction',
  component: TransactionComponent,
  children: []
},{
  path: 'user',
  component: UserComponent,
  children: []
},{
  path: 'request',
  component: RequestComponent,
  children: []
},{
  path: 'request/:userId',
  component: RequestComponent,
  children: []
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
