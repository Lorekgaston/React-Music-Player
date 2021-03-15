import * as React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@material-ui/core';
import PlayListTrack from '../PlayListTrack/PlayListTrack';
import './PlaylistTracklist.scss';

const PlaylistTracklist = ({ classes, playTrack, trackList, loading }) => {
    return (
        <div className="TrackList">
            <Divider variant="fullWidth" className={classes.divider} />
            <div className="TrackList__tracks">
                {trackList?.length > 0 &&
                    trackList?.map((song, idx) => {
                        return (
                            <PlayListTrack
                                key={song + idx}
                                track={song}
                                isLoading={loading}
                                play={playTrack}
                                index={idx}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default PlaylistTracklist;

PlaylistTracklist.propTypes = {
    classes: PropTypes.object,
    playTrack: PropTypes.func,
    trackList: PropTypes.array,
    loading: PropTypes.bool
};
