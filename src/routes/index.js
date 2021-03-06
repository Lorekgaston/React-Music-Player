import Categories from '../components/Categories/Categories';
import CategoryPage from '../components/CategoryPage/CategoryPage';
import Playlist from '../containers/PlayList/PlayList';
import Home from '../components/Home/Home';
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
        component: CategoryPage
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
