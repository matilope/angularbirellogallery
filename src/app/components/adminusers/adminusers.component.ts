import { Component, OnDestroy, OnInit } from '@angular/core';
import { Admins } from '../../models/admin';
import { AdminService } from '../../services/admin.service';
import { Global } from '../../services/global';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css'],
  providers: [AdminService],
})
export class AdminusersComponent implements OnInit, OnDestroy {
  public admins: Admins[];
  public url: string;
  public suscripcion: Subscription;
  public suscripciondelete: Subscription;
  public animation: boolean = false;

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
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.suscripcion = this._adminService.getUsers().subscribe({
      next: response => {
        if (response.users) {
          this.animation = true;
          this.admins = response.users;
        }
      },
    });
  }

  deleteUser(id: any) {
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

  ngOnDestroy() {
    [this.suscripcion, this.suscripciondelete].forEach(e => e?.unsubscribe());
    this.animation = false;
  }
}
