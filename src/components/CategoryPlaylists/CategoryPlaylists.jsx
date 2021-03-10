import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import useFetch from '../../hooks/useFetch';
import CoverCard from '../CoverCard/CoverCard';
import './CategoryPlayList.scss';

const CategoryPlaylists = () => {
    const { id } = useParams();

    const { data, isLoading } = useFetch(
        `https://api.spotify.com/v1/browse/categories/${id}/playlists?offset=0&limit=30`
    );
    console.log(data);
    return (
        <div className="CategoryPlaylists">
            {isLoading ? (
                <h1>Loading....</h1>
            ) : !data ? (
                <h1>THere Are no playlist</h1>
            ) : (
                <>
                    <div className="CategoryPlaylists__Title">
                        <Typography variant="h3">{id}</Typography>
                    </div>

                    <div className="CategoryPlaylists__List">
                        <div className="CategoryPlaylists__List_flexbox">
                            {data?.playlists.items.length > 0 &&
                                data?.playlists.items.map((playlist, idx) => (
                                    <>
                                        <CoverCard
                                            key={playlist.id + idx}
                                            image={playlist.images[0].url}
                                            name={playlist.name}
                                            param={`/playlist/${playlist.id}`}
                                        />
                                    </>
                                ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CategoryPlaylists;

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
