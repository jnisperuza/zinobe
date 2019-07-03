import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as _ from "lodash";
import * as moment from 'moment';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  userLoan: Observable<object>;
  model = {
    status: null,
    name: null,
    dni: null,
    email: null,
    amount: null,
    paymentDate: null
  }

  constructor(private router: Router, private store: Store<{ userLoan: object }>) {
    this.userLoan = store.pipe(select('userLoan'));
  }

  ngOnInit() {
    this.userLoan.subscribe(value => {
      if (!_.isEmpty(value)) {
        this.model.status = value['status'];
        this.model.name = value['name'];
        this.model.dni = value['dni'];
        this.model.email = value['email'];
        this.model.amount = value['amount'];
        this.model.paymentDate = value['paymentDate'] ? moment(value['paymentDate']).format('DD/MM/YYYY') : '';
      } else {
        this.back();
      }
    });
  }

  back() {
    this.router.navigate(['/simulator']);
  }

}
