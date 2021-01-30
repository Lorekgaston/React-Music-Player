import Categories from '../containers/Categories/Categories';
import CategoryPlaylists from '../components/CategoryPlaylists/CategoryPlaylists';
import Playlist from '../containers/PlayList/PlayList';
import Home from '../containers/Home/Home';
import Single from '../containers/Single/Single';
import SearchResults from '../components/SearchResults';

const routes = [
    {
        path: '/home',
        component: Home
    },
    {
        path: '/categories',
        component: Categories
    },
    {
        path: '/categoryPage/:id',
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
        component: SearchResults
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
