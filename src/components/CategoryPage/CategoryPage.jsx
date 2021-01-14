import * as React from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

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

const CategoryPage = ({ token }) => {
    const { id } = useParams();
    const history = useHistory();
    const classes = useStyles();
    const [data, setData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    React.useEffect(() => {
        const getCategoryPLaylists = async () => {
            setIsLoading(true);
            try {
                const response = await axios(
                    `https://api.spotify.com/v1/browse/categories/${id}/playlists`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    }
                );
                if (response) {
                    setData(response.data.playlists.items);
                } else {
                    setError(true);
                }
                setIsLoading(false);
            } catch (err) {
                setError(true);
                setErrorMessage(err.message);
                setIsLoading(false);
            }
        };
        if (token) {
            getCategoryPLaylists();
        }
    }, []);
    console.log(data);
    return (
        <div>
            {isLoading ? (
                <h1 className={classes.title}>Loading....</h1>
            ) : (
                <>
                    <Typography className={classes.title} variant="h1">
                        {id}
                    </Typography>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {data?.length > 0 &&
                            data?.map((playlist, idx) => (
                                <Card
                                    className={classes.card}
                                    key={playlist.id + idx}
                                    onClick={() => history.push(`/playlist/${playlist.id}`)}>
                                    <CardMedia
                                        className={classes.media}
                                        component="img"
                                        src={playlist.images[0].url}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="h6">{playlist.name}</Typography>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CategoryPage;
