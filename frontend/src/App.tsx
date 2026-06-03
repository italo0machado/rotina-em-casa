import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard';
import EscalaEditor from './pages/EscalaEditor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/escala/:id" element={<EscalaEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;