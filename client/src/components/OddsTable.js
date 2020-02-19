import React from 'react'
import OddsTableRow from './OddsTableRow'

import { runnerOddsByEventId } from '../data'

class OddsTable extends React.Component {
  render() {
    return (
    <table>
      <tr>
        <th>Name</th>
        <th>Price</th>
      </tr>
      {runnerOddsByEventId[this.props.event].map((runner) => (
        <OddsTableRow name={runner.name} price={runner.price}/>
      ))}
    </table>
    )
  }
}

export default OddsTable
