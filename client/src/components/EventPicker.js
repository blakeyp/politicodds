import React from 'react'

class EventPicker extends React.Component {
  render() {
    return (
      <div style={{paddingBottom: "30px"}}>
        <label for="event">Choose an event:</label>
        <select id="event">
          <option value="1234">Event 1234</option>
          <option value="5678">Event 5678</option>
        </select>
      </div>
    )
  }
}

export default EventPicker
