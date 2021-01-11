import * as React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { grey } from '@material-ui/core/colors';
import { Paper } from '@material-ui/core';
import useFetch from '../../hooks/useFetch';
import PlayListTrack from './PlayListTrack/PlayListTrack';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: 'auto',
        maxHeight: 780,
        overflowY: 'scroll',
        maxWidth: 1356,
        margin: '25px auto',
        backgroundColor: '#202020',
        color: grey[200]
    },
    favorite: {
        color: grey[200],
        '&:hover': {
            backgroundColor: grey[900]
        },
        '&.Mui-checked': {
            color: grey[200]
        }
    },
    listItem: {
        '&:hover': {
            backgroundColor: grey[800]
        }
    },
    play: {
        color: grey[200]
    }
});

const PlayList = ({ play }) => {
    const { id } = useParams();
    const classes = useStyles();
    const { data, isLoading } = useFetch(
        `https://api.spotify.com/v1/playlists/${id}/tracks?offset=0&limit=30`
    );
    const items = data?.data.items;
    const urlList = items?.map(song => {
        const {
            track: { preview_url }
        } = song;
        return preview_url;
    });
    const playList = items?.filter(song => {
        const { track } = song;
        return track.preview_url != null;
    });
    const trackListInfo = items
        ?.map(song => {
            const { track } = song;
            return track;
        })
        .filter(track => track.preview_url != null);
    console.log(playList);
    return (
        <Paper className={classes.root}>
            {isLoading ? (
                <h1>Loaging...</h1>
            ) : (
                <List>
                    {playList?.length > 0 &&
                        playList?.map((song, idx) => {
                            const { track } = song;
                            const labelId = `checkbox-list-label-${song}`;

                            return (
                                <PlayListTrack
                                    key={song + idx}
                                    trackListInfo={trackListInfo}
                                    track={track}
                                    urlList={urlList}
                                    labelId={labelId}
                                    play={play}
                                    idx={idx}
                                />
                            );
                        })}
                </List>
            )}
        </Paper>
    );
};

export default PlayList;
