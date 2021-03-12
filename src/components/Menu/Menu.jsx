import React from 'react';

const Menu = ({ children, isClicked, classes }) => {
    return (
        <div className={isClicked ? `${classes} open` : classes}>{isClicked ? children : null}</div>
    );
};

export default Menu;
