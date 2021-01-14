import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import useFetchCategories from '../../hooks/useFetchCategories';

const useStyles = makeStyles({
    // container: {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     flexWrap: 'wrap',
    //     height: 'calsc(100vh - 154px)',
    //     width: '100%'
    //     // maxWidth: 1356,
    //     // paddingBottom: '100px',
    //     // margin: '20px auto'
    // },
    // card: {
    //     height: 280,
    //     width: 275,
    //     padding: 2,
    //     margin: 10
    // },
    // media: {
    //     height: 275
    // }
    // card: {
    //     height: 258,
    //     width: 180,
    //     padding: 2,
    //     margin: 10
    // },
    // media: {
    //     height: 'auto'
    // }
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
    }
});

const CategoriesList = () => {
    const classes = useStyles();
    const history = useHistory();

    const { catergories, isLoading } = useFetchCategories(
        'https://api.spotify.com/v1/browse/categories'
    );
    return (
        <>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                catergories?.length > 0 &&
                catergories?.map((category, idx) => (
                    <Card className={classes.card} key={category.id + idx}>
                        <CardMedia
                            className={classes.media}
                            component="img"
                            src={category.icons[0].url}
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography variant="h6">{category.name}</Typography>
                        </CardContent>
                    </Card>
                ))
            )}
        </>
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
