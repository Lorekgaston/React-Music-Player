import * as React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { fetchHomeData } from '../../redux/actions/homeData';
import './Home.scss';
import CardListSection from '../../components/CardListSection/CardListSection';
import CoverCard from '../../components/CoverCard/CoverCard';

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
    useThunkAction(fetchHomeData());
    return (
        <>
            {error && <Typography>{errorMessage}</Typography>}
            {isLoading ? (
                <div style={{ padding: '24px 32px 0', display: 'flex', justifyContent: 'center' }}>
                    <Typography>Loading...</Typography>
                </div>
            ) : (
                <>
                    <CardListSection title={'Recently Played'}>
                        {recentlyPlayed?.data.items.length > 0 &&
                            recentlyPlayed?.data.items.map((item, idx) => {
                                const {
                                    name,
                                    album: { images },
                                    id
                                } = item;
                                return (
                                    <CoverCard
                                        key={item.id + idx}
                                        image={images[0].url}
                                        name={name}
                                        param={`/single/${id}`}
                                    />
                                );
                            })}
                    </CardListSection>

                    <CardListSection title={'Recommendations'}>
                        {recommendations?.data.tracks.length > 0 &&
                            recommendations?.data.tracks.map((item, idx) => {
                                const {
                                    name,
                                    id,
                                    album: { images }
                                } = item;
                                return (
                                    <CoverCard
                                        key={item.id + idx}
                                        image={images[0]?.url}
                                        name={name}
                                        param={`/single/${id}`}
                                    />
                                );
                            })}
                    </CardListSection>

                    <CardListSection title={'Featured Playlists'}>
                        {featuredPlaylists?.data.playlists.items.length > 0 &&
                            featuredPlaylists?.data.playlists.items.map((playlist, idx) => (
                                <CoverCard
                                    key={playlist.id + idx}
                                    image={playlist.images[0].url}
                                    name={playlist.name}
                                    param={`/playlist/${playlist.id}`}
                                />
                            ))}
                    </CardListSection>
                </>
            )}
        </>
    );
};

export default Home;

Home.propTypes = {
    token: PropTypes.string
};
