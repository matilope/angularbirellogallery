import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
import swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData: any;

  constructor(private _auth: AuthService,
    private _router: Router) {
    this.registerUserData = {
      email: "",
      password: ""
    }

  }

  ngOnInit(): void {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token)
          swal.fire(
            'Te has registrado correctamente',
            'Cuidado !, el uso del registro de un personal no autorizado puede enfrentar denuncia por irrumpimiento de las condiciones de la pagina',
            'success'
          );
          this._router.navigate(['/admin/login'])
        },
        error => this._router.navigate(['/admin/login'])
      )
  }


}






