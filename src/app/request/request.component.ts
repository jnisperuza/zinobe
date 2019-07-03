import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from "lodash";
import * as moment from 'moment';

import { RequestElement } from './request-element';
import { RequestService } from './request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  providers: [RequestService]
})
export class RequestComponent implements OnInit, AfterViewInit {

  displayedColumns = ['userId', 'amount', 'paymentDate', 'paid', 'status'];
  dataSource: RequestElement[];

  constructor(private requestSerice: RequestService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let userId = this.route.snapshot.params.userId;
    this.getLoans(userId);
  }

  search(type?: number) {
    switch (type) {
      case 1:
        this.getLoans();
        break;
      case 2:
        this.getPendingLoans();
        break;
      case 3:
        this.getNegatedLoans();
        break;
      default:
        this.getLoans();
        break;
    }
  }

  private getLoans(userId?: string) {
    const success = (response) => {
      if (_.isArray(response.data)) {
        this.dataSource = _.map(response.data, loan => {
          return {
            userId: loan.userId.name,
            amount: loan.amount,
            paymentDate: moment(loan.paymentDate).format('DD/MM/YYYY'),
            status: loan.status ? 'Aprobado' : 'Rechazado',
            paid: loan.status ? (loan.paid ? 'Pagado' : 'Pendiente') : 'No aplica',
          }
        });
      } else if (_.isObject(response.data)) {
        this.dataSource = [{
          userId: response.data.userId,
          amount: response.data.amount,
          paymentDate: moment(response.data.paymentDate).format('DD/MM/YYYY'),
          status: response.data.status ? 'Aprobado' : 'Rechazado',
          paid: response.data.status ? (response.data.paid ? 'Pagado' : 'Pendiente') : 'No aplica',
        }];
      }
    }
    const error = (error) => {
      console.log(error);
    }
    if (userId) {
      this.requestSerice.getLoansUserId(userId).subscribe(success, error);
    } else {
      this.requestSerice.getLoans().subscribe(success, error);
    }
  }

  private getPendingLoans() {
    const success = (response) => {
      this.dataSource = _.map(response.data, loan => {
        return {
          userId: loan.userId.name,
          amount: loan.amount,
          paymentDate: moment(loan.paymentDate).format('DD/MM/YYYY'),
          status: loan.status ? 'Aprobado' : 'Rechazado',
          paid: loan.paid ? 'Pagado' : 'Pendiente'
        }
      });
    }
    const error = (error) => {
      console.log(error);
    }
    this.requestSerice.getPendingLoans().subscribe(success, error);
  }

  private getNegatedLoans() {
    const success = (response) => {
      this.dataSource = _.map(response.data, loan => {
        return {
          userId: loan.userId.name,
          amount: loan.amount,
          paymentDate: moment(loan.paymentDate).format('DD/MM/YYYY'),
          status: loan.status ? 'Aprobado' : 'Rechazado',
          paid: loan.paid ? 'Pagado' : 'Pendiente'
        }
      });
    }
    const error = (error) => {
      console.log(error);
    }
    this.requestSerice.getNegatedLoans().subscribe(success, error);
  }

}
