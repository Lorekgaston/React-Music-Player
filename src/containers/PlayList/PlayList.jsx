import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTrackList } from '../../redux/actions/controller';
import { useParams } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import useFetch from '../../hooks/useFetch';
import { useStyles } from './styles';
import PlaylistHeader from '../../components/PlaylistHeader/PlaylistHeader';
import PlaylistTracklist from '../../components/PlaylistTracklist/PlaylistTracklist';
import { filterPlayableTracks, handleTracklistData } from '../../utils/handletrackList';

import './Playlist.scss';
import Loader from '../../components/Loading/Loader';

const PlayList = () => {
    const dispatch = useDispatch();
    const { playlistId } = useSelector(state => state.controller);
    // const { id } = useParams();
    const classes = useStyles();
    const { data, isLoading } = useFetch(
        `https://api.spotify.com/v1/playlists/${playlistId}?fields=description,owner(display_name,external_urls),images,name,primary_color,type,tracks.items(track(album,duration_ms,id,name,preview_url))`,
        playlistId
    );

    // Spread data and asign default value to items, to prevent null or undefine error when destructuring api response.
    const { tracks: { items } = {} } = { ...data };
    // Used helper functions to filter data.
    const playList = filterPlayableTracks(items);
    const trackList = handleTracklistData(playList);
    const playlistDuration = trackList?.map(item => item.duration_ms);
    const playTrack = i => {
        dispatch(setTrackList({ trackList, i }));
    };

    return (
        <div className="Playlist">
            {isLoading ? (
                <div className="Playlist__loader">
                    <Loader />
                </div>
            ) : (
                <>
                    <PlaylistHeader
                        data={data}
                        playlistDuration={playlistDuration}
                        playList={playList}
                    />

                    <PlaylistTracklist
                        classes={classes}
                        playTrack={playTrack}
                        trackList={trackList}
                        loading={isLoading}
                    />
                </>
            )}
        </div>
    );
};

export default PlayList;
