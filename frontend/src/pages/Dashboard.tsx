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

const DIAS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

const TEMAS = [
  { id: 'praia', nome: 'Praia', cor: '#e07a5f' },
  { id: 'floresta', nome: 'Floresta', cor: '#81b29a' },
  { id: 'espaco', nome: 'Espaço', cor: '#6b5b95' },
  { id: 'dinossauro', nome: 'Dinossauro', cor: '#f4a261' },
];

// Atualizado: 05/06 21:14
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
    <div className="min-h-screen bg-[#faf7f2] text-[#1f1810]">
      {/* Header */}
      <nav className="border-b border-[#e8dcc6] bg-[#faf7f2]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1f1810] rounded-2xl flex items-center justify-center">
              <span className="text-[#faf7f2] text-xl font-serif tracking-[-1px]">R</span>
            </div>
            <div className="font-serif text-2xl tracking-[-1.5px]">Rotina em Casa</div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#1f1810] text-white px-6 py-2.5 rounded-2xl text-sm hover:bg-black transition"
          >
            <Plus size={16} /> Nova Escala
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="flex items-center gap-8 mb-10">
          <div>
            <div className="text-4xl font-serif tracking-[-2px]">{escalas.length}</div>
            <div className="text-sm text-[#8b7a65]">Escalas ativas</div>
          </div>
          <div>
            <div className="text-4xl font-serif tracking-[-2px]">
              {escalas.reduce((sum, e) => sum + e.totalAtividades, 0)}
            </div>
            <div className="text-sm text-[#8b7a65]">Atividades no total</div>
          </div>
        </div>

        {/* Lista de Escalas */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm tracking-[2px] text-[#8b7a65]">SUAS ESCALAS</div>
          </div>

          {escalas.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {escalas.map((escala) => {
                const tema = getTemaInfo(escala.tema);
                return (
                  <div
                    key={escala.id}
                    onClick={() => navigate(`/escala/${escala.id}`)}
                    className="group bg-white border border-[#e8dcc6] rounded-3xl p-7 hover:border-[#b89a6f] transition cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div 
                        className="w-10 h-10 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: tema.cor + '20', color: tema.cor }}
                      >
                        <Calendar size={20} />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuAberto(menuAberto === escala.id ? null : escala.id);
                        }}
                        className="text-[#8b7a65] hover:text-[#1f1810]"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </div>

                    <div className="font-serif text-2xl tracking-[-1px] mb-1 group-hover:text-[#b89a6f] transition">
                      {escala.nome}
                    </div>
                    <div className="text-sm text-[#8b7a65] mb-6">{escala.criadaEm}</div>

                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex -space-x-1">
                        {escala.dias.slice(0, 5).map((dia, i) => (
                          <div key={i} className="w-7 h-7 rounded-full bg-[#faf7f2] border border-[#e8dcc6] flex items-center justify-center text-[10px]">
                            {dia[0]}
                          </div>
                        ))}
                      </div>
                      <span className="text-[#8b7a65] ml-2">{escala.totalAtividades} atividades</span>
                    </div>

                    {/* Menu */}
                    {menuAberto === escala.id && (
                      <div className="absolute mt-2 right-6 bg-white border border-[#e8dcc6] rounded-2xl shadow-sm py-1 z-10" onClick={e => e.stopPropagation()}>
                        <button onClick={() => duplicarEscala(escala)} className="flex items-center gap-3 px-5 py-2.5 text-sm w-full hover:bg-[#faf7f2]">
                          <Copy size={15} /> Duplicar
                        </button>
                        <button onClick={() => excluirEscala(escala.id)} className="flex items-center gap-3 px-5 py-2.5 text-sm w-full text-red-600 hover:bg-red-50">
                          <Trash2 size={15} /> Excluir
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-[#8b7a65]">
              Você ainda não tem nenhuma escala.
            </div>
          )}
        </div>
      </div>

      {/* Modal Criar Escala */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md">
            <h2 className="font-serif text-3xl tracking-[-1px] mb-6">Nova escala</h2>

            <input
              type="text"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              placeholder="Nome da escala"
              className="w-full border border-[#e8dcc6] px-5 py-4 rounded-2xl text-lg mb-6 focus:outline-none focus:border-[#b89a6f]"
            />

            <div className="mb-6">
              <div className="text-xs tracking-[2px] mb-3 text-[#8b7a65]">TEMA</div>
              <div className="flex gap-3">
                {TEMAS.map(tema => (
                  <button
                    key={tema.id}
                    onClick={() => setTemaSelecionado(tema.id)}
                    className={`w-9 h-9 rounded-2xl border-2 ${temaSelecionado === tema.id ? 'border-[#1f1810]' : 'border-transparent'}`}
                    style={{ backgroundColor: tema.cor }}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 border border-[#e8dcc6] rounded-2xl">
                Cancelar
              </button>
              <button onClick={criarEscala} className="flex-1 py-3 bg-[#1f1810] text-white rounded-2xl">
                Criar Escala
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
