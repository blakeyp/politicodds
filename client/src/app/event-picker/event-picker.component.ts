import { Component, OnInit } from '@angular/core'
import { Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-event-picker',
  templateUrl: './event-picker.component.html',
  // styleUrls: ['./event-picker.component.scss']
})
export class EventPickerComponent implements OnInit {
  @Input() eventId
  @Input() events
  @Output() selectEvent = new EventEmitter()

  constructor() {}

  ngOnInit() {}

}
