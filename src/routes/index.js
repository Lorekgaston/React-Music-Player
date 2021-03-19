import Categories from '../containers/Categories/Categories';
import ListOfPlaylists from '../components/ListOfPlaylists/ListOfPaylists';
import Home from '../containers/Home/Home';
import Search from '../containers/Search/Search';

const routes = [
    {
        path: '/home',
        component: Home
    },
    {
        path: '/Categories',
        component: Categories
    },
    {
        path: '/Categories/:id',
        component: ListOfPlaylists
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
