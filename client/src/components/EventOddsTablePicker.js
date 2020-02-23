import React from 'react'
import EventPicker from './EventPicker'
import OddsTable from './OddsTable'

class EventOddsTablePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      selectedEvent: '01'
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(selectedEvent) {
    this.setState({ selectedEvent })
  }

  componentDidMount() {
    fetch('api/events')
    .then(res => res.json())
    .then(data => {
      this.setState({ events: data })
    })
    .catch(console.error)
  }

  render() {
    return (
      <div>
        <EventPicker
          events={this.state.events} 
          event={this.state.selectedEvent}
          onChange={this.handleChange} />
        <OddsTable
          event={this.state.selectedEvent} />
      </div>
    )
  }
}

export default EventOddsTablePicker
