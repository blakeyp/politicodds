import React from 'react'
import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles'

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
          odds: data.length > 0 && data
        })
      })
      .catch(console.error)
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
    const { classes } = this.props
    return (
      <React.Fragment>
        <MarketPicker onChange={this.handleChange} />
        {
          this.state.loading ? <LoadingSpinner /> :
          this.state.odds ? <OddsGrid odds={this.state.odds} /> :
          <Alert severity="error" className={classes.alert}>Oops! No odds data available for this market! Please try again later</Alert>
        }
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(OddsPickerGrid)
