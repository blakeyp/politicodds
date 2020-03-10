import { Component, OnInit } from '@angular/core'
import { Input } from '@angular/core'
import { runnerOddsByEventId } from '../../data'

@Component({
  selector: 'app-odds-table',
  templateUrl: './odds-table.component.html',
  // styleUrls: ['./odds-table.component.scss']
})
export class OddsTableComponent implements OnInit {
  @Input() eventId

  runnerOddsByEventId

  constructor() {
    this.runnerOddsByEventId = runnerOddsByEventId
  }

  ngOnInit() {}

}
