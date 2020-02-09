import React from 'react'
import EventPicker from './EventPicker'
import OddsTable from './OddsTable'

class EventOddsTablePicker extends React.Component {
  render() {
    return (
      <div>
        <EventPicker />
        <OddsTable />
      </div>
    )
  }
}

export default EventOddsTablePicker
