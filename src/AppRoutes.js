import {Main} from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import Videos from './pages/Videos';

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
];

export default AppRoutes;