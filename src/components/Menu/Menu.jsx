import React from 'react';
import PropTypes from 'prop-types';

const Menu = ({ children, isClicked, classes, open }) => {
    return <div className={isClicked ? `${classes} ${open}` : `${classes}`}>{children}</div>;
};

export default Menu;

Menu.propTypes = {
    children: PropTypes.node,
    isClicked: PropTypes.bool.isRequired,
    classes: PropTypes.string.isRequired,
    open: PropTypes.string.isRequired,
    close: PropTypes.string.isRequired
};
