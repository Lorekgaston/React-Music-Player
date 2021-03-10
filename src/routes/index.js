import Genres from '../containers/Genres/Genres';
import CategoryPlaylists from '../components/CategoryPlaylists/CategoryPlaylists';
import Playlist from '../containers/PlayList/PlayList';
import Home from '../containers/Home/Home';
import Single from '../containers/Single/Single';
import Search from '../containers/Search/Search';

const routes = [
    {
        path: '/home',
        component: Home
    },
    {
        path: '/Genres',
        component: Genres
    },
    {
        path: '/Genres/:id',
        component: CategoryPlaylists
    },
    {
        path: '/playlist/:id',
        component: Playlist
    },
    {
        path: '/single/:id',
        component: Single
    },
    {
        path: '/search',
        component: Search
    }
];

export default routes;

// {
//   path: '/',
//   component: Main,
// },
// {
//   path: '/login',
//   component: Login,
//   title:
// },
