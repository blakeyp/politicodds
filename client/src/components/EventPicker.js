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
        <label for='event'>Choose an event:</label>
        <select id='event' value={this.props.event} onChange={this.handleChange}>
          <option value='1234'>Event 1234</option>
          <option value='5678'>Event 5678</option>
        </select>
      </div>
    )
  }
}

export default EventPicker
