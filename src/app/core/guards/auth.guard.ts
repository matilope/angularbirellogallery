import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { environment } from 'src/environments/environment';
import decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(): boolean {
    const token = this._authService.getToken();
    if(!token) {
      this._router.navigate(['/404']);
      return false;
    }
    const tokenPayload: any = decode(token);
    if (tokenPayload?.subject !== environment?.payload) {
      this._router.navigate(['/404']);
      return false;
    }
    return true;
  }
}
