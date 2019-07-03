import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimulatorComponent } from './simulator/simulator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatGridListModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatCheckboxModule,
  MatIconModule,
  MatTableModule,
  MatButtonToggleModule,
  MatMenuModule
} from '@angular/material';
import { BankComponent } from './bank/bank.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UserComponent } from './user/user.component';
import { RequestComponent } from './request/request.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer, resumeReducer } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    SimulatorComponent,
    BankComponent,
    TransactionComponent,
    UserComponent,
    RequestComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ bankAmount: counterReducer, userLoan: resumeReducer }),
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatTableModule,
    MatButtonToggleModule,
    MatMenuModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
