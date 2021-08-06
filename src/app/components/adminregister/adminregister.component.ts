import { Component, OnInit } from '@angular/core';
import { Admins } from '../../models/admin';
import { AdminService } from '../../services/admin.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert2';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-adminregister',
  templateUrl: './adminregister.component.html',
  styleUrls: ['./adminregister.component.css'],
  providers: [AdminService]
})
export class AdminregisterComponent implements OnInit {

  public admins: Admins[];
  public url: string;

  constructor(
    private _adminService: AdminService,
    private _route: ActivatedRoute,
    private _router: Router,
    private metaService: Meta
  ) {
    this.url = Global.url;
    this.metaService.addTag(
      {
       name: 'robots', 
       content: 'noindex, nofollow'
      }

    );
  }

  ngOnInit(): void {
    this._adminService.getUsers().subscribe(
      response => {
        if (response.users) {
          this.admins = response.users;
        } else {

        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteUser(id) {
    swal.fire({
      title: '¿ Estas seguro que quieres eliminar este usuario ?',
      text: "No vas a poder recuperarlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero eliminarla',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._adminService.deleteUser(id).subscribe(
          response => {
            swal.fire(
              'Eliminado',
              'El usuario ha sido eliminado correctamente',
              'success'
            )
            this._router.navigate(['/admin/show/users']).then(() => {
              window.location.reload();
            });
          },
          error => {
            this._router.navigate(['/admin/show/users']).then(() => {
              window.location.reload();
            });
          }
        );
      } else {
        swal.fire("El usuario se ha salvado y no se ha eliminado");
      }
    });
  }

}
