import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CoverCard from '../../components/CoverCard/CoverCard';
import { Typography } from '@material-ui/core';
import Loader from '../../components/Loading/Loader';

import './Search.scss';

const Search = () => {
    const { playlist, loading } = useSelector(state => state.search);
    return (
        <div className="Search">
            <div className="Search__title">
                <Typography variant="h3">Search For..</Typography>
            </div>
            {loading ? (
                <Loader />
            ) : (
                <div className="Search__results">
                    <div className="Search__results_flexbox">
                        {playlist?.length > 0 &&
                            playlist?.map((playlist, idx) => (
                                <CoverCard
                                    key={playlist.id + idx}
                                    image={playlist?.images[0]?.url}
                                    name={playlist.name}
                                    id={playlist.id}
                                />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
