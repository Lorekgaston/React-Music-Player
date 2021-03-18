import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import './CardListSection.scss';

const CardListSection = ({ children, isPlaylistOpen }) => (
    <>
        <div className={isPlaylistOpen ? 'CardListSection CardListsrhink' : 'CardListSection'}>
            {children}
        </div>
    </>
);

export default CardListSection;

CardListSection.propTypes = {
    children: PropTypes.any,
    isPlaylistOpen: PropTypes.bool
};
