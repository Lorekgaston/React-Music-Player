import * as React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
// import useFetchCategories from '../../hooks/useFetchCategories';
import CategoriesList from '../../components/CategoriesList/CategoriesList';
import { fetchCategories } from '../../redux/actions/categories';
import { getAuthToken } from '../../Auth';
import useThunkAction from '../../hooks/UseThunkAction';

const { access_token } = getAuthToken();

const useStyles = makeStyles({
    title: {
        fontSize: 30,
        fontWeight: 700,
        color: '#ffff',
        margin: '0 10px',
        textTransform: 'capitalize'
    }
});

// const useFetchCategories = action => {
//     const dispatch = useDispatch();
//     React.useEffect(() => {
//         dispatch(action);
//     }, []);
// };

const Categories = () => {
    // const { categories, isLoading, error } = useSelector(state => state.categories);
    const classes = useStyles();
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
                <h1 className={classes.title}>Loading....</h1>
            ) : (
                <section>
                    <CategoriesList data={categories} />
                </section>
            )}
        </>
    );
};

export default Categories;

{
    /* <Card 
                                    className={classes.card}
                                    key={category.id + idx}
                                    onClick={() => history.push(`/categorypage/${category.id}`)}>
                                    <CardMedia
                                        className={classes.media}
                                        component="img"
                                        src={category.icons[0].url}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="h6">{category.name}</Typography>
                                    </CardContent>
                                </Card> */
}

// {catergories?.length > 0 &&
//     catergories?.map((category, idx) => (
//         <CoverCard
//             key={category.id + idx}
//             image={category.icons[0].url}
//             name={category.name}
//             param={`/categorypage/${category.id}`}
//         />
//     ))}
