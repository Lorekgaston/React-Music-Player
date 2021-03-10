import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { fetchCategories } from '../../redux/actions/categories';
import { getAuthToken } from '../../Auth';
import useThunkAction from '../../hooks/UseThunkAction';
import './Categories.scss';
import { Typography } from '@material-ui/core';
import useFetch from '../../hooks/useFetch';

const { access_token } = getAuthToken();

const Categories = () => {
    const history = useHistory();
    const { categories, isLoading, error, errorMessage } = useThunkAction(
        fetchCategories(access_token)
    );
    return (
        <div className="CategoriesPage">
            {error && <h1>{errorMessage}</h1>}
            {isLoading ? (
                <h1>Loading....</h1>
            ) : (
                <>
                    <div className="CategoriesPage__Title">
                        <Typography variant="h3">Browse categories</Typography>
                    </div>
                    <div className="Categories">
                        {categories?.length > 0 &&
                            categories?.map((item, idx) => {
                                return (
                                    <>
                                        <div
                                            className="Categories__card"
                                            key={idx}
                                            onClick={() =>
                                                history.push(`/categorypage/${item?.id}`)
                                            }>
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

{
    /* <CoverCard
                                    key={item.id + idx}
                                    image={item.icons[0].url}
                                    name={item.name}
                                    param={`/categorypage/${item?.id}`}
                                /> */
}
