import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/Auth';
import { PrivateRoute } from './components/PrivateRoute';

function App(): JSX.Element {
  const { auth } = useContext(AuthContext) as { auth: boolean };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <PrivateRoute auth={auth}>
          <Home />
        </PrivateRoute>
      ),
    },
    {
      path: '/signin',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
