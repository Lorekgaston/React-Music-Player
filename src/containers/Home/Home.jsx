import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeData } from '../../redux/actions/homeData';

import Loader from '../../components/Loading/Loader';
import CoverCard from '../../components/CoverCard/CoverCard';
import CardListSection from '../../components/CardListSection/CardListSection';

import { Typography } from '@material-ui/core';

import './Home.scss';

const useThunkAction = action => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(action);
    }, []);
};

const Home = () => {
    const {
        recentlyPlayed,
        featuredPlaylists,
        recommendations,
        isLoading,
        error,
        errorMessage
    } = useSelector(state => state.homeData);
    const { isPlaylistOpen } = useSelector(state => state.controller);
    useThunkAction(fetchHomeData());
    return (
        <div className="Home">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className={isPlaylistOpen ? 'Home__Title TitleShrink' : 'Home__Title'}>
                        <Typography variant="h3">Last played songs</Typography>
                    </div>
                    <CardListSection isPlaylistOpen={isPlaylistOpen}>
                        <div
                            className={
                                isPlaylistOpen ? 'Home__section sectionShrink' : 'Home__section'
                            }>
                            {recentlyPlayed?.data.items.length > 0 &&
                                recentlyPlayed?.data.items
                                    .filter(item => item.preview_url != null)
                                    .map((item, idx) => {
                                        const {
                                            name,
                                            album: { images },
                                            id,
                                            type
                                        } = item;
                                        return (
                                            <CoverCard
                                                key={item.id + idx}
                                                image={images[0].url}
                                                name={name}
                                                id={id}
                                                type={type}
                                            />
                                        );
                                    })}
                        </div>
                    </CardListSection>
                    <div className={isPlaylistOpen ? 'Home__Title TitleShrink' : 'Home__Title'}>
                        <Typography variant="h3">Your Daily Recommendations</Typography>
                    </div>
                    <CardListSection isPlaylistOpen={isPlaylistOpen}>
                        <div
                            className={
                                isPlaylistOpen ? 'Home__section sectionShrink' : 'Home__section'
                            }>
                            {recommendations?.data.tracks.length > 0 &&
                                recommendations?.data.tracks
                                    .filter(item => item.preview_url != null)
                                    .map((item, idx) => {
                                        const {
                                            name,
                                            id,
                                            album: { images },
                                            type
                                        } = item;
                                        return (
                                            <CoverCard
                                                key={item.id + idx}
                                                image={images[0]?.url}
                                                name={name}
                                                id={id}
                                                type={type}
                                            />
                                        );
                                    })}
                        </div>
                    </CardListSection>
                    <div className={isPlaylistOpen ? 'Home__Title TitleShrink' : 'Home__Title'}>
                        <Typography variant="h3">Top Playlists for you</Typography>
                    </div>
                    <CardListSection isPlaylistOpen={isPlaylistOpen}>
                        <div
                            className={
                                isPlaylistOpen ? 'Home__section sectionShrink' : 'Home__section'
                            }>
                            {featuredPlaylists?.data.playlists.items.length > 0 &&
                                featuredPlaylists?.data.playlists.items.map((playlist, idx) => (
                                    <CoverCard
                                        key={playlist.id + idx}
                                        image={playlist.images[0].url}
                                        name={playlist.name}
                                        id={playlist.id}
                                        type={playlist.type}
                                    />
                                ))}
                        </div>
                    </CardListSection>
                </>
            )}
            {error && <Typography>{errorMessage}</Typography>}
        </div>
    );
};

export default Home;
