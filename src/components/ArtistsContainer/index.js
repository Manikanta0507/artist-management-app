import React, { Fragment, useContext, useState } from 'react';
import { Button, Grid, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Add, Delete, Person, Flag, CalendarMonth, Photo } from '@mui/icons-material';
import { UserCard } from '../UserCard';
import { Context } from '../../store';

const useStyles = makeStyles((theme) => ({
    inputField: {
        margin: '0.5rem 0 !important'
    },
    artistContainer: {
        overflowY: 'auto',
        height: '93vh',
        padding: '1rem 1rem 1rem 3rem !important',
        backgroundColor: "#eaeaea",
    },
    buttonsContainer: {
        padding: 0,
        margin: '0 0 10px 0',
        borderRadius: 10,
        width: '100%'
    },
    addButton: {
        marginRight: '10px !important',
        backgroundColor: '#fff !important'
    },
    removeButton: {
        backgroundColor: '#fff !important'
    }
}));

export const ArtistContainer = () => {
    const [data, dispatch] = useContext(Context);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', nationality: '', age: 14, profileUrl: '' });
    const [hasError, setHasError] = useState(false);

    const handleArtistClick = (id) => {
        dispatch({
            type: "updateArtist",
            id
        })
    };

    const toggleDisplayModal = () => {
        setIsOpen(item => !item);
    }

    const handleAddArtist = () => {
        toggleDisplayModal();
    }

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            toggleDisplayModal();
            setFormData({ name: '', nationality: '', age: 14 })
        }
    }

    const handleFieldChange = (fieldName, value) => {
        setFormData(prevData => ({ ...prevData, [fieldName]: value }));

    }

    const updateArtistsList = ({ artists, show, message, alertType, artistId }) => {
        dispatch({
            type: "updateArtistList",
            artists,
            show,
            message,
            alertType,
            artistId
        });
    }

    const handleAddNewArtist = () => {
        let { profileUrl, ...formDataWithoutUrl } = formData;
        if (!Object.values(formDataWithoutUrl).includes("")) {
            setHasError(false);
            let artistObj = { ...formData }
            artistObj["id"] = data.artists.length ? `${data.artists.length + 1}` : "0";
            updateArtistsList({
                artists: [...data.artists, artistObj],
                show: true,
                message: `Artist ${formData["name"]} Added Successfully`,
                alertType: 'success',
                artistId: ''
            });
            handleClose(null, 'cancel');
        } else {
            setHasError(true);
        }
    }

    const handleRemoveArtist = () => {
        if (data.artistId) {
            const updatedList = data.artists.filter(artist => artist.id !== data.artistId);
            updateArtistsList({
                artists: updatedList,
                show: true,
                message: `Artist Removed Successfully`,
                alertType: 'success',
                artistId: ''
            });
        } else {
            dispatch({
                type: "updateNotification",
                show: true,
                message: 'Please Select an artist to delete',
                alertType: 'warning'
            });
        }
    }

    const classes = useStyles();
    return (
        <Fragment>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>New Artist</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography color={hasError ? 'red' : 'black'}>
                            Please fill all the required fields to add a new artist to the list
                        </Typography>
                    </DialogContentText>
                    <Grid container>
                        <Grid xs={12}>
                            <TextField
                                required
                                id="name"
                                label="Name"
                                placeholder="John Doe"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={formData.name}
                                onChange={(event) => handleFieldChange('name', event.target.value)}
                                className={classes.inputField}
                                InputProps={{
                                    endAdornment: <Person />
                                }}
                            />
                        </Grid>
                        <Grid xs={9}>
                            <TextField
                                required
                                id="nationality"
                                label="Nationality"
                                placeholder="Brazilian"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={formData.nationality}
                                onChange={(event) => handleFieldChange('nationality', event.target.value)}
                                className={classes.inputField}
                                InputProps={{
                                    endAdornment: <Flag />
                                }}
                            />
                        </Grid>
                        <Grid xs={1}></Grid>
                        <Grid xs={2}>
                            <TextField
                                required
                                id="age"
                                label="Age"
                                placeholder="21"
                                type="number"
                                fullWidth
                                variant="outlined"
                                value={formData.age}
                                onChange={(event) => handleFieldChange('age', event.target.value)}
                                className={classes.inputField}
                                InputProps={{
                                    endAdornment: <CalendarMonth />
                                }}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                id="profileUrl"
                                label="ProfilePicUrl"
                                placeholder="https://reservemystar.com/wp-content/uploads/2022/05/Armman-Malik.jpg"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={formData.profileUrl}
                                onChange={(event) => handleFieldChange('profileUrl', event.target.value)}
                                className={classes.inputField}
                                InputProps={{
                                    endAdornment: <Photo />
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant={'outlined'}
                        onClick={handleAddNewArtist}
                    >
                        Add</Button>
                    <Button variant={'outlined'} color='error' onClick={() => handleClose(null, 'cancel')}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Grid item xs="auto" sm={4} className={classes.artistContainer}>
                {data.artists.length ? data.artists.map(artist => <UserCard {...artist} handleClick={handleArtistClick} isSelected={data.artistId === artist.id} />) : "Add an artist"}
                <Grid container spacing={0} className={classes.buttonsContainer}>
                    <Button variant={'outlined'} endIcon={<Add />} className={classes.addButton} onClick={handleAddArtist}>Add Artist</Button>
                    <Button variant={'outlined'} endIcon={<Delete />} className={classes.removeButton} color='error' onClick={handleRemoveArtist}>Remove Artist</Button>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default ArtistContainer