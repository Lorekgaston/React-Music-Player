import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import './CardListSection.scss';

const CardListSection = ({ children }) => (
    <>
        <div className="CardListSection">{children}</div>
    </>
);

export default CardListSection;

CardListSection.propTypes = {
    children: PropTypes.any
};
