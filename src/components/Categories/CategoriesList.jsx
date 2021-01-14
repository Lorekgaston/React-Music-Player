import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import useFetchCategories from '../../hooks/useFetchCategories';

const useStyles = makeStyles({
    card: {
        backgroundColor: '#202020',
        color: '#ffff',
        borderRadius: 5,
        width: 160,
        margin: 10,
        padding: '0.9rem',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#282828'
        }
    },
    media: {
        height: 170
        // '&.MuiCardMedia-img': {
        //     objectFit: 'contain'
        // }
    },
    cardContent: {
        padding: '10px 0'
    },
    title: {
        fontSize: 40,
        fontWeight: 700,
        color: '#ffff',
        padding: 10,
        textTransform: 'capitalize'
    }
});

const CategoriesList = () => {
    const classes = useStyles();
    const history = useHistory();

    const { catergories, isLoading } = useFetchCategories(
        'https://api.spotify.com/v1/browse/categories?offset=0&limit=30'
    );
    return (
        <div>
            {isLoading ? (
                <h1 className={classes.title}>Loading....</h1>
            ) : (
                <>
                    <Typography className={classes.title} variant="h1">
                        Categories
                    </Typography>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {catergories?.length > 0 &&
                            catergories?.map((category, idx) => (
                                <Card
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
                                </Card>
                            ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CategoriesList;

{
    /* <Card key={category.id + idx} className={classes.card}>
                        <CardActionArea
                            onClick={() => history.push(`/categoryPage/${category.id}`)}>
                            <CardHeader title={category.name} />
                            <CardMedia className={classes.media} image={category.icons[0].url} />
                        </CardActionArea>
                    </Card> */
}
