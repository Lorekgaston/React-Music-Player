import * as React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Typography } from '@material-ui/core';
import { parseTime } from '../../utils/handleTime';
import './PlaylistHeader.scss';

const PlaylistHeader = ({ data, playlistDuration, playList }) => (
    <>
        <div className="ImageContainer">
            <img src={data?.images[0].url} alt={data?.name} />
        </div>
        <div className="PlaylistHeader">
            <Typography variant="h3" className="PlaylistHeader__name">
                {data?.name}
            </Typography>
            <Typography variant="body1" className="PlaylistHeader__description">
                {data?.description}
            </Typography>
            <Typography variant="body2" className="PlaylistHeader__type">
                {data?.type}
            </Typography>
        </div>
    </>
);

export default PlaylistHeader;

PlaylistHeader.propTypes = {
    classes: PropTypes.object,
    data: PropTypes.any,
    playlistDuration: PropTypes.array,
    playList: PropTypes.array
};

{
    /* <div className="">
                <Typography variant="caption" className="">
                    <span>Created by:</span>{' '}
                    <strong style={{ cursor: 'pointer' }}>{data?.owner.display_name} </strong>
                    {'  '}-
                </Typography>
                <Typography variant="caption" className="">
                    {playList?.length} Songs -
                </Typography>
                <Typography variant="caption" className="">
                    {parseTime(playlistDuration)}
                </Typography>
            </div> */
}
