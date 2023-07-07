import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { User } from '@core/models/user';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy {
  public registerUserData: User;
  public suscripcion: Subscription;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.registerUserData = {
      email: '',
      password: '',
      token:''
    };
    this.titleService.setTitle("Register | Birello Gallery");
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  registerUser() {
    if (this._auth.registerUser(this.registerUserData) !== undefined) {
      this.suscripcion = this._auth
        .registerUser(this.registerUserData)
        .subscribe({
          next: response => {
            localStorage.setItem(environment.token, response.token);
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
  }
}
