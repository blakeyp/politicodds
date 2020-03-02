import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-odds-table',
  templateUrl: './odds-table.component.html',
  // styleUrls: ['./odds-table.component.scss']
})
export class OddsTableComponent implements OnInit {
  runners = [
    {
      name: 'Runner 1',
      price: '5'
    },
    {
      name: 'Runner 2',
      price: '1.3'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
