import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, MoreVertical, Copy, Trash2 } from 'lucide-react';

interface Escala {
  id: number;
  nome: string;
  dias: string[];
  totalAtividades: number;
  ultimaAtualizacao: string;
  tema?: string;
  criadaEm?: string;
}

const TEMAS = [
  { id: 'praia', nome: 'Praia', cor: '#e07a5f' },
  { id: 'floresta', nome: 'Floresta', cor: '#81b29a' },
  { id: 'espaco', nome: 'Espaço', cor: '#6b5b95' },
  { id: 'dinossauro', nome: 'Dinossauro', cor: '#f4a261' },
];

// Atualizado: 06/06 04:40
export default function Dashboard() {
  const navigate = useNavigate();

  const [escalas, setEscalas] = useState<Escala[]>(() => {
    const saved = localStorage.getItem('escalas');
    if (saved) {
      try { return JSON.parse(saved); } catch { return []; }
    }
    return [
      {
        id: 1,
        nome: "Rotina da Semana",
        dias: ["Seg", "Ter", "Qua", "Qui", "Sex"],
        totalAtividades: 12,
        ultimaAtualizacao: "há 2 dias",
        tema: "praia",
        criadaEm: "10 de junho"
      },
      {
        id: 2,
        nome: "Escala da Clara",
        dias: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        totalAtividades: 8,
        ultimaAtualizacao: "há 1 semana",
        tema: "floresta",
        criadaEm: "5 de junho"
      }
    ];
  });

  const [showModal, setShowModal] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [temaSelecionado, setTemaSelecionado] = useState('praia');
  const [menuAberto, setMenuAberto] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('escalas', JSON.stringify(escalas));
  }, [escalas]);

  const getTemaInfo = (temaId?: string) => {
    return TEMAS.find(t => t.id === temaId) || TEMAS[0];
  };

  const criarEscala = () => {
    if (!novoNome.trim()) return;

    const novaEscala: Escala = {
      id: Date.now(),
      nome: novoNome.trim(),
      dias: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
      totalAtividades: 0,
      ultimaAtualizacao: "agora",
      tema: temaSelecionado,
      criadaEm: new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long' }).format(new Date())
    };

    setEscalas([novaEscala, ...escalas]);
    setNovoNome('');
    setTemaSelecionado('praia');
    setShowModal(false);
    navigate(`/escala/${novaEscala.id}`);
  };

  const excluirEscala = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta escala?')) {
      setEscalas(escalas.filter(e => e.id !== id));
      setMenuAberto(null);
    }
  };

  const duplicarEscala = (escala: Escala) => {
    const novaEscala: Escala = {
      ...escala,
      id: Date.now(),
      nome: `${escala.nome} (Cópia)`,
      ultimaAtualizacao: "agora",
      criadaEm: new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long' }).format(new Date())
    };
    setEscalas([novaEscala, ...escalas]);
    setMenuAberto(null);
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-[#1f1810]">
      {/* Header */}
      <div className="border-b border-[#e8dcc6] bg-[#f8f5f0]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-20">
          <div>
            <div className="font-serif text-2xl tracking-[-1px]">Dashboard</div>
            <div className="text-xs text-[#8b7a65]">Suas escalas</div>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#1f1810] text-white rounded-2xl text-sm hover:bg-black transition"
          >
            <Plus className="w-4 h-4" /> Nova escala
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {escalas.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📋</div>
            <div className="text-2xl tracking-[-0.5px] mb-3">Nenhuma escala ainda</div>
            <p className="text-[#6b5c4a] mb-8">Crie sua primeira escala e comece a organizar sua rotina.</p>
            <button 
              onClick={() => setShowModal(true)}
              className="px-8 py-3 bg-[#1f1810] text-white rounded-2xl text-sm tracking-[1px]"
            >
              CRIAR PRIMEIRA ESCALA
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {escalas.map((escala) => {
              const tema = getTemaInfo(escala.tema);
              return (
                <div 
                  key={escala.id}
                  className="group bg-white border border-[#e8dcc6] rounded-3xl p-7 hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => navigate(`/escala/${escala.id}`)}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div 
                      className="w-3 h-3 rounded-full mt-2"
                      style={{ backgroundColor: tema.cor }}
                    />
                    <div className="relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuAberto(menuAberto === escala.id ? null : escala.id);
                        }}
                        className="p-2 text-[#8b7a65] hover:text-[#1f1810]"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {menuAberto === escala.id && (
                        <div className="absolute right-0 mt-1 w-44 bg-white border border-[#e8dcc6] rounded-2xl shadow-lg py-2 z-50">
                          <button 
                            onClick={(e) => { e.stopPropagation(); duplicarEscala(escala); }}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-[#f8f5f0]"
                          >
                            <Copy className="w-4 h-4" /> Duplicar
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); excluirEscala(escala.id); }}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" /> Excluir
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="font-medium text-2xl tracking-[-0.5px] mb-2 pr-8">{escala.nome}</div>
                  
                  <div className="flex items-center gap-2 text-sm text-[#8b7a65] mb-6">
                    <Calendar className="w-4 h-4" />
                    {escala.dias.join(' • ')}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium">{escala.totalAtividades}</span>
                      <span className="text-[#8b7a65]"> atividades</span>
                    </div>
                    <div className="text-[#8b7a65]">{escala.ultimaAtualizacao}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Criar Escala */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl w-full max-w-md p-8">
            <div className="font-medium text-2xl tracking-[-0.5px] mb-8">Nova escala</div>
            
            <div className="mb-6">
              <div className="text-sm text-[#8b7a65] mb-2">Nome da escala</div>
              <input 
                type="text" 
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                placeholder="Ex: Rotina da Semana"
                className="w-full border border-[#e8dcc6] rounded-2xl px-5 py-3.5 text-lg focus:outline-none focus:border-[#1f1810]"
                autoFocus
              />
            </div>

            <div className="mb-8">
              <div className="text-sm text-[#8b7a65] mb-3">Tema visual</div>
              <div className="flex gap-3">
                {TEMAS.map(tema => (
                  <button
                    key={tema.id}
                    onClick={() => setTemaSelecionado(tema.id)}
                    className={`flex-1 py-3 rounded-2xl border text-sm transition-all ${temaSelecionado === tema.id ? 'border-[#1f1810] bg-[#1f1810] text-white' : 'border-[#e8dcc6] hover:border-[#b89a6f]'}`}
                  >
                    {tema.nome}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-3.5 rounded-2xl border border-[#e8dcc6] text-sm tracking-[1px]"
              >
                CANCELAR
              </button>
              <button 
                onClick={criarEscala}
                disabled={!novoNome.trim()}
                className="flex-1 py-3.5 rounded-2xl bg-[#1f1810] text-white text-sm tracking-[1px] disabled:opacity-50"
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
