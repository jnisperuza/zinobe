import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {

  bankAmount: Observable<number>;

  constructor(private store: Store<{ bankAmount: number }>) {
    this.bankAmount = store.pipe(select('bankAmount'));
  }

  ngOnInit() {
  }

}
