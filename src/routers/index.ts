import routes from './routes';
import Home from '../app/components/Home';
import NotFoundPage from '../app/components/NotFoundPage/NotFoundPage';

const Routers: Types.IRoute[] = [
  {
    key: 1,
    path: routes.HOME,
    component: Home,
    isProtected: true,
    isAdmin: false,
  },
  {
    key: 404,
    path: routes.NOTFOUND,
    component: NotFoundPage,
    isProtected: true,
    isAdmin: false,
  },
];

export default Routers;