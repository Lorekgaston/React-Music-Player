import * as React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { handlePLaylist } from '../../redux/actions/controller';
import './CoverCard.scss';

const CoverCard = ({ image, id, name, type }) => {
    const [hover, setHover] = React.useState(false);
    const { isPlaylistOpen } = useSelector(state => state.controller);
    const dispatch = useDispatch();
    const handlePlaylist = (id, type) => {
        if (!isPlaylistOpen) {
            dispatch({ type: 'TOOGLE_PLAYLIST' });
        }
        dispatch(handlePLaylist(id, type));
    };

    return (
        <div
            className="Card"
            onClick={() => handlePlaylist(id, type)}
            onMouseEnter={() => setHover(prevState => !prevState)}
            onMouseLeave={() => setHover(prevState => !prevState)}>
            <img
                className={type === 'track' ? 'Card__images track' : 'Card__images'}
                src={image}
                alt={name}
            />
            {type === 'track' && (
                <div className="Card__info">
                    <h4>
                        {name.length > 14 && name.length != name.length - 1
                            ? name.substring(0, 14) + '...'
                            : name}
                    </h4>
                </div>
            )}
            {hover && <div className="Card__overlay"></div>}
        </div>
    );
};

export default CoverCard;

CoverCard.propTypes = {
    image: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string
};
