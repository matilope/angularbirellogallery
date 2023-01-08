import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Title, Meta } from '@angular/platform-browser';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  public loginUserData: User;
  public suscripcion: Subscription;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.loginUserData = {
      email: '',
      password: '',
      secret: '',
      token: ''
    };
    this.titleService.setTitle("Login | Birello Gallery");
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  loginUser(): void {
    this.suscripcion = this._auth.loginUser(this.loginUserData).subscribe({
      next: response => {
        localStorage.setItem(environment.token, response.token);
        swal.fire('Los datos son correctos', '', 'success');
        this._router.navigate(['/admin']);
      },
    });
  }

  ngOnDestroy() {
    this.suscripcion?.unsubscribe();
  }
}
