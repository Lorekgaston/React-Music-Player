import React from 'react';
import PropTypes from 'prop-types';

const Menu = ({ children, isClicked, classes, subClasses }) => {
    return (
        <div className={isClicked ? `${classes} ${subClasses}` : classes}>
            {isClicked ? children : null}
        </div>
    );
};

export default Menu;

Menu.propTypes = {
    children: PropTypes.node,
    isClicked: PropTypes.bool.isRequired,
    classes: PropTypes.string.isRequired,
    subClasses: PropTypes.string.isRequired
};
