import React from 'react';
import PropTypes from 'prop-types';
import useResize from '../../hooks/useResize';

const Menu = ({ children, isClicked, classes, open, close }) => {
    const { isMobile } = useResize();
    return (
        <div className={isClicked ? `${classes} ${open}` : `${classes} ${close}`}>
            {isMobile < 600 ? <>{isClicked ? children : null}</> : <>{children}</>}
        </div>
    );
};

export default Menu;

Menu.propTypes = {
    children: PropTypes.node,
    isClicked: PropTypes.bool.isRequired,
    classes: PropTypes.string.isRequired,
    open: PropTypes.string.isRequired,
    close: PropTypes.string.isRequired
};
