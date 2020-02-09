import React from 'react'
import { Grid } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'

import OddsGridRow from './OddsGridRow'

const marketId_nextLibDemLeader = '1.160663411'

const useStyles = theme => ({
  root: {
    marginTop: theme.spacing(3)
  },
})

class OddsGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      odds: []
    }
  }

  componentDidMount() {
    fetch(`api/markets/${marketId_nextLibDemLeader}/odds`)
      .then(res => res.json())
      .then(data => {
        const odds = data.slice(0, 8)
        odds.map(odd => odd.probability = (odd.probability * 100).toFixed(1))
        this.setState({ odds: odds })
      })
      .catch(console.error)
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Grid container spacing={2} direction="row" justify="center" alignItems="center">
          {this.state.odds.map((runner, index) => (
            <OddsGridRow
              key={index}
              runnerName={runner.runnerName}
              odds={runner.odds}
              probability={runner.probability}
            />
          ))}
        </Grid>
      </div>
    )
  }
}

export default withStyles(useStyles)(OddsGrid)
