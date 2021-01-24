import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData: any;

  constructor(private _auth: AuthService,
    private _router: Router) {

    this.loginUserData = {
      email: "",
      password: ""
    }
  }

  ngOnInit(): void {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
      response => {
        localStorage.setItem('token', response.token)
        swal.fire(
          'Los datos son correctos',
          '',
          'success'
        );
        this._router.navigate(['/admin'])
      },
      error =>
        this._router.navigate(['/admin/login'])
    )
  }

}
