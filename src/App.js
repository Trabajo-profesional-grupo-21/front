import './App.css';
import AppRoutes from './AppRoutes';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function PrivateRoute({ element }) {
  const isAuthenticated = !!sessionStorage.getItem('token');
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, path, ...rest } = route;
          if (path === '/login' || path === '/register') {
            // No proteger las rutas de login y registro
            return <Route key={index} path={path} element={element} {...rest} />;
          }
          // Proteger todas las demás rutas
          return <Route key={index} path={path} element={<PrivateRoute element={element} />} {...rest} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
