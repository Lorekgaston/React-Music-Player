import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchListOfPlaylistData } from '../../redux/actions/listOfPlaylists';

import Loader from '../Loading/Loader';
import CoverCard from '../CoverCard/CoverCard';
import CardListSection from '../CardListSection/CardListSection';

import { Typography } from '@material-ui/core';

import './ListOfPlaylists.scss';

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
    const { isPlaylistOpen } = useSelector(state => state.controller);
    useThunkAction(fetchListOfPlaylistData(id));
    return (
        <div className="ListOfPlaylists">
            {isError ? <Typography variant="h3">{errorMessage}</Typography> : null}
            {isLoading ? (
                <Loader />
            ) : !listOfPlaylist ? (
                <h1>There Are no playlist</h1>
            ) : (
                <>
                    <div
                        className={
                            isPlaylistOpen
                                ? 'ListOfPlaylists__Title TitleShrink'
                                : 'ListOfPlaylists__Title'
                        }>
                        <Typography variant="h3">{id}</Typography>
                    </div>

                    <CardListSection isPlaylistOpen={isPlaylistOpen}>
                        <div
                            className={
                                isPlaylistOpen
                                    ? 'ListOfPlaylists__flexbox sectionShrink'
                                    : 'ListOfPlaylists__flexbox'
                            }>
                            {listOfPlaylist.data?.playlists.items.length > 0 &&
                                listOfPlaylist.data?.playlists.items.map((playlist, idx) => (
                                    <>
                                        <CoverCard
                                            key={playlist.id + idx}
                                            image={playlist.images[0].url}
                                            name={playlist.name}
                                            id={playlist.id}
                                            type={playlist.type}
                                        />
                                    </>
                                ))}
                        </div>
                    </CardListSection>
                </>
            )}
        </div>
    );
};

export default ListOfPlaylists;
