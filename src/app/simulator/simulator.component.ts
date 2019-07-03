import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';
import { SimulatorService } from './simulator.service';
import { UserService } from '../user/user.service';
import { RequestService } from '../request/request.service';
import { increment, decrement, resume } from '../app.actions';
import * as _ from "lodash";

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss'],
  providers: [SimulatorService, UserService, RequestService]
})
export class SimulatorComponent implements OnInit {

  bankAmount: Observable<number>;

  Toast = swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000
  });

  model = {
    bankAmount: 0,
    enabledRequest: true,
    registered: false,
    name: null,
    dni: null,
    email: null,
    amount: 10000,
    paymentDate: null
  }

  constructor(
    private simulatorSerice: SimulatorService,
    private userService: UserService,
    private requestService: RequestService,
    private router: Router,
    private store: Store<{ bankAmount: number }>
  ) {
    this.bankAmount = store.pipe(select('bankAmount'));
  }

  ngOnInit() {
    this.bankAmount.subscribe(value => {
      this.model.bankAmount = value;
      if (value < 10000 || this.model.amount > value) {
        this.model.enabledRequest = false;
      }
    });
  }

  onBlurMethod() {
    if (this.model.amount < 10000) {
      this.model.amount = 10000;
    }
    else if (this.model.amount > 1000000) {
      this.model.amount = 1000000;
    }
    if (this.model.bankAmount < 10000 || this.model.amount > this.model.bankAmount) {
      this.model.enabledRequest = false;
    } else {
      this.model.enabledRequest = true;
    }
  }

  request() {
    // Existing user
    if (this.model.registered) {
      if (this.model.dni && this.model.amount) {
        const successGetUser = (response) => {
          if (response.data) {
            const dataLoan = {
              userId: response.data._id,
              amount: this.model.amount,
              paymentDate: this.model.paymentDate
            };
            // update model
            this.model.name = response.data.name;
            this.model.dni = response.data.dni;
            this.model.email = response.data.email;
            this.saveLoan(dataLoan);
          }
          else {
            this.Toast.fire({
              type: 'warning',
              title: 'El usuario no fué encontrado'
            });
          }
        };

        const errorGetUser = (error) => {
          console.log('Get user: ', error);
        };

        this.userService.getUserDni(this.model.dni).subscribe(successGetUser, errorGetUser);
      }
      else {
        this.Toast.fire({
          type: 'error',
          title: 'Faltan campos obligatorios'
        });
      }

    }
    // New User
    else {
      if (this.model.name && this.model.dni && this.model.email && this.model.amount) {
        const dataUser = {
          name: this.model.name,
          dni: this.model.dni,
          email: this.model.email
        };

        const successSaveUser = (response) => {
          if (response.status === 200) {
            const dataLoan = {
              userId: response.data._id,
              amount: this.model.amount,
              paymentDate: this.model.paymentDate
            };
            this.saveLoan(dataLoan);
          } else if (response.status === 201) {
            swal.fire({
              title: 'Usuario registrado',
              type: 'error',
              html: 'Este usuario ya existe, por favor active la casilla <br/> <b><em>"Ya he prestado anteriormente"</em></b>'
            });
          }
        };

        const errorSaveUser = (error) => {
          console.log('Save user: ', error);
        };

        this.userService.saveUser(dataUser).subscribe(successSaveUser, errorSaveUser);
      } else {
        this.Toast.fire({
          type: 'error',
          title: 'Faltan campos obligatorios'
        });
      }
    }
  }

  private saveLoan(data) {
    const successSaveLoan = (response) => {
      if (response.status === 200) {
        let userLoan = {};
        if (response.data.status) {
          this.store.dispatch(decrement(response.data.amount));
        }
        userLoan['status'] = response.data.status;
        userLoan['name'] = this.model.name;
        userLoan['dni'] = this.model.dni;
        userLoan['email'] = this.model.email;
        userLoan['amount'] = this.model.amount;
        userLoan['paymentDate'] = this.model.paymentDate;
        this.router.navigate(['/transaction']);
        this.store.dispatch(resume(userLoan));
      }
      else if (response.status === 202) {
        swal.fire({
          title: 'Solicitud de crédito',
          type: 'warning',
          html: 'Usted tiene un préstamo pendiente por pagar'
        });
      }
      else if (response.status === 203) {
        swal.fire({
          title: 'Solicitud de crédito',
          type: 'warning',
          html: 'Usted tiene los préstamos negados, por favor cominíquese con nosotros'
        });
      }
    };

    const errorSaveLoan = (error) => {
      console.log('Save loan: ', error);
    };

    this.requestService.saveLoan(data).subscribe(successSaveLoan, errorSaveLoan);
  }

}
