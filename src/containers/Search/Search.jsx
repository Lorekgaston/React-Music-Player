import * as React from 'react';
import { useSelector } from 'react-redux';
import CoverCard from '../../components/CoverCard/CoverCard';
import { Typography } from '@material-ui/core';
import Loader from '../../components/Loading/Loader';

import './Search.scss';

const Search = () => {
    const { playlist, tracks, loading } = useSelector(state => state.search);
    console.log(tracks);
    return (
        <div className="Search">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="Search__Title">
                        <Typography variant="h3">Playlists</Typography>
                    </div>
                    <div className="Search__results">
                        <div className="Search__results_flexbox">
                            {playlist?.length > 0 &&
                                playlist?.map((playlist, idx) => (
                                    <CoverCard
                                        key={playlist.id + idx}
                                        image={playlist?.images[0]?.url}
                                        name={playlist.name}
                                        id={playlist.id}
                                        type={playlist.type}
                                    />
                                ))}
                        </div>
                    </div>
                    <div className="Search__Title">
                        <Typography variant="h3">Tracks</Typography>
                    </div>
                    <div className="Search__results">
                        <div className="Search__results_flexbox">
                            {tracks?.length > 0 &&
                                tracks?.map((track, idx) => {
                                    const {
                                        name,
                                        album: { images },
                                        id,
                                        type
                                    } = track;
                                    return (
                                        <CoverCard
                                            key={id + idx}
                                            image={images[0].url}
                                            name={name}
                                            id={id}
                                            type={type}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Search;
