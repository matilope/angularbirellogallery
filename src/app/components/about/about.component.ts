import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public principal: string;
  public parrafo: string;


  constructor() {
    this.principal = "About";
    this.parrafo = "Birello Gallery is an emerging familiar business searching for the best products thinking in quality, value and exquisiteness. The products we offer not only delight customers regarding decorative value but also considering art itself as an investment for the future.";

  }

  ngOnInit(): void {
  }

}
