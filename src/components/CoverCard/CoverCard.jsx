import * as React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        position: 'relative',
        backgroundColor: '#202020',
        color: '#ffff',
        borderRadius: 5,
        width: '100%',
        maxWidth: 154,
        minHeight: 260,
        margin: 10,
        padding: '0.9rem',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#282828'
        }
    },
    media: {
        height: 170
    },
    cardContent: {
        padding: '10px 0'
    },
    text: {
        textOverflow: 'ellipsis'
    }
});

const CoverCard = ({ image, name, param }) => {
    const history = useHistory();
    const classes = useStyles();
    return (
        <>
            <Card className={classes.card} onClick={() => history.push(param)}>
                <CardMedia className={classes.media} component="img" src={image} alt={name} />
                <CardContent className={classes.cardContent}>
                    <Typography noWrap={true} variant="h6">
                        {name}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
};

export default CoverCard;

CoverCard.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    param: PropTypes.string
};
