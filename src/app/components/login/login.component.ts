import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
import swal from 'sweetalert2';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData: any;

  constructor(private _auth: AuthService,
    private _router: Router,
    private metaService: Meta) {

    this.loginUserData = {
      email: "",
      password: ""
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

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        swal.fire(
          'Los datos son correctos',
          '',
          'success'
        );
        this._router.navigate(['/admin'])
      },
      error => {
      swal.fire(
        'Los datos no son correctos',
        'Intente nuevamente',
        'warning'
      );
        this._router.navigate(['/admin/login'])
      }
    )
  }

}
