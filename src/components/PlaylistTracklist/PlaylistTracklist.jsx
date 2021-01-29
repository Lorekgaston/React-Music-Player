import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import { Divider, ListItem, ListItemText, Typography } from '@material-ui/core';
import PlayListTrack from '../PlayListTrack/PlayListTrack';

const PlaylistTracklist = ({ classes, playTrack, trackList, loading }) => {
    return (
        <>
            <List>
                <ListItem className={classes.listHeader}>
                    <ListItemText className={classes.listTitle} primary="Track" />
                    <Typography className={classes.headerTime}>Time</Typography>
                </ListItem>
                <Divider variant="fullWidth" className={classes.divider} />
                {trackList?.length > 0 &&
                    trackList?.map((song, idx) => {
                        // const { track } = song;
                        const labelId = `checkbox-list-label-${song}`;

                        return (
                            <PlayListTrack
                                key={song + idx}
                                track={song}
                                isLoading={loading}
                                play={playTrack}
                                labelId={labelId}
                                i={idx}
                            />
                        );
                    })}
            </List>
        </>
    );
};

export default PlaylistTracklist;

PlaylistTracklist.propTypes = {
    classes: PropTypes.object,
    playTrack: PropTypes.func,
    trackList: PropTypes.array,
    loading: PropTypes.bool
};
