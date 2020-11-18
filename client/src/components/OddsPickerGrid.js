import React from 'react'
import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles'

import config from '../config'
import MarketPicker from './MarketPicker'
import OddsGrid from './OddsGrid'
import LoadingSpinner from './LoadingSpinner'

const useStyles = theme => ({
  alert: {
    marginTop: theme.spacing(3)
  },
})

class OddsPickerGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: false,
      odds: []
    }

    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleMarketChange = this.handleMarketChange.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  handleCategoryChange() {
    this.setState({
      odds: []
    })
  }

  handleMarketChange(selectedMarket) {
    this.setState({
      loading: true
    })

    this.fetchOdds(selectedMarket)
      .then(data => {
        this.setState({
          loading: false,
          odds: data.length > 0 && data
        })
      })
      .catch(this.handleError)
  }

  handleError() {
    this.setState({
      error: true
    })
  }

  fetchOdds(marketId) {
    return fetch(`${config.apiUrl}/markets/${marketId}/odds?limit=10`)
      .then(res => res.json())
      .then(data => {
        data.map(odds => odds.probability = (odds.probability * 100).toFixed(1))
        return data
      })
  }

  render() {
    const { classes } = this.props

    if (this.state.error) {
      return (
        <Alert severity="error" className={classes.alert}>Oops! An error has occurred retrieving the data! Please try again later</Alert>
      )
    }

    return (
      <React.Fragment>
        <MarketPicker onCategoryChange={this.handleCategoryChange} onMarketChange={this.handleMarketChange} onError={this.handleError}/>
        {
          this.state.loading ? <LoadingSpinner /> :
          this.state.odds ? <OddsGrid odds={this.state.odds} /> :
          <Alert severity="warning" className={classes.alert}>Oops! No odds data available for this market! Please try again later</Alert>
        }
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(OddsPickerGrid)
