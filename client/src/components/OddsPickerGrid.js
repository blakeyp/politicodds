import React from 'react'

import MarketPicker from './MarketPicker'
import OddsGrid from './OddsGrid'
import LoadingSpinner from './LoadingSpinner'

class OddsPickerGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      odds: []
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(selectedMarket) {
    this.setState({
      loading: true
    })

    this.fetchOdds(selectedMarket)
      .then(data => {
        this.setState({
          loading: false,
          odds: data
        })
      })
  }

  fetchOdds(marketId) {
    return fetch(`api/markets/${marketId}/odds?limit=10`)
      .then(res => res.json())
      .then(data => {
        data.map(odds => odds.probability = (odds.probability * 100).toFixed(1))
        return data
      })
      .catch(console.error)
  }

  render() {
    return (
      <React.Fragment>
        <MarketPicker onChange={this.handleChange} />
        {this.state.loading ? <LoadingSpinner /> : <OddsGrid odds={this.state.odds} />}
      </React.Fragment>
    )
  }
}

export default OddsPickerGrid
