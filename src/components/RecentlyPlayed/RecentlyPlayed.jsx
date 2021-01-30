import * as React from 'react';
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

const RecentlyPlayed = ({ data }) => {
    const classes = useStyles();
    console.log(data);
    return (
        <>
            <Typography className={classes.title}>Recently Played</Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {data?.data.items.length > 0 &&
                    data?.data.items.map((item, idx) => {
                        const {
                            name,
                            album: { images },
                            id
                        } = item;
                        return (
                            <CoverCard
                                key={item.id + idx}
                                image={images[0].url}
                                name={name}
                                param={`/single/${id}`}
                            />
                        );
                    })}
            </div>
        </>
    );
};

export default RecentlyPlayed;
