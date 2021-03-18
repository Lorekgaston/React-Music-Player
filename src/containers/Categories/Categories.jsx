import * as React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../redux/actions/categories';

import { getAuthToken } from '../../Auth';

import { Typography } from '@material-ui/core';

import './Categories.scss';

const { access_token } = getAuthToken();

const useThunkAction = action => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(action);
    }, []);
};

const Categories = () => {
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
        <div className="CategoriesPage">
            {error && <h1>{errorMessage}</h1>}
            {isLoading ? (
                <h1>Loading....</h1>
            ) : (
                <>
                    <div className="Categories__Title">
                        <Typography variant="h3">Categories</Typography>
                    </div>
                    <div className="Categories">
                        {genres?.length > 0 &&
                            aToz(genres).map((item, idx) => {
                                return (
                                    <>
                                        <div
                                            className="Categories__card"
                                            key={idx}
                                            onClick={() => history.push(`${url}/${item?.id}`)}>
                                            <img src={item.icons[0].url} alt="" />
                                            <div className="Categories__card_info">
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

export default Categories;
