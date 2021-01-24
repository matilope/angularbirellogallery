import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  public titulo: string;
  public parrafo: string;
  public link: string;
  public parrafo2: string;
  public src: string;
  public alt: string;

  constructor() {
    this.titulo= "Page not found";
    this.parrafo= "Go back to the ";
    this.link= "home page";
    this.parrafo2= " and try again";
    this.src= "assets/img/404.png";
    this.alt= "This page doesn't exist or was deleted";
   }

  ngOnInit(): void {
  }

}
