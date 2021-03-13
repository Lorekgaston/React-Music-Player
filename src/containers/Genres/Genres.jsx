import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { fetchCategories } from '../../redux/actions/categories';
import { getAuthToken } from '../../Auth';
import { Typography } from '@material-ui/core';

import './Genres.scss';
const { access_token } = getAuthToken();

const useThunkAction = action => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(action);
    }, []);
};

const Genres = () => {
    const history = useHistory();
    const { url } = useRouteMatch();
    const { categories, isLoading, error, errorMessage } = useSelector(state => state.categories);
    useThunkAction(fetchCategories(access_token));
    const aToz = cat =>
        cat?.sort((a, b) => {
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });
    const joinedCategories = categories?.map(category => category.data.categories.items);
    const genres = [].concat.apply([], joinedCategories).reduce((item, o) => {
        if (!item.some(obj => obj.name === o.name)) {
            item.push(o);
        }
        return item;
    }, []);
    console.log(url);
    return (
        <div className="GenresPage">
            {error && <h1>{errorMessage}</h1>}
            {isLoading ? (
                <h1>Loading....</h1>
            ) : (
                <>
                    <div className="GenresPage__Title">
                        <Typography variant="h3">Genres</Typography>
                    </div>
                    <div className="Genres">
                        {genres?.length > 0 &&
                            aToz(genres).map((item, idx) => {
                                return (
                                    <>
                                        <div
                                            className="Genres__card"
                                            key={idx}
                                            onClick={() => history.push(`${url}/${item?.id}`)}>
                                            <img src={item.icons[0].url} alt="" />
                                            <div className="Genres__card_info">
                                                <h4>{item.name}</h4>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                    </div>
                </>
            )}
        </div>
    );
};

export default Genres;

{
    /* <CoverCard
                                    key={item.id + idx}
                                    image={item.icons[0].url}
                                    name={item.name}
                                    param={`/categorypage/${item?.id}`}
                                /> */
}
