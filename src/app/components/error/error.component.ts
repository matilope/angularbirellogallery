import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  Optional,
} from '@angular/core';
import { RESPONSE, REQUEST } from '@nguniversal/express-engine/tokens';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { Request, Response } from 'express';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
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
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    if (isPlatformServer(this.platformId)) {
      this.response.status(410);
    }
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }
}
