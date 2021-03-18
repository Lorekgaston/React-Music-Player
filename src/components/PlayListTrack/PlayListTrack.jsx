import * as React from 'react';
import PropTypes from 'prop-types';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AlbumIcon from '@material-ui/icons/Album';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

import './PlayListTrack.scss';

const PlayListTrack = ({ track, play, index }) => {
    const { songPlaying, isSingle, activeIndex } = useSelector(state => state.controller);
    console.log(track);
    return (
        <li className="ListItem" onClick={() => play(index)}>
            <span
                className={
                    activeIndex === index && songPlaying ? 'avatar' : 'avatar animationPaused'
                }>
                {track?.images[0]?.url ? (
                    <Avatar variant="circle" src={track?.images[0]?.url} />
                ) : (
                    <Avatar variant="circle">
                        <AlbumIcon />
                    </Avatar>
                )}
            </span>
            <ListItemText
                primary={
                    <>
                        <Typography variant="h6" noWrap={true}>
                            {track?.name}
                        </Typography>
                    </>
                }
                secondary={track?.artists?.map(artist => (
                    <Typography key={artist.id} variant="caption">
                        {artist.name}
                    </Typography>
                ))}
            />
        </li>
    );
};

export default PlayListTrack;

PlayListTrack.propTypes = {
    track: PropTypes.object,
    play: PropTypes.func,
    index: PropTypes.number
};
