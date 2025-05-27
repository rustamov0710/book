import './App.css';
import Login from './pages/Login/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/Register/Register';
import { useContext } from 'react';
import { AuthContext } from './context/Auth';
import Home from './pages/Home/Home';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  const { auth } = useContext(AuthContext);
  


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
