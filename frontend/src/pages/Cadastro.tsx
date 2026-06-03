import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';

const API_BASE = 'https://rotina-em-casa-backend.onrender.com';

export default function Cadastro() {
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
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erro ao criar conta');
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
    <div className="min-h-screen bg-[#f9f5f0] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2c2118] rounded-full flex items-center justify-center">
              <Home className="w-5 h-5 text-[#f9f5f0]" />
            </div>
            <div>
              <div className="font-serif text-2xl tracking-[-1.5px] text-[#2c2118]">ROTINA EM CASA</div>
              <div className="text-[9px] text-[#8b5e3c] -mt-1 tracking-[3px]">EST. 2025</div>
            </div>
          </Link>
        </div>

        <div className="bg-white border border-[#e8dcc6] rounded-3xl p-10 shadow-sm">
          <div className="mb-8">
            <h1 className="font-serif text-5xl tracking-[-2px] text-[#2c2118] mb-3">Crie sua conta</h1>
            <p className="text-[#6f5e4f] text-[15px]">Comece a organizar sua casa em minutos.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-[#f9f5f0] border border-[#e8dcc6] rounded-2xl text-[#8b5e3c] text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs tracking-[2px] mb-2 text-[#6f5e4f]">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#d4c3a3] bg-white px-6 py-4 rounded-2xl text-[15px] focus:border-[#b89a6f] focus:outline-none placeholder:text-[#d4c3a3]"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs tracking-[2px] mb-2 text-[#6f5e4f]">SENHA</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[#d4c3a3] bg-white px-6 py-4 rounded-2xl text-[15px] focus:border-[#b89a6f] focus:outline-none placeholder:text-[#d4c3a3]"
                placeholder="Mínimo 6 caracteres"
                minLength={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-3 bg-[#2c2118] hover:bg-[#3f2a1d] disabled:bg-[#2c2118]/60 text-white text-sm tracking-[3px] py-4 rounded-2xl transition-all active:scale-[0.985]"
            >
              {loading ? 'CRIANDO CONTA...' : 'CRIAR CONTA GRÁTIS'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="text-center text-sm text-[#6f5e4f] mt-8">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-[#b89a6f] hover:underline font-medium">Faça login</Link>
          </p>
        </div>

        <p className="text-center text-xs text-[#8b5e3c] mt-8 tracking-[2px]">
          Ao criar uma conta, você concorda com nossos Termos de Serviço.
        </p>
      </div>
    </div>
  );
}