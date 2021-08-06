import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
import swal from 'sweetalert2';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData: any;

  constructor(private _auth: AuthService,
    private _router: Router,
    private metaService: Meta) {
    this.registerUserData = {
      email: "",
      password: "",
      secret: ""
    }
    this.metaService.addTag(
      {
       name: 'robots', 
       content: 'noindex, nofollow'
      }

    );

  }

  ngOnInit(): void {
  }

  registerUser() {
    if (this._auth.registerUser(this.registerUserData)!=undefined){
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token)
          swal.fire(
            'Te has registrado correctamente',
            'Cuidado !, el uso del registro de un personal no autorizado puede enfrentar denuncia por irrumpimiento de las condiciones de la pagina',
            'success'
          );
          this._router.navigate(['/404'])
        },
        error => this._router.navigate(['/admin/register'])
      )
    } else {
      swal.fire(
        'Ha ocurrido un error al registrarse',
        'La clave secreta que ha colocado es incorrecta o no ha colocado ninguna',
        'warning'
      );
      this._router.navigate(['/404'])
    }
  }


}






