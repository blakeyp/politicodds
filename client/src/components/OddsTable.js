import React from 'react'
import OddsTableRow from './OddsTableRow'

import { runnerOddsByEventId } from '../data'

class OddsTable extends React.Component {
  render() {
    return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {runnerOddsByEventId[this.props.event].map((runner, index) => (
          <OddsTableRow key={index} name={runner.name} price={runner.price} />
        ))}
      </tbody>
    </table>
    )
  }
}

export default OddsTable
