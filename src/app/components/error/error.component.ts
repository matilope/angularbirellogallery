import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  Optional,
} from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { Response } from 'express';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    @Optional() @Inject(RESPONSE) private response: Response,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.titleService.setTitle("Error");
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      this.response.status(410);
    }
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }
}
