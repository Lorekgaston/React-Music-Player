const client_id = process.env.REACT_APP_CLIENT_ID;
const URI = process.env.REACT_APP_REDIRECT_URI;

const scopes = [
    'user-read-private',
    'user-read-email',
    'user-library-read',
    'user-library-modify',
    'user-follow-read',
    'user-follow-modify',
    'playlist-read-private',
    'playlist-modify-public',
    'playlist-modify-private'
];
export const redirect_url = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${URI}&scope=${scopes.join(
    '%20'
)}&response_type=token`;

export const getAuthToken = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((intial, item) => {
            let redirectUrl = item.split('=');
            intial[redirectUrl[0]] = decodeURIComponent(redirectUrl[1]);
            return intial;
        }, {});
};

// &show_dialog=true
