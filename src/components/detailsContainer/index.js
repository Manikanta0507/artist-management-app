import { useContext, useEffect, useState } from 'react';
import { Grid, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import LaunchIcon from '@mui/icons-material/Launch';
import { Context } from '../../store';

const useStyles = makeStyles((theme) => ({
    lyricsGrid: {
        backgroundColor: '#fff',
        maxHeight: '45vh',
        borderRadius: 10,
        padding: 10,
        overflow: "auto"
    },
    detailsGrid: {
        backgroundColor: '#fff',
        minHeight: '15vh',
        borderRadius: 10,
        padding: 10
    },
    selectSongGrid: {
        backgroundColor: "#fff"
    },
    launchIcon: {
        padding: "0.5rem 0 0 1rem"
    },
    artistDetailsContainer: {
        backgroundColor: "#eaeaea",
        padding: 16
    },
    fullHeight: {
        height: "100vh"
    },
    minHeight: {
        minHeight: "93vh"
    },
    lyricsMessage: {
        position: "absolute",
        top: "150px"
    }
}));

export const DetailsContainer = ({ selectedSongId }) => {
    const [data] = useContext(Context);
    const songs = data.artists.find(artist => artist.id === data.artistId)?.songs;
    const [songId, setSongId] = useState('');
    const [songData, setSongData] = useState({
        id: '',
        title: '',
        composer: '',
        producer: '',
        productionDate: '',
        awards: '',
        lyrics: []
    });

    const handleSongSelection = (event) => {
        setSongId(event.target.value);
        setSongData(songs?.find(song => song.id === event.target.value));
    }

    useEffect(() => {
        if (selectedSongId && songs.length) {
            setSongId(selectedSongId);
            setSongData(songs?.find(song => song.id === selectedSongId));
        }
    }, [selectedSongId]);

    useEffect(() => {
        if (data.artistId && !selectedSongId) {
            setSongData({
                id: '',
                title: '',
                composer: '',
                producer: '',
                productionDate: '',
                awards: '',
                lyrics: []
            });
            setSongId('');
        }
    }, [data.artistId]);

    const handleNewTabClick = () => {
        if (songId) {
            window.open(`/${data.artistId}?songId=${songId}`, "_blank");
        }
    }

    const classes = useStyles();

    return (
        <Grid container sm={selectedSongId ? 12 : 8} className={`${classes.artistDetailsContainer} ${selectedSongId ? classes.fullHeight : classes.minHeight}`} spacing={0}>
            {!data.artistId && <div>select an artist to display the details</div>}
            {data.artistId && !songs?.length && <div>no songs found for the selected artist</div>}
            {
                data.artistId && songs?.length &&
                <>
                    <Grid xs={11}>
                        <FormControl fullWidth>
                            <InputLabel>Select Song</InputLabel>
                            <Select
                                value={songId}
                                label="Select Song"
                                onChange={handleSongSelection}
                                className={classes.selectSongGrid}
                            >
                                {songs.map(song => <MenuItem value={song.id}>{song.title}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    {!selectedSongId && <Grid xs={1}>
                        <LaunchIcon sx={{ fontSize: 40 }} onClick={handleNewTabClick} className={classes.launchIcon} />
                    </Grid>}
                    {!songId && data.artistId && songs?.length && <Grid xs={12} className={classes.lyricsMessage}>please select a song from the above list</Grid>}
                    {songId && songData?.lyrics?.length && <>
                        <Grid xs={12}>
                            <div className={classes.lyricsGrid}>
                                {
                                    songData.lyrics.map(lyric => <pre>{lyric}<br /></pre>)
                                }
                            </div>
                        </Grid>
                        <Grid xs={12}>
                            <div className={classes.detailsGrid}>
                                <pre>Composer : {songData.composer}</pre>
                                <pre>Producer : {songData.producer}</pre>
                                <pre>Production Date : {songData.productionDate}</pre>
                                <pre>Awards : {songData.awards}</pre>
                            </div>
                        </Grid>
                    </>}
                </>
            }

        </Grid>
    )
}

export default DetailsContainer;