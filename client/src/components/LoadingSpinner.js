import React from 'react'
import { CircularProgress } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  spinnerContainer: {
    marginTop: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center'
  }
}))

function LoadingSpinner() {
  const classes = useStyles();

  return (
    <div className={classes.spinnerContainer}>
      <CircularProgress color='inherit' />
    </div>
  )
}

export default LoadingSpinner
