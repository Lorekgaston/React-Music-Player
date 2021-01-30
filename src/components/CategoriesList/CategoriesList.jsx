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
        margin: '0 10px',
        textTransform: 'capitalize'
    }
});

const CategoriesList = ({ data }) => {
    const classes = useStyles();
    return (
        <>
            <Typography className={classes.title}>Categories</Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {data?.length > 0 &&
                    data?.map((item, idx) => {
                        return (
                            <CoverCard
                                key={item.id + idx}
                                image={item.icons[0].url}
                                name={item.name}
                                param={`/categorypage/${item?.id}`}
                            />
                        );
                    })}
            </div>
        </>
    );
};

export default CategoriesList;

CategoriesList.propTypes = {
    data: PropTypes.array
};
