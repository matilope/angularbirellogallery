import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-miscellaneous',
  templateUrl: './miscellaneous.component.html',
  styleUrls: ['./miscellaneous.component.css']
})
export class MiscellaneousComponent implements OnInit {
  public principal: string;
  public embed: any;
  public embed2: any;

  constructor() {
    this.principal = "Instagram of Birello Gallery";
    this.embed = ["CIv6nx5HLKr", "CGQJNJCH8kJ", "B_qHduSnVCC", "B-aMkjAHSIp", "B-F4fKWHI2M", "B9u07Z3HLI1", "B9a_HGdHx5o", "B9AC4zoHwlg", "B8PAdqhHsDR", "B7tAmYBHG9P", "B7mTPwEH6LK", "B7OP0D4npS3"];
    this.embed2 = ["B6qZsvPnef7", "B6V0dICHewh", "B5zDta1ng1V", "B5K_M3UHxOv", "B47xTGdnkeE", "B4LdjxKnDEe", "B4IBk0nnU3A", "B32hOxnnR7n", "B3vVANOHkL4", "B3a3UcfnbJD", "B3QPN1BH0mM", "B2kg_NRncRW", "B14sfxjnSX8", "B1m1DzNHVgm", "B1h7-nunZdp", "B0hNMCfndHg", "B0UW21KHK7z", "B0MHeEeH95q", "B0HP1PnHqIx", "Bz624Oln4P4", "Bx0gfZZBjue", "BwQRwRdh0Uo", "BvGHu7Sh2d_", "BuAH-H8Be7H", "Bt2GqZ7B7Ac", "Btzi32OhXZS", "BrgpzNqAvFa", "BrBle7gAbc3", "BpxyVvOAHo9", "BoxSQ_0BwH6", "Bnh6b4cH65R", "BlZGq5OHg7s", "Bj3a1BDHDYc", "BiqHTJmA9Zz", "Bhm9z4SgNQH", "Bg0uNh2FlUs", "BebJx_Vl-Y1", "Bd0vo51F6L9", "BcL5kKzlOUq", "BaaG0JCFdLj", "BaTD511FOVT", "BaPUYC6l9bv", "BZh78jCF1wt", "BYwc4XcnL3t", "BU16wTfjygY", "BTKzjOjjP76", "BQrfzLZj1Eu", "BLW1sl5juqX", "BKZHZn9jXXr", "BJVz7q1jAkz", "BJRFMChjGsW", "BJBGGPKjFiR", "BI0h89ijSyq", "BI0hszgjLyn", "BIvqA51DyCy", "BIlFI4dDDA8", "BIdlBcgDyan", "BIVbFLVjXJQ", "BIQjejzDSiu", "BIN-lOtj0yO", "BIIjqrhDEtH", "BIIb4jrjBqF", "BID03_XjjOa", "BIDdASBjMj3", "BIBzBIaD6Ob", "BIBy1pQjDWZ", "BIByjP-DVes", "BIByZiVjyXN", "BIByHQaDWIn", "BIBx4UZjTuf", "BIBxpckDOx0", "BIBxZogDRLB", "BIBxFKIjV8c"]
  }

  ngOnInit(): void {
  }
  
}
