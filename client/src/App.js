import React from 'react'
import { Container, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import OddsPickerGrid from './components/OddsPickerGrid'
import Header from './components/Header'

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(10)
    }
  },
  footer: {
    marginBottom: theme.spacing(5),
  }
}))

function App() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Header />
      <OddsPickerGrid />
      <Box className={classes.footer}></Box>
    </Container>
  )
}

export default App
