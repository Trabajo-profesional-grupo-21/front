import {Main} from './Pages/Main';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Videos from './Pages/Videos';

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