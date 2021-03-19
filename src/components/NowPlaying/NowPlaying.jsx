import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import './NowPLaying.scss';

const NowPlaying = ({ track }) => {
    const { songPlaying } = useSelector(state => state.controller);
    return (
        <>
            {!track ? null : (
                <>
                    <img
                        src={track.images[2].url}
                        className={
                            songPlaying ? 'nowPlayingImg' : 'nowPlayingImg imgAnimationPaused'
                        }
                    />
                    <span className="nowPlayingArtist">
                        {track.name?.length > 10 ? track.name.substring(0, 10) + '...' : track.name}
                    </span>
                </>
            )}
        </>
    );
};

export default NowPlaying;

NowPlaying.propTypes = {
    track: PropTypes.object
};
