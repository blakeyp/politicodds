import React from 'react'
import { Container, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import OddsPickerGrid from './components/OddsPickerGrid'

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(10)
    }
  },
  heading: {
    marginBottom: theme.spacing(3)
  }
}))

function App() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4" className={classes.heading}>
        Politicodds
      </Typography>
      <OddsPickerGrid />
      <Box marginBottom={5}>
        {/* Footer */}
      </Box>
    </Container>
  )
}

export default App
