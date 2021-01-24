import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refundpolicy',
  templateUrl: './refundpolicy.component.html',
  styleUrls: ['./refundpolicy.component.css']
})
export class RefundpolicyComponent implements OnInit {
  public principal: string;
  public titulo: string;
  public text: string;
  public mail: string;
  public textextra: string;

  constructor() {
    this.principal= "Refund policy";
    this.titulo= "IMPORTANT, PLEASE READ CAREFULLY";
    this.text= "To return your product, please email us at";
    this.mail= "ignaciobirello@hotmail.com";
    this.textextra= "You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund. You will receive a full refund excluding shipping costs.";
   }

  ngOnInit(): void {
  }

}
