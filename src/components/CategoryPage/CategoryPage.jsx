import * as React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import useFetch from '../../hooks/useFetch';
import CoverCard from '../CoverCard/CoverCard';

const useStyles = makeStyles({
    card: {
        position: 'relative',
        backgroundColor: '#202020',
        color: '#ffff',
        borderRadius: 5,
        width: '100%',
        maxWidth: 160,
        minHeight: 260,
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
    text: {
        textOverflow: 'ellipsis'
    },
    title: {
        fontSize: 30,
        fontWeight: 700,
        color: '#ffff',
        margin: '0 10px',
        textTransform: 'capitalize'
    }
});

const CategoryPage = () => {
    const { id } = useParams();
    const classes = useStyles();

    const { data, isLoading } = useFetch(
        `https://api.spotify.com/v1/browse/categories/${id}/playlists?offset=0&limit=30`
    );
    console.log(data);
    return (
        <div>
            {isLoading ? (
                <h1 className={classes.title}>Loading....</h1>
            ) : (
                <>
                    <Typography className={classes.title}>{id}</Typography>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {data?.playlists.items.length > 0 &&
                            data?.playlists.items.map((playlist, idx) => (
                                <CoverCard
                                    key={playlist.id + idx}
                                    image={playlist.images[0].url}
                                    name={playlist.name}
                                    param={`/playlist/${playlist.id}`}
                                />
                            ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CategoryPage;

{
    /* <Card
                                    className={classes.card}
                                    key={playlist.id + idx}
                                    onClick={() => history.push(`/playlist/${playlist.id}`)}>
                                    <CardMedia
                                        className={classes.media}
                                        component="img"
                                        src={playlist.images[0].url}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography className={classes.text} variant="h6">
                                            {playlist.name}
                                        </Typography>
                                    </CardContent>
                                </Card> */
}
