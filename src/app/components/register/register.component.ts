import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Title, Meta } from '@angular/platform-browser';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerUserData: User;
  public suscripcion: any;
  public animation: boolean = false;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private metaService: Meta
  ) {
    this.registerUserData = {
      email: '',
      password: '',
      secret: '',
      token:''
    };
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.animation = true;
  }

  registerUser() {
    if (this._auth.registerUser(this.registerUserData) !== undefined) {
      this.suscripcion = this._auth
        .registerUser(this.registerUserData)
        .subscribe({
          next: response => {
            localStorage.setItem('token_birello_gallery_admin', response.token);
            swal.fire(
              'Te has registrado correctamente',
              'Cuidado !, el uso del registro de un personal no autorizado puede enfrentar denuncia por irrumpimiento de las condiciones de la página',
              'success'
            );
            this._router.navigate(['/admin']);
          },
          error: () => {
            swal.fire(
              'Ha ocurrido un error al registrarse',
              'La clave secreta que ha colocado es incorrecta o no ha colocado ninguna',
              'warning'
            );
            this._router.navigate(['/404']);
          },
        });
    } else {
      swal.fire(
        'Ha ocurrido un error al registrarse',
        'La clave secreta que ha colocado es incorrecta o no ha colocado ninguna',
        'warning'
      );
      this._router.navigate(['/404']);
    }
  }

  ngOnDestroy() {
    this.suscripcion?.unsubscribe();
    this.animation = false;
  }
}
