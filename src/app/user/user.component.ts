import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from "lodash";

import { UserElement } from './user-element';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService]
})

export class UserComponent implements OnInit, AfterViewInit {

  displayedColumns = ['dni', 'name', 'email'];
  dataSource: UserElement[];
  model = {
    dni: null
  }

  constructor(private userSerice: UserService, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getUsers();
  }

  search() {
    if (this.model.dni) {
      this.getUsers(this.model.dni);
    }
  }

  clear() {
    this.model.dni = null;
    this.getUsers();
  }

  getDetail(row: object) {
    if (!_.isEmpty(row)) {
      this.router.navigate(['/request', row['userId']])
    }
  }

  private getUsers(dni?: number) {
    const success = (response) => {
      if (_.isArray(response.data)) {
        this.dataSource = _.map(response.data, user => {
          return {
            userId: user._id,
            dni: user.dni,
            name: user.name,
            email: user.email
          }
        });
      } else if (_.isObject(response.data)) {
        this.dataSource = [{
            userId: response.data._id,
            dni: response.data.dni,
            name: response.data.name,
            email: response.data.email
        }];
      }
    }
    const error = (error) => {
      console.log(error);
    }
    if (dni) {
      this.userSerice.getUserDni(dni).subscribe(success, error);
    } else {
      this.userSerice.getUsers().subscribe(success, error);
    }
  }

}