import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CategoriesList from '../../components/CategoriesList/CategoriesList';
import { fetchCategories } from '../../redux/actions/categories';
import { getAuthToken } from '../../Auth';
import useThunkAction from '../../hooks/UseThunkAction';

const { access_token } = getAuthToken();

// const useStyles = makeStyles({
//     title: {
//         fontSize: 30,
//         fontWeight: 700,
//         color: '#ffff',
//         margin: '0 10px',
//         textTransform: 'capitalize'
//     }
// });

const Categories = () => {
    // const classes = useStyles();
    // const { catergories, isLoading } = useFetchCategories(
    //     'https://api.spotify.com/v1/browse/categories?offset=0&limit=30'
    // );
    const { categories, isLoading, error, errorMessage } = useThunkAction(
        fetchCategories(access_token)
    );
    return (
        <>
            {error && <h1>{errorMessage}</h1>}
            {isLoading ? (
                <h1>Loading....</h1>
            ) : (
                <section>
                    <CategoriesList data={categories} />
                </section>
            )}
        </>
    );
};

export default Categories;
