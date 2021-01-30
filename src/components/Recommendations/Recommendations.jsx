import * as React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CoverCard from '../CoverCard/CoverCard';

const useStyles = makeStyles({
    title: {
        fontSize: 30,
        fontWeight: 700,
        color: '#ffff',
        // padding: 15,
        margin: '0 10px',
        textTransform: 'capitalize'
    }
});

const Recommendations = ({ data }) => {
    const classes = useStyles();
    return (
        <>
            <Typography className={classes.title}>Recommendations</Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {data?.data.tracks.length > 0 &&
                    data?.data.tracks.map((item, idx) => {
                        const {
                            name,
                            id,
                            album: { images }
                        } = item;
                        return (
                            <CoverCard
                                key={item.id + idx}
                                image={images[0]?.url}
                                name={name}
                                param={`/single/${id}`}
                            />
                        );
                    })}
            </div>
        </>
    );
};

export default Recommendations;

Recommendations.propTypes = {
    data: PropTypes.array
};
