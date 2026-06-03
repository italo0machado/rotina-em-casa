import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard';
import EscalaEditor from './pages/EscalaEditor';

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/cadastro', element: <Cadastro /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/escala/:id', element: <EscalaEditor /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
