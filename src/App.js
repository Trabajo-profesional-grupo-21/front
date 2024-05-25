import './App.css';
import AppRoutes from './AppRoutes';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function PrivateRoute({ element, ...rest }) {
  const isAuthenticated = !!sessionStorage.getItem('token');
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, path, ...rest } = route;
          return (
            <Route
              key={index}
              path={path}
              element={path === '/' ? <PrivateRoute element={element} /> : element}
              {...rest}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
