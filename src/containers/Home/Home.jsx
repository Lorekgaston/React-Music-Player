import * as React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { fetchHomeData } from '../../redux/actions/homeData';
import './Home.scss';
import CardListSection from '../../components/CardListSection/CardListSection';
import CoverCard from '../../components/CoverCard/CoverCard';
import Loader from '../../components/Loading/Loader';

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
        <div className="Home">
            {isLoading ? (
                <Loader />
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
            {error && <Typography>{errorMessage}</Typography>}
        </div>
    );
};

export default Home;

Home.propTypes = {
    token: PropTypes.string
};
