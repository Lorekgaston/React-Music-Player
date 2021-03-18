import * as React from 'react';
import { useSelector } from 'react-redux';
import CoverCard from '../../components/CoverCard/CoverCard';
import { Typography } from '@material-ui/core';
import Loader from '../../components/Loading/Loader';
import CardListSection from '../../components/CardListSection/CardListSection';

import './Search.scss';

const Search = () => {
    const { playlist, tracks, loading } = useSelector(state => state.search);
    const { isPlaylistOpen } = useSelector(state => state.controller);

    return (
        <div className="Search">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className={isPlaylistOpen ? 'Search__Title TitleShrink' : 'Search__Title'}>
                        <Typography variant="h3">Playlists</Typography>
                    </div>
                    <CardListSection isPlaylistOpen={isPlaylistOpen}>
                        <div
                            className={
                                isPlaylistOpen ? 'Search__flexbox sectionShrink' : 'Search__flexbox'
                            }>
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
                    </CardListSection>
                    <div className={isPlaylistOpen ? 'Search__Title TitleShrink' : 'Search__Title'}>
                        <Typography variant="h3">Tracks</Typography>
                    </div>
                    <CardListSection isPlaylistOpen={isPlaylistOpen}>
                        <div
                            className={
                                isPlaylistOpen ? 'Search__flexbox sectionShrink' : 'Search__flexbox'
                            }>
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
                    </CardListSection>
                </>
            )}
        </div>
    );
};

export default Search;
