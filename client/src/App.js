import React from 'react'
import { Container, Typography, Box } from '@material-ui/core/'

import OddsGrid from './components/OddsGrid'

function App() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" style={{ marginTop: 25 }}>
        Politicodds
      </Typography>
      <Typography variant="h5" style={{ marginTop: 30 }}>
        Next Liberal Democrat Leader
      </Typography>
      <OddsGrid />
      <Box marginBottom={5}>
        {/* Footer */}
      </Box>
    </Container>
  )
}

export default App
