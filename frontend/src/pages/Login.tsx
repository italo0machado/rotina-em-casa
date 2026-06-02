import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500 flex items-center justify-center">
              <Home className="w-6 h-6 text-zinc-950" />
            </div>
            <span className="font-semibold text-2xl tracking-tight text-white">Rotina em Casa</span>
          </Link>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10">
          <div className="mb-8">
            <h1 className="text-4xl font-semibold tracking-tighter text-white mb-2">Bem-vindo de volta</h1>
            <p className="text-zinc-400">Entre na sua conta para acessar suas escalas.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/60 text-zinc-950 font-medium py-4 rounded-2xl transition-all active:scale-[0.985]"
            >
              {loading ? 'Entrando...' : 'Entrar'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-500 mt-8">
            Ainda não tem conta?{' '}
            <Link to="/cadastro" className="text-emerald-500 hover:underline">Crie uma agora</Link>
          </p>
        </div>

        <p className="text-center text-xs text-zinc-600 mt-8">
          © {new Date().getFullYear()} Rotina em Casa
        </p>
      </div>
    </div>
  );
}
