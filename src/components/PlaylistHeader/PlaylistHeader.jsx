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
            <Typography variant="h4" className="" noWrap={true}>
                {data?.name}
            </Typography>
            <Typography variant="body1" className="">
                {data?.type}
            </Typography>
            <Typography variant="body1" className="">
                {data?.description}
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
