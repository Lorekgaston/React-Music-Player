import * as React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import useFetch from '../../hooks/useFetch';

const useStyles = makeStyles({
    card: {
        backgroundColor: '#202020',
        color: '#ffff',
        borderRadius: 5,
        width: 160,
        margin: 10,
        padding: '0.9rem',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#282828'
        }
    },
    media: {
        height: 170
    },
    cardContent: {
        padding: '10px 0'
    },
    title: {
        fontSize: 30,
        fontWeight: 700,
        color: '#ffff',
        padding: 15,
        margin: '15px 0',
        textTransform: 'capitalize'
    }
});

const CategoryPage = () => {
    const { id } = useParams();
    const history = useHistory();
    const classes = useStyles();

    const { data, isLoading } = useFetch(
        `https://api.spotify.com/v1/browse/categories/${id}/playlists?offset=0&limit=30`
    );

    return (
        <div>
            {isLoading ? (
                <h1 className={classes.title}>Loading....</h1>
            ) : (
                <>
                    <Typography className={classes.title} variant="h1">
                        {id}
                    </Typography>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {data?.data.playlists.items.length > 0 &&
                            data?.data.playlists.items.map((playlist, idx) => (
                                <Card
                                    className={classes.card}
                                    key={playlist.id + idx}
                                    onClick={() => history.push(`/playlist/${playlist.id}`)}>
                                    <CardMedia
                                        className={classes.media}
                                        component="img"
                                        src={playlist.images[0].url}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="h6">{playlist.name}</Typography>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CategoryPage;
