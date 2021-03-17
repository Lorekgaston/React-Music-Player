import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaylist } from '../../redux/actions/playList';
import { setTrackList, setAudio } from '../../redux/actions/controller';
import Loader from '../../components/Loading/Loader';
import PlaylistHeader from '../../components/PlaylistHeader/PlaylistHeader';
import PlayListTrack from '../../components/PlayListTrack/PlayListTrack';
import { Divider, Typography } from '@material-ui/core';

import './Playlist.scss';

const PlayList = () => {
    const dispatch = useDispatch();
    const { data, isLoading, isError, errorMessage } = useSelector(state => state.playList);
    const { playlistId, dataType } = useSelector(state => state.controller);

    React.useEffect(() => {
        dispatch(fetchPlaylist(playlistId, dataType));
    }, [playlistId]);

    const playTrack = i => {
        if (dataType === 'playlist') {
            dispatch(setTrackList({ data, i }));
        }
        if (dataType === 'track') {
            dispatch(setAudio(data));
        }
    };
    return (
        <div className="Playlist">
            {isError && <h1>{errorMessage}</h1>}
            {!data ? (
                <div className="Playlist__empty">
                    <Typography variant="h3">Choose a playlist or song to play</Typography>
                </div>
            ) : isLoading ? (
                <div className="Playlist__loader">
                    <Loader />
                </div>
            ) : (
                <>
                    <PlaylistHeader data={data} />
                    <div className="TrackList">
                        <div className="TrackList__tracks">
                            {dataType === 'playlist' &&
                                data?.tracks?.length > 0 &&
                                data?.tracks?.map((song, idx) => {
                                    return (
                                        <PlayListTrack
                                            key={song + idx}
                                            track={song}
                                            isLoading={isLoading}
                                            play={playTrack}
                                            index={idx}
                                        />
                                    );
                                })}
                            {dataType === 'track' && (
                                <PlayListTrack
                                    track={data}
                                    isLoading={isLoading}
                                    play={playTrack}
                                    index={data?.name}
                                />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PlayList;
