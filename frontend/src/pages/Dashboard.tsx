import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Calendar, Star, Award, Flame, Target, Home, Heart, MoreVertical, Copy, Trash2 } from 'lucide-react';

interface Escala {
  id: number;
  nome: string;
  dias: string[];
  totalAtividades: number;
  ultimaAtualizacao: string;
  tema?: string;
  criadaEm?: string;
}

const DIAS_SEMANA = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

const TEMAS = [
  { id: 'praia', nome: 'Praia', cor: '#5f8a7f', icone: Home },
  { id: 'floresta', nome: 'Floresta', cor: '#4a7c59', icone: Heart },
  { id: 'espaco', nome: 'Espaço', cor: '#6b5b95', icone: Star },
  { id: 'dinossauro', nome: 'Dinossauro', cor: '#d17c4a', icone: Target },
];

const MODELOS = [
  {
    id: 'leve',
    nome: 'Semana Leve',
    descricao: 'Uma rotina equilibrada com tempo para descanso',
    atividades: 6,
    dias: 5,
    tema: 'praia'
  },
  {
    id: 'criancas',
    nome: 'Rotina com Crianças',
    descricao: 'Tarefas divertidas para fazer em família',
    atividades: 9,
    dias: 7,
    tema: 'dinossauro'
  },
  {
    id: 'foco',
    nome: 'Foco e Produtividade',
    descricao: 'Estrutura para quem precisa de concentração',
    atividades: 7,
    dias: 5,
    tema: 'espaco'
  },
  {
    id: 'fimdesemana',
    nome: 'Fim de Semana em Família',
    descricao: 'Momentos de qualidade juntos',
    atividades: 5,
    dias: 2,
    tema: 'floresta'
  }
];

export default function Dashboard() {
  const navigate = useNavigate();

  const [escalas, setEscalas] = useState<Escala[]>(() => {
    const saved = localStorage.getItem('escalas');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
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
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>(['Seg', 'Ter', 'Qua', 'Qui', 'Sex']);
  const [menuAberto, setMenuAberto] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('escalas', JSON.stringify(escalas));
  }, [escalas]);

  const totalEstrelas = escalas.reduce((sum, e) => sum + e.totalAtividades, 0);
  const totalEscalas = escalas.length;

  const conquistasDesbloqueadas = [
    { id: 1, nome: "Primeira Escala", icone: Star, desbloqueada: totalEscalas >= 1 },
    { id: 2, nome: "10 Atividades", icone: Target, desbloqueada: totalEstrelas >= 10 },
    { id: 3, nome: "Mestre da Semana", icone: Award, desbloqueada: totalEscalas >= 3 },
    { id: 4, nome: "Em Chamas", icone: Flame, desbloqueada: totalEstrelas >= 30 },
  ].filter(c => c.desbloqueada);

  const proximasConquistas = [
    { id: 5, nome: "Streak de 7 dias", icone: Flame, progresso: "3/7" },
    { id: 6, nome: "50 Atividades", icone: Target, progresso: `${totalEstrelas}/50` },
  ];

  const toggleDia = (dia: string) => {
    if (diasSelecionados.includes(dia)) {
      if (diasSelecionados.length > 1) {
        setDiasSelecionados(diasSelecionados.filter(d => d !== dia));
      }
    } else {
      setDiasSelecionados([...diasSelecionados, dia]);
    }
  };

  const criarEscala = () => {
    if (!novoNome.trim()) return;

    const novaEscala: Escala = {
      id: Date.now(),
      nome: novoNome.trim(),
      dias: [...diasSelecionados],
      totalAtividades: 0,
      ultimaAtualizacao: "agora",
      tema: temaSelecionado,
      criadaEm: new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long' }).format(new Date())
    };

    setEscalas([novaEscala, ...escalas]);
    setNovoNome('');
    setDiasSelecionados(['Seg', 'Ter', 'Qua', 'Qui', 'Sex']);
    setTemaSelecionado('praia');
    setShowModal(false);

    navigate(`/escala/${novaEscala.id}`);
  };

  const criarDoModelo = (modelo: any) => {
    const novaEscala: Escala = {
      id: Date.now(),
      nome: modelo.nome,
      dias: Array.from({ length: modelo.dias }, (_, i) => DIAS_SEMANA[i]),
      totalAtividades: modelo.atividades,
      ultimaAtualizacao: "agora",
      tema: modelo.tema,
      criadaEm: new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long' }).format(new Date())
    };

    setEscalas([novaEscala, ...escalas]);
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

  const getTemaInfo = (temaId?: string) => {
    return TEMAS.find(t => t.id === temaId) || TEMAS[0];
  };

  return (
    <div className="min-h-screen bg-[#f8f4eb] text-[#2c2118]">
      {/* Header */}
      <nav className="border-b border-[#e8dcc6] bg-[#f8f4eb]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#2c2118] rounded-2xl flex items-center justify-center">
              <span className="text-[#f8f4eb] text-xl tracking-[-2px] font-serif">R</span>
            </div>
            <div>
              <div className="font-serif text-2xl tracking-[-1.5px]">ROTINA EM CASA</div>
            </div>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-8 py-3 bg-[#d17c4a] text-white text-sm tracking-[2px] rounded-2xl hover:bg-[#b8693a] transition shadow-md"
          >
            <Plus className="w-4 h-4" /> CRIAR NOVA ESCALA
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

        {/* Saudação + Estrelas */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="text-[#8b5e3c] text-sm tracking-[3px] mb-1">BOM DIA, CLARICE</div>
            <h1 className="font-serif text-6xl tracking-[-3px]">Pronto para uma semana mais leve?</h1>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-[#e8dcc6]">
            <Star className="w-6 h-6 text-[#d17c4a]" />
            <div>
              <div className="text-3xl font-serif tracking-tighter">{totalEstrelas}</div>
              <div className="text-[10px] text-[#8b5e3c] tracking-[2px] -mt-1">ESTRELAS</div>
            </div>
          </div>
        </div>

        {/* SUA JORNADA DE ORGANIZAÇÃO */}
        <div>
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-[#8b5e3c] text-xs tracking-[3px] mb-1">SUA JORNADA</div>
              <h2 className="font-serif text-4xl tracking-[-1.5px]">Estrelas da Organização</h2>
            </div>
            <div className="text-sm text-[#8b5e3c]">Faltam 120 estrelas para o próximo tema</div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-[#e8dcc6]">
            <div className="flex items-center gap-4 mb-8">
              <div className="text-6xl font-serif tracking-tighter text-[#d17c4a]">{totalEstrelas}</div>
              <div>
                <div className="text-xl">estrelas acumuladas</div>
                <div className="text-sm text-[#8b5e3c]">Continue criando escalas para ganhar mais!</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {conquistasDesbloqueadas.map((c) => (
                <div key={c.id} className="flex items-center gap-3 p-4 bg-[#f8f4eb] rounded-2xl">
                  <c.icone className="w-8 h-8 text-[#d17c4a]" />
                  <div className="text-sm font-medium">{c.nome}</div>
                </div>
              ))}
              {proximasConquistas.map((c) => (
                <div key={c.id} className="flex items-center gap-3 p-4 border border-dashed border-[#d4c3a3] rounded-2xl opacity-60">
                  <c.icone className="w-8 h-8 text-[#8b5e3c]" />
                  <div>
                    <div className="text-sm font-medium">{c.nome}</div>
                    <div className="text-xs text-[#8b5e3c]">{c.progresso}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MINHAS ESCALAS */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-[#8b5e3c] text-xs tracking-[3px] mb-1">SUAS ROTINAS</div>
              <h2 className="font-serif text-4xl tracking-[-1.5px]">Minhas Escalas</h2>
            </div>
            <div className="text-sm text-[#8b5e3c]">{totalEscalas} escalas ativas</div>
          </div>

          {escalas.length === 0 ? (
            <div className="text-center py-16 border border-[#e8dcc6] rounded-3xl bg-white">
              <Calendar className="w-12 h-12 mx-auto text-[#d17c4a] mb-4" />
              <p className="text-xl text-[#6f5e4f]">Você ainda não tem nenhuma escala</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {escalas.map((escala) => {
                const tema = getTemaInfo(escala.tema);
                const TemaIcon = tema.icone;

                return (
                  <div 
                    key={escala.id}
                    className="group border border-[#e8dcc6] bg-white rounded-3xl p-7 hover:shadow-md transition-all duration-300 relative"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${tema.cor}15` }}>
                        <TemaIcon className="w-7 h-7" style={{ color: tema.cor }} />
                      </div>

                      <div className="relative">
                        <button 
                          onClick={() => setMenuAberto(menuAberto === escala.id ? null : escala.id)}
                          className="p-2 text-[#8b5e3c] hover:text-[#2c2118]"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {menuAberto === escala.id && (
                          <div className="absolute right-0 mt-2 w-44 bg-white border border-[#e8dcc6] rounded-2xl shadow-lg py-2 z-50">
                            <button 
                              onClick={() => duplicarEscala(escala)}
                              className="flex items-center gap-3 w-full px-5 py-3 text-left text-sm hover:bg-[#f8f4eb]"
                            >
                              <Copy className="w-4 h-4" /> Duplicar escala
                            </button>
                            <button 
                              onClick={() => excluirEscala(escala.id)}
                              className="flex items-center gap-3 w-full px-5 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" /> Excluir
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-serif text-3xl tracking-[-1px] mb-2 group-hover:text-[#d17c4a] transition-colors">
                        {escala.nome}
                      </h3>
                      <p className="text-sm text-[#8b5e3c]">
                        {escala.totalAtividades} atividades • {escala.dias.length} dias
                      </p>
                      <p className="text-xs text-[#8b5e3c] mt-1">Criada em {escala.criadaEm}</p>
                    </div>

                    <Link 
                      to={`/escala/${escala.id}`}
                      className="block w-full py-3.5 bg-[#2c2118] text-white text-center rounded-2xl text-sm tracking-[2px] hover:bg-[#3f2a1d] transition"
                    >
                      ABRIR ESCALA
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* MODELOS PRONTOS */}
        <div>
          <div className="mb-6">
            <div className="text-[#8b5e3c] text-xs tracking-[3px] mb-1">PRECISA DE INSPIRAÇÃO?</div>
            <h2 className="font-serif text-4xl tracking-[-1.5px]">Comece por aqui</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MODELOS.map((modelo) => {
              const tema = getTemaInfo(modelo.tema);
              const TemaIcon = tema.icone;

              return (
                <button
                  key={modelo.id}
                  onClick={() => criarDoModelo(modelo)}
                  className="text-left p-6 bg-white border border-[#e8dcc6] rounded-3xl hover:shadow-md transition group"
                >
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${tema.cor}15` }}>
                    <TemaIcon className="w-5 h-5" style={{ color: tema.cor }} />
                  </div>
                  <div className="font-medium text-lg tracking-[-0.3px] mb-1 group-hover:text-[#d17c4a] transition">
                    {modelo.nome}
                  </div>
                  <div className="text-sm text-[#6f5e4f] leading-snug mb-4">
                    {modelo.descricao}
                  </div>
                  <div className="text-xs text-[#8b5e3c] tracking-widest">
                    {modelo.atividades} ATIVIDADES • {modelo.dias} DIAS
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Modal de Nova Escala */}
      {showModal && (
        <div className="fixed inset-0 bg-[#2c2118]/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-lg rounded-3xl p-10 border border-[#e8dcc6]">
            <h2 className="font-serif text-4xl tracking-[-1.5px] mb-2">Nova escala</h2>
            <p className="text-[#6f5e4f] mb-8">Dê um nome, escolha o tema e os dias</p>

            <div className="space-y-6">
              <div>
                <label className="block text-xs tracking-[2px] mb-2 text-[#6f5e4f]">NOME DA ESCALA</label>
                <input
                  type="text"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  placeholder="Ex: Rotina da Semana"
                  className="w-full border border-[#d4c3a3] px-6 py-4 rounded-2xl text-lg focus:border-[#d17c4a] focus:outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs tracking-[2px] mb-3 text-[#6f5e4f]">TEMA VISUAL</label>
                <div className="flex gap-3">
                  {TEMAS.map(t => {
                    const Icon = t.icone;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTemaSelecionado(t.id)}
                        className={`flex-1 p-4 rounded-2xl border flex flex-col items-center gap-2 transition ${temaSelecionado === t.id ? 'border-[#d17c4a] bg-[#fdfaf3]' : 'border-[#e8dcc6]'}`}
                      >
                        <Icon className="w-6 h-6" style={{ color: t.cor }} />
                        <span className="text-xs tracking-widest">{t.nome}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-[2px] mb-3 text-[#6f5e4f]">DIAS DA SEMANA</label>
                <div className="flex flex-wrap gap-2">
                  {DIAS_SEMANA.map(dia => (
                    <button
                      key={dia}
                      type="button"
                      onClick={() => toggleDia(dia)}
                      className={`px-4 py-2 rounded-2xl text-sm border transition-all ${diasSelecionados.includes(dia) ? 'bg-[#2c2118] text-white border-[#2c2118]' : 'border-[#d4c3a3] hover:border-[#d17c4a]'}`}
                    >
                      {dia}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => setShowModal(false)} className="flex-1 py-4 border border-[#d4c3a3] rounded-2xl text-sm tracking-[2px] hover:bg-[#f8f4eb]">
                CANCELAR
              </button>
              <button onClick={criarEscala} disabled={!novoNome.trim()} className="flex-1 py-4 bg-[#2c2118] text-white rounded-2xl text-sm tracking-[2px] disabled:opacity-50">
                CRIAR ESCALA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
