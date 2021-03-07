import * as React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import './CoverCard.scss';

const CoverCard = ({ image, name, param }) => {
    const history = useHistory();
    return (
        <>
            <Card className="Card" onClick={() => history.push(param)}>
                <CardMedia className="Card__media" component="img" src={image} alt={name} />
                <CardContent className="Card__cardContent">
                    <Typography variant="h6">
                        {name.length > 24 ? `${name.substring(0, 24)}...` : name}
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
