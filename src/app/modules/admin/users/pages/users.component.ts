import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@core/models/user';
import { AdminService } from '@shared/services/admin.service';
import { Global } from '@global/global';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [AdminService],
})
export class UsersComponent implements OnInit, OnDestroy {
  public users: User[];
  public url: string;
  public suscripcion: Subscription;
  public suscripciondelete: Subscription;

  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.url = Global.url;
    this.titleService.setTitle('Users | Birello Gallery');
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  ngOnInit(): void {
    this.suscripcion = this._adminService.getUsers().subscribe({
      next: response => {
        if (response) {
          this.users = response.users;
        }
      },
    });
  }

  deleteUser(id: any): void {
    swal
      .fire({
        title: '¿ Estas seguro que quieres eliminar este usuario ?',
        text: 'No vas a poder recuperarlo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, quiero eliminarlo',
        cancelButtonText: 'Cancelar',
      })
      .then(result => {
        if (result.isConfirmed) {
          this.suscripciondelete = this._adminService.deleteUser(id).subscribe({
            next: () => {
              swal.fire(
                'Eliminado',
                'El usuario ha sido eliminado correctamente',
                'success'
              );
              setTimeout(() => {
                this._router.navigate(['/admin/show/users']).then(() => {
                  window.location.reload();
                });
              }, 2000);
            },
            error: () => {
              swal.fire(
                'Error',
                'El usuario no se ha eliminado correctamente',
                'error'
              );
              setTimeout(() => {
                this._router.navigate(['/admin']).then(() => {
                  window.location.reload();
                });
              }, 2000);
            },
          });
        } else {
          swal.fire('El usuario se ha salvado y no se ha eliminado');
          setTimeout(() => {
            this._router.navigate(['/admin']).then(() => {
              window.location.reload();
            });
          }, 2000);
        }
      });
  }

  ngOnDestroy(): void {
    [this.suscripcion, this.suscripciondelete].forEach(e => e?.unsubscribe());
  }
}
