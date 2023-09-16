import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  Optional,
} from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { Response } from 'express';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  constructor(
    private metaService: Meta,
    private router: Router,
    @Optional() @Inject(RESPONSE) private response: Response,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId) && this.response) {
      this.response?.status(410);
      this.response.statusCode = 410;
    }
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }
}
