import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import useFetchCategories from '../../hooks/useFetchCategories';

import CategoriesList from './CategoriesList/CategoriesList';

const useStyles = makeStyles({
    // card: {
    //     backgroundColor: '#202020',
    //     color: '#ffff',
    //     borderRadius: 5,
    //     width: 160,
    //     margin: 10,
    //     padding: '0.9rem',
    //     cursor: 'pointer',
    //     '&:hover': {
    //         backgroundColor: '#282828'
    //     }
    // },
    // media: {
    //     height: 170
    // },
    // cardContent: {
    //     padding: '10px 0'
    // },
    // title: {
    //     fontSize: 30,
    //     fontWeight: 700,
    //     color: '#ffff',
    //     padding: 15,
    //     margin: '15px 0',
    //     textTransform: 'capitalize'
    // }
    title: {
        fontSize: 30,
        fontWeight: 700,
        color: '#ffff',
        // padding: 15,
        margin: '0 10px',
        textTransform: 'capitalize'
    }
});

const Categories = () => {
    const classes = useStyles();
    const history = useHistory();

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
