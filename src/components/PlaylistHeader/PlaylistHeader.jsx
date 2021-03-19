import * as React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';

import './PlaylistHeader.scss';

const PlaylistHeader = ({ data }) => (
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
