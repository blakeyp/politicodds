import React from 'react'
import { Grid, Typography, Paper } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'

const useStyles = theme => ({
  oddsPaper: {
    backgroundColor: '#E8EBED',
    float: 'right',
    width: 55,
    height: 35,
    lineHeight: '35px',
    fontSize: '1rem',
    fontWeight: 500,
    textAlign: 'center'
  },
  runnerLabel: {
    fontSize: '130%'
  },
  percentGridItem: {
    // Eliminate top padding on mobile to 'group' collapsed rows
    [theme.breakpoints.down('sm')]: {
      paddingTop: '0 !important'
    },
  },
  percentBarContainer: {
    display: 'inline-block',
    width: '85%'
  },
  percentBar: {
    backgroundColor: '#C1E2EC',
    display: 'inline-block',
    height: 25,
    verticalAlign: 'middle'
  },
  percentLabel: {
    position: 'absolute',
    marginLeft: theme.spacing(1),
    verticalAlign: 'middle'
  }
})

class OddsGridRow extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <Grid item xs={10} md={3}>
        <Typography variant="subtitle1" className={classes.runnerLabel}>
          {this.props.runnerName}
        </Typography>
        </Grid>
        <Grid item xs={2} md={1}>
          <Paper elevation={0} className={classes.oddsPaper}>
            {this.props.odds}
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} className={classes.percentGridItem}>
          <div className={classes.percentBarContainer}>
            <div className={classes.percentBar} style={{ width: `${this.props.probability}%` }}></div>
            <Typography variant="subtitle1" display="inline" className={classes.percentLabel}>
              {this.props.probability}%
            </Typography>
          </div>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(useStyles)(OddsGridRow)
