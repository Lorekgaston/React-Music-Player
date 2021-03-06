import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import './CardListSection.scss';

const CardListSection = ({ children, title }) => (
    <>
        <Typography className="Title">{title}</Typography>
        <div className="CardListSection">{children}</div>
    </>
);

export default CardListSection;

CardListSection.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any
};
