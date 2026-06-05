import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const API_BASE = 'https://rotina-em-casa-backend.onrender.com';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-6">
      <div className="w-full max-w-[380px]">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1f1810] rounded-2xl flex items-center justify-center">
              <span className="text-[#faf7f2] text-xl font-serif tracking-[-1px]">R</span>
            </div>
            <div className="font-serif text-3xl tracking-[-1.5px] text-[#1f1810]">
              Rotina em Casa
            </div>
          </Link>
        </div>

        <div className="text-center mb-10">
          <h1 className="font-serif text-5xl tracking-[-2.5px] text-[#1f1810] mb-3">
            Bem-vindo de volta
          </h1>
          <p className="text-[#6b5c4a] text-[15px]">
            Entre para acessar suas escalas
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-white border border-[#e8dcc6] rounded-2xl text-[#8b5e3c] text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#d4c3a3] bg-white px-6 py-4 rounded-2xl text-[15px] focus:border-[#b89a6f] focus:outline-none placeholder:text-[#b89a6f]/50"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#d4c3a3] bg-white px-6 py-4 rounded-2xl text-[15px] focus:border-[#b89a6f] focus:outline-none placeholder:text-[#b89a6f]/50"
              placeholder="Senha"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-3 bg-[#1f1810] hover:bg-black disabled:bg-[#1f1810]/70 text-white text-sm tracking-[2.5px] py-4 rounded-2xl transition-all active:scale-[0.985]"
          >
            {loading ? 'ENTRANDO...' : 'ENTRAR'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="text-center mt-8 text-sm text-[#6b5c4a]">
          Ainda não tem conta?{' '}
          <Link to="/cadastro" className="text-[#b89a6f] hover:underline font-medium">
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}
