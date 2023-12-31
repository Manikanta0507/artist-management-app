import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 10,
        margin: '0 0 15px 0',
    },
    selectedCard: {
        border: '1px solid #12f523',
        backgroundColor: '#dbf2e6'
    },
    unSelectedCard: {
        border: "none",
        backgroundColor: '#fff'
    }
}));

export function UserCard({ name, nationality, age, handleClick, id, isSelected, profileUrl }) {

    const classes = useStyles();

    return (
        <Grid container spacing={0} className={`${classes.container} ${isSelected ? classes.selectedCard : classes.unSelectedCard}`} onClick={() => handleClick(id)}>
            <Grid style={{ display: 'flex' }}>
                <Avatar alt={name} src={profileUrl ? profileUrl : ''} sx={{ width: 80, height: 80, marginRight: '1rem' }} />
                <Grid>
                    <Typography variant="h5">{name}</Typography>
                    <Typography>{nationality}</Typography>
                    <Typography>{age}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default UserCard;