import * as React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import './CoverCard.scss';

const CoverCard = ({ image, name, param }) => {
    const [hover, setHover] = React.useState(false);
    const history = useHistory();

    return (
        <div
            className="Card"
            onClick={() => history.push(param)}
            onMouseEnter={() => setHover(prevState => !prevState)}
            onMouseLeave={() => setHover(prevState => !prevState)}>
            <img src={image} alt="" />
            {hover && <div className="Card__overlay"></div>}
        </div>
    );
};

export default CoverCard;

CoverCard.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    param: PropTypes.string
};

{
    /* <div className="Card_info">
                <h4>{name}</h4>
            </div> */
}
