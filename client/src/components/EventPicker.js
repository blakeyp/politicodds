import React from 'react'

class EventPicker extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value)
  }

  render() {
    return (
      <div style={{paddingBottom: '30px'}}>
        <label htmlFor='event'>Choose an event:</label>
        <select id='event' value={this.props.event} onChange={this.handleChange}>
          {this.props.events.map((event) => (
            <option key={event.id} value={event.id}>{event.name}</option>
          ))}
        </select>
      </div>
    )
  }
}

export default EventPicker
