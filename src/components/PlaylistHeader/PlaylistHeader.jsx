import * as React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Typography } from '@material-ui/core';
import { parseTime } from '../../utils/handleTime';
import './PlaylistHeader.scss';

const PlaylistHeader = ({ data, playlistDuration, playList }) => (
    <div className="PlaylistHeader">
        <div className="PlaylistHeader__imageContainer">
            <img src={data?.images[0].url} alt={data?.name} />
        </div>
        <div className="PlaylistHeader__title">
            <Typography variant="h3" className="PlaylistHeader__name">
                {data?.name}
            </Typography>
        </div>
    </div>
);

export default PlaylistHeader;

PlaylistHeader.propTypes = {
    classes: PropTypes.object,
    data: PropTypes.any,
    playlistDuration: PropTypes.array,
    playList: PropTypes.array
};

{
    /* <Typography variant="body1" className="PlaylistHeader__description">
                {data?.description}
            </Typography>
            <Typography variant="body2" className="PlaylistHeader__type">
                {data?.type}
            </Typography> */
}
