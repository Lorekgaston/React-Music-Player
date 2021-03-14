import * as React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@material-ui/core';
import PlayListTrack from '../PlayListTrack/PlayListTrack';

const PlaylistTracklist = ({ classes, playTrack, trackList, loading }) => {
    return (
        <>
            <div style={{ overflowY: 'auto' }}>
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
                                index={idx}
                            />
                        );
                    })}
            </div>
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
