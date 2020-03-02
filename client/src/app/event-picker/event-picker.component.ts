import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-picker',
  templateUrl: './event-picker.component.html',
  // styleUrls: ['./event-picker.component.scss']
})
export class EventPickerComponent implements OnInit {
  events = [
    {
      name: 'Event 1',
      value: '1234'
    },
    {
      name: 'Event 2',
      value: '2345'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
