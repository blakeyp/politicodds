import React from 'react'
import EventPicker from './EventPicker'
import OddsTable from './OddsTable'

class EventOddsTablePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = { event: '5678' }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ event })
  }

  render() {
    return (
      <div>
        <EventPicker
          event={this.state.event}
          onChange={this.handleChange} />
        <OddsTable
          event={this.state.event} />
      </div>
    )
  }
}

export default EventOddsTablePicker
