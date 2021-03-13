import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { handlePLaylist } from '../../redux/actions/controller';
import './CoverCard.scss';

const CoverCard = ({ image, name, id }) => {
    const [hover, setHover] = React.useState(false);
    const { isPlaylistOpen } = useSelector(state => state.controller);
    const dispatch = useDispatch();
    const handlePlaylist = () => {
        if (!isPlaylistOpen) {
            dispatch({ type: 'TOOGLE_PLAYLIST' });
        }
        dispatch(handlePLaylist(id));
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
