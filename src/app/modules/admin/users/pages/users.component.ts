import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@core/models/user';
import { AdminService } from '@shared/services/admin.service';
import { Global } from '@global/global';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [AdminService, MessageService, ConfirmationService]
})
export class UsersComponent implements OnInit, OnDestroy {
  public users: User[];
  public url: string;
  public subscription: Subscription;
  public subscription2: Subscription;
  public loaders: boolean[] = [];

  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
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
    this.subscription = this._adminService.getUsers().subscribe({
      next: response => {
        if (response) {
          this.users = response.users;
        }
      },
    });
  }

  deleteUser(id: string, i: number): void {
    this.loaders[i] = true;
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'User is being deleted' });
    this.confirmationService.confirm({
      message: 'Are you certain you want to delete this user?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.subscription2 = this._adminService.deleteUser(id).subscribe({
          next: (response) => {
            if (response.status == 'Success') {
              this.loaders[i] = false;
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'User was deleted' });
              setTimeout(() => {
                this._router.navigate(['/admin']).then(() => {
                  window.location.reload();
                });
              }, 1500);
            } else {
              this.loaders[i] = false;
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User deletion failed' });
            }
          },
          error: () => {
            this.loaders[i] = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User could not be deleted' });
          },
        });
      },
      reject: () => {
        this.loaders[i] = false;
        this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: 'User was not deleted' });
      }
    });
  }

  ngOnDestroy(): void {
    [this.subscription, this.subscription2].forEach(e => e?.unsubscribe());
  }
}
