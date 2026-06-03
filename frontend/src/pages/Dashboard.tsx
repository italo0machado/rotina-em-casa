import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar } from 'lucide-react';

interface Escala {
  id: number;
  nome: string;
  dias: string[];
  totalAtividades: number;
  ultimaAtualizacao: string;
}

export default function Dashboard() {
  const [escalas, setEscalas] = useState<Escala[]>([
    {
      id: 1,
      nome: "Rotina da Semana",
      dias: ["Seg", "Ter", "Qua", "Qui", "Sex"],
      totalAtividades: 12,
      ultimaAtualizacao: "há 2 dias"
    },
    {
      id: 2,
      nome: "Escala da Clara",
      dias: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      totalAtividades: 8,
      ultimaAtualizacao: "há 1 semana"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [novoNome, setNovoNome] = useState('');

  const criarEscala = () => {
    if (!novoNome.trim()) return;

    const novaEscala: Escala = {
      id: Date.now(),
      nome: novoNome.trim(),
      dias: ["Seg", "Ter", "Qua", "Qui", "Sex"],
      totalAtividades: 0,
      ultimaAtualizacao: "agora"
    };

    setEscalas([novaEscala, ...escalas]);
    setNovoNome('');
    setShowModal(false);
    
    // TODO: Navegar para a página de edição da escala
    // navigate(`/escala/${novaEscala.id}`);
  };

  return (
    <div className="min-h-screen bg-[#f9f5f0] text-[#2c2118]">
      {/* Navbar */}
      <nav className="border-b border-[#e8dcc6] bg-[#f9f5f0]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#2c2118] rounded-full flex items-center justify-center">
              <span className="text-[#f9f5f0] text-xl tracking-[-2px] font-serif">R</span>
            </div>
            <div>
              <div className="font-serif text-2xl tracking-[-1.5px]">ROTINA EM CASA</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-sm px-5 py-2 text-[#6f5e4f] hover:text-[#2c2118] transition"
            >
              Sair
            </Link>
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#2c2118] text-white text-sm tracking-[2px] rounded-full hover:bg-[#3f2a1d] transition"
            >
              <Plus className="w-4 h-4" /> NOVA ESCALA
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-10">
          <h1 className="font-serif text-6xl tracking-[-2.5px] mb-3">Suas escalas</h1>
          <p className="text-[#6f5e4f] text-lg">Gerencie e organize as rotinas da sua casa</p>
        </div>

        {escalas.length === 0 ? (
          <div className="text-center py-20 border border-[#e8dcc6] rounded-3xl bg-white">
            <Calendar className="w-12 h-12 mx-auto text-[#b89a6f] mb-4" />
            <p className="text-xl text-[#6f5e4f]">Você ainda não tem nenhuma escala</p>
            <button 
              onClick={() => setShowModal(true)}
              className="mt-6 px-8 py-3 bg-[#2c2118] text-white rounded-full text-sm tracking-[2px]"
            >
              CRIAR PRIMEIRA ESCALA
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {escalas.map((escala) => (
              <Link 
                key={escala.id}
                to={`/escala/${escala.id}`}
                className="group border border-[#e8dcc6] bg-white rounded-3xl p-8 hover:shadow-xl transition-all duration-300 block"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-3xl tracking-[-1px] mb-1 group-hover:text-[#b89a6f] transition-colors">
                      {escala.nome}
                    </h3>
                    <p className="text-xs text-[#8b5e3c] tracking-[2px]">{escala.ultimaAtualizacao}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-serif text-[#2c2118] tabular-nums tracking-tighter">
                      {escala.totalAtividades}
                    </div>
                    <div className="text-[10px] text-[#8b5e3c] tracking-[1px] -mt-1">ATIVIDADES</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-[#6f5e4f]">
                  <Calendar className="w-4 h-4" />
                  <span>{escala.dias.join(" • ")}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Nova Escala */}
      {showModal && (
        <div className="fixed inset-0 bg-[#2c2118]/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md rounded-3xl p-10 border border-[#e8dcc6]">
            <h2 className="font-serif text-4xl tracking-[-1.5px] mb-2">Nova escala</h2>
            <p className="text-[#6f5e4f] mb-8">Dê um nome para sua nova rotina</p>

            <input
              type="text"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              placeholder="Ex: Rotina da Semana"
              className="w-full border border-[#d4c3a3] px-6 py-4 rounded-2xl text-lg focus:border-[#b89a6f] focus:outline-none mb-6"
              autoFocus
            />

            <div className="flex gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-4 border border-[#d4c3a3] rounded-2xl text-sm tracking-[2px] hover:bg-[#f9f5f0] transition"
              >
                CANCELAR
              </button>
              <button 
                onClick={criarEscala}
                disabled={!novoNome.trim()}
                className="flex-1 py-4 bg-[#2c2118] text-white rounded-2xl text-sm tracking-[2px] disabled:opacity-50 hover:bg-[#3f2a1d] transition"
              >
                CRIAR ESCALA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}