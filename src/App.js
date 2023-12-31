import './App.css';
import { Grid, ThemeProvider, Typography, createTheme } from '@mui/material';
import DetailsContainer from './components/detailsContainer';
import ArtistsContainer from './components/ArtistContainer';
import NotificationAlert from './components/NotificationAlert';
import { makeStyles } from '@mui/styles';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 16,
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
        <Grid xs={12} style={{ padding: 16, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" style={{ fontFamily: 'cursive' }}><b>Artist Management App</b></Typography>
        </Grid>
        <ArtistsContainer />
        <DetailsContainer />
      </Grid>
    </ThemeProvider>
  );
}

export default App;
