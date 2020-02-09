import React from 'react'
import OddsTableRow from './OddsTableRow'

const runners = [
  { name: 'Runner 1', price: '1.35' },
  { name: 'Runner 2', price: '1.8' }
]

class OddsTable extends React.Component {
  render() {
    return (
    <table>
      <tr>
        <th>Name</th>
        <th>Price</th>
      </tr>
      {runners.map((runner) => (
        <OddsTableRow name={runner.name} price={runner.price}/>
      ))}
    </table>
    )
  }
}

export default OddsTable
