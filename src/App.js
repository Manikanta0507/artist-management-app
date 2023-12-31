import { Grid, ThemeProvider, Typography, createTheme } from '@mui/material';
import DetailsContainer from './components/DetailsContainer';
import ArtistsContainer from './components/ArtistsContainer';
import NotificationAlert from './components/NotificationAlert';
import { makeStyles } from '@mui/styles';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '16px 16px 8px 16px',
    textAlign: 'center'
  },
  textCursive: {
    fontFamily: 'cursive'
  }
}));

function App() {

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <NotificationAlert />
        <Grid xs={12} className={classes.container}>
          <Typography variant="h3" component="h2" className={classes.textCursive}><b>Artist Management App</b></Typography>
        </Grid>
        <ArtistsContainer />
        <DetailsContainer />
      </Grid>
    </ThemeProvider>
  );
}

export default App;
