import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

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
    }
});

const Home = () => {
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.card}>
                <CardMedia className={classes.media} component="img" src="#" />
                <CardContent className={classes.cardContent}>
                    <Typography variant="h6"></Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Home;
