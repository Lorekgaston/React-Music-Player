import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useFetchCategories from '../../hooks/useFetchCategories';

import CategoriesList from './CategoriesList/CategoriesList';

const useStyles = makeStyles({
    title: {
        fontSize: 30,
        fontWeight: 700,
        color: '#ffff',
        margin: '0 10px',
        textTransform: 'capitalize'
    }
});

const Categories = () => {
    const classes = useStyles();

    const { catergories, isLoading } = useFetchCategories(
        'https://api.spotify.com/v1/browse/categories?offset=0&limit=30'
    );
    return (
        <>
            {isLoading ? (
                <h1 className={classes.title}>Loading....</h1>
            ) : (
                <section>
                    <CategoriesList data={catergories} />
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
