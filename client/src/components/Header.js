import React from 'react';
import { Typography, Link, Dialog, IconButton, useMediaQuery } from '@material-ui/core'
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';

const styles = theme => ({
  header: {
    marginBottom: theme.spacing(4),
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  warning: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  }
});
const useStyles = makeStyles(styles);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function Header() {
  const classes = useStyles()

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };

  return (
    <div className={classes.header}>
      <div style={{ position: 'relative' }}>
        <Typography variant="h4">
          Politicodds
        </Typography>
        <Typography variant="subtitle1" color='textSecondary'>
          The latest political betting odds and implied probability
        </Typography>
        <span style={{ position: 'absolute', top: '0', right: '0' }}>
          <Link href="#" onClick={handleOpen} underline='always' variant='subtitle1'>About</Link>
        </span>
      </div>
      <Dialog fullScreen={fullScreen} onClose={handleClose} aria-labelledby="about-root" open={open}>
        <DialogTitle id="about-root" onClose={handleClose}>
          About
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Politicodds uses the latest betting odds data from the <Link href="https://www.betfair.com/exchange" target="_blank" rel="noreferrer">Betfair Exchange</Link> to give estimated probabilities for political events.
          </Typography>
          <Typography gutterBottom>
            All odds are presented in UK standard fractional format together with % implied probability <span style={{ fontStyle: 'italic' }}>1/decimal price * 100</span>. This is using an average of the current back prices on the Betfair Exchange.
          </Typography>
          <Typography style={{ fontWeight: 'bold' }} gutterBottom>
            Why?
          </Typography>
          <Typography gutterBottom>
            There aren't any widely available free tools which present political betting data in an accessible format. Raw odds prices can be obscure and don't give an immediate assessment of probability. Politicodds provides an easy way to quickly glance at what the betting markets think in terms of the likelihood of outcomes.
          </Typography>
          <Typography gutterBottom>
            The Betfair Exchange is particularly insightful because its odds represent a real-money-backed crowd consensus on the likelihood of a given outcome. Like polling, betting odds will never be a perfect predictor, but <Link href="http://researchdmr.com/RothschildPOQ2009.pdf" target="_blank" rel="noreferrer">there is evidence</Link> to suggest that betting markets are on average good predictors of political events.
          </Typography>
          <Typography className={classes.warning} gutterBottom>
            <ErrorIcon fontSize="inherit" /> This app is in development mode, using a Betfair development key which gives slightly delayed data - which has a negligible impact on the data presented but may appear at times out of sync with the live data on the Betfair website. This app is in no way affiliated with Betfair and is only using this publicly available data in the capacity of a personal project.
          </Typography>
          <Typography gutterBottom>
            (c) Patrick Blakey 2020 | <Link href="https://github.com/blakeyp/politicodds" target="_blank">source code</Link>
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header
