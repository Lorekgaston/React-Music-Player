import * as React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Typography } from '@material-ui/core';
import { parseTime } from '../../utils/handleTime';

const PlaylistHeader = ({ classes, data, playlistDuration, playList }) => (
    <>
        <Avatar
            className={classes.avatar}
            src={data?.images[0].url}
            alt={data?.name}
            variant="square"
        />
        <div className={classes.headerText}>
            <Typography variant="body1" className={classes.headerType}>
                {data?.type}
            </Typography>
            <Typography variant="h2" className={classes.headerName}>
                {data?.name}
            </Typography>
            <Typography variant="body1" className={classes.headerDescription}>
                {data?.description}
            </Typography>
            <div className={classes.headerBottom}>
                <Typography variant="caption" className={classes.headerBottomItem}>
                    <span>Created by:</span>{' '}
                    <strong style={{ cursor: 'pointer' }}>{data?.owner.display_name} </strong>
                    {'  '}-
                </Typography>
                <Typography variant="caption" className={classes.headerBottomItem}>
                    {playList?.length} Songs -
                </Typography>
                <Typography variant="caption" className={classes.headerBottomItem}>
                    {parseTime(playlistDuration)}
                </Typography>
            </div>
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
