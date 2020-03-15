import { Component, OnInit } from '@angular/core'
import { ApiService } from '../api.service';

@Component({
  selector: 'app-event-odds-table-picker',
  templateUrl: './event-odds-table-picker.component.html',
  // styleUrls: ['./event-odds-table-picker.component.scss']
})
export class EventOddsTablePickerComponent implements OnInit {
  apiService: ApiService
  eventId: string
  events: object[]

  constructor(apiService: ApiService) {
    this.apiService = apiService;
    this.eventId = '02'
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.events = [];
    this.apiService.getEvents().subscribe((data: {}) => {
      console.log(data);
      this.events = data as object[];
    });
  }

  onSelectEvent(event) {
    this.eventId = event.target.value
  }

}
