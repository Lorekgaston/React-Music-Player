import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        height: 'auto',
        width: '100%',
        maxWidth: 1356,
        margin: '50px auto'
    },
    card: {
        height: 280,
        width: 275,
        padding: 2,
        margin: 10
    },
    media: {
        height: 275,
        width: 275
    }
});

const CategoriesList = ({ categories, loading }) => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <div className={classes.container}>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                categories.length > 0 &&
                categories.map((category, idx) => (
                    <Card key={category.id + idx} className={classes.card}>
                        <CardActionArea
                            onClick={() => history.push(`/categoryPage/${category.id}`)}>
                            <CardHeader title={category.name} />
                            <CardMedia className={classes.media} image={category.icons[0].url} />
                        </CardActionArea>
                    </Card>
                ))
            )}
        </div>
    );
};

export default CategoriesList;
