import {Main} from './Pages/Main';
import {NewImage} from './Pages/NewImage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Videos from './Pages/Videos';
import Images from './Pages/Images';
import NotFound from './Pages/NotFound';

const AppRoutes = [
  {
    path: '/',
    element: <Main />,
    show: true,
  },
  {
    path: '/login',
    element: <Login />,
    show: true,
  },
  {
    path: '/register',
    element: <Register />,
    show: true,
  },
  {
    path: '/videos',
    element: <Videos />,
    show: true,
  },
  {
    path: '/images',
    element: <Images />,
    show: true,
  },
  {
    path: '/new-image',
    element: <NewImage />,
    show: true,
  },
  {
    path: '*',
    element: <NotFound />,
    show: true,
  },
];

export default AppRoutes;