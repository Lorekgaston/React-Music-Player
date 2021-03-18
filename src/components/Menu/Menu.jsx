import React from 'react';
import PropTypes from 'prop-types';

const Menu = ({ children, isClicked, classes, open, close }) => {
    return (
        <div className={isClicked ? `${classes} ${open}` : `${classes} ${close}`}>{children}</div>
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
