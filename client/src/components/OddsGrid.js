import React from 'react'
import { Grid } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'

import OddsGridRow from './OddsGridRow'

const useStyles = theme => ({
  root: {
    marginTop: theme.spacing(4)
  },
})

class OddsGrid extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Grid container spacing={2} direction="row" justify="center" alignItems="center">
          {this.props.odds.map((runner, index) => (
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
