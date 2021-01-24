import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  path = '';
  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((val) => {
      this.path = this.location.path();
    });
  }

  ngOnInit(): void {
  }

}
