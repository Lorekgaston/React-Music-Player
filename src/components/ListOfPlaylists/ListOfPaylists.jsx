import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import useFetch from '../../hooks/useFetch';
import CoverCard from '../CoverCard/CoverCard';
import './ListOfPlaylists.scss';
import Loader from '../Loading/Loader';
import { fetchListOfPlaylistData } from '../../redux/actions/listOfPlaylists';

const useThunkAction = action => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(action);
    }, []);
};

const ListOfPlaylists = () => {
    const { id } = useParams();

    const { listOfPlaylist, isLoading, isError, errorMessage } = useSelector(
        state => state.listOfPlaylist
    );
    useThunkAction(fetchListOfPlaylistData(id));

    console.log(listOfPlaylist);
    return (
        <div className="ListOfPlaylists">
            {isLoading ? (
                <Loader />
            ) : !listOfPlaylist ? (
                <h1>THere Are no playlist</h1>
            ) : (
                <>
                    <div className="ListOfPlaylists__Title">
                        <Typography variant="h3">{id}</Typography>
                    </div>

                    <div className="ListOfPlaylists__List">
                        <div className="ListOfPlaylists__List_flexbox">
                            {listOfPlaylist.data?.playlists.items.length > 0 &&
                                listOfPlaylist.data?.playlists.items.map((playlist, idx) => (
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

export default ListOfPlaylists;

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
