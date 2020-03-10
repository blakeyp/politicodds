import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-event-odds-table-picker',
  templateUrl: './event-odds-table-picker.component.html',
  // styleUrls: ['./event-odds-table-picker.component.scss']
})
export class EventOddsTablePickerComponent implements OnInit {
  eventId: string
  events: object[]

  constructor() {
    this.eventId = '02'
    this.events = [
      {
        name: 'Event 1',
        id: '01'
      },
      {
        name: 'Event 2',
        id: '02'
      },
      {
        name: 'Event 3',
        id: '03'
      }
    ]
  }

  ngOnInit() {}

  onSelectEvent(event) {
    this.eventId = event.target.value
  }

}
