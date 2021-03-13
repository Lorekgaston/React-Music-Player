import * as React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { handlePLaylist } from '../../redux/actions/controller';
import './CoverCard.scss';

const CoverCard = ({ image, name, id }) => {
    const [hover, setHover] = React.useState(false);
    const dispatch = useDispatch();
    const handlePlaylist = () => {
        dispatch(handlePLaylist(id));
        dispatch({ type: 'TOOGLE_PLAYLIST' });
    };
    return (
        <div
            className="Card"
            onClick={() => handlePlaylist()}
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
    id: PropTypes.string
};

{
    /* <div className="Card_info">
                <h4>{name}</h4>
            </div> */
}
