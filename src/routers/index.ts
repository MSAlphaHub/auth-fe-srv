import routes from '@routers/routes';
import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFoundPage from '@pages/NotFoundPage';
import QRCodeScanner from '@components/QRCodeScanner';

const Routers: Types.IRoute[] = [
  {
    key: 1,
    path: routes.HOME,
    component: Home,
    isProtected: true,
    isAdmin: false,
  },
  {
    key: 2,
    path: routes.LOGIN,
    component: Login,
    isProtected: true,
    isAdmin: false,
  },
  {
    key: 3,
    path: 'qr-scanner',
    component: QRCodeScanner,
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
