import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { fetchCategories } from '../../redux/actions/categories';
import { getAuthToken } from '../../Auth';
import useThunkAction from '../../hooks/UseThunkAction';
import { Typography } from '@material-ui/core';

import './Genres.scss';
const { access_token } = getAuthToken();

const Genres = () => {
    const history = useHistory();
    const { categories, isLoading, error, errorMessage } = useThunkAction(
        fetchCategories(access_token)
    );
    return (
        <div className="GenresPage">
            {error && <h1>{errorMessage}</h1>}
            {isLoading ? (
                <h1>Loading....</h1>
            ) : (
                <>
                    <div className="GenresPage__Title">
                        <Typography variant="h3">Genres List</Typography>
                    </div>
                    <div className="Genres">
                        {categories?.length > 0 &&
                            categories?.map((item, idx) => {
                                return (
                                    <>
                                        <div
                                            className="Genres__card"
                                            key={idx}
                                            onClick={() => history.push(`/Genres/${item?.id}`)}>
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
