import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import { redirect_url } from '../../Auth';

const useStyles = makeStyles({
    root: {
        background: `linear-gradient(
            360deg,
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 0.4)
          ),
          url(../../assets/img/zac-bromell-QwrTnOlWAmI-unsplash.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    header: {
        height: '40vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    button: {
        backgroundColor: green[700],
        width: 100,
        '&:hover': {
            backgroundColor: green[600]
        }
    },
    contactContainer: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contact: {
        padding: 20
    },
    icon: {
        marginRight: 10,
        marginLeft: 10,
        cursor: 'pointer',
        '&:hover': {
            color: green[600]
        }
    },
    credit: {
        position: 'absolute',
        left: 0,
        bottom: '10px',
        fontSize: 10,
        color: 'inherit'
    }
});

const Login = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography variant="h2">Music Player</Typography>
                <Typography variant="caption" component="p">
                    This Web App is only for demo purposes, has no commercial use. To view this demo
                    you must sign in with your spotify account
                </Typography>
                <Button href={redirect_url} className={classes.button}>
                    Login
                </Button>
            </div>
            <div className={classes.contactContainer}>
                <Typography variant="h6">
                    <Link
                        href="https://github.com/Lorekgaston/React-Music-Player/"
                        color="inherit"
                        className={classes.icon}>
                        Project code
                    </Link>
                </Typography>
                <div className={classes.contact}>
                    <LinkedInIcon className={classes.icon} fontSize="large" />
                    <InstagramIcon className={classes.icon} fontSize="large" />
                    <GitHubIcon className={classes.icon} fontSize="large" />
                </div>
            </div>
            <div className={classes.credit}>
                <span>
                    Photo by{' '}
                    <Link
                        color="secondary"
                        href="https://unsplash.com/@z5a1nt?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                        Zac Bromell
                    </Link>{' '}
                    on{' '}
                    <Link
                        color="secondary"
                        href="https://unsplash.com/s/photos/dj?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                        Unsplash
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default Login;
