import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Calendar, Star, Award, Flame, Target, Home, Heart, Users } from 'lucide-react';

interface Escala {
  id: number;
  nome: string;
  dias: string[];
  totalAtividades: number;
  ultimaAtualizacao: string;
  tema?: string;
  icone?: string;
}

const DIAS_SEMANA = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

const TEMAS = [
  { nome: 'Praia', icone: '🏖️', cor: '#5f8a7f' },
  { nome: 'Floresta', icone: '🌲', cor: '#5f8a7f' },
  { nome: 'Espaço', icone: '🚀', cor: '#6b7b9a' },
  { nome: 'Dinossauro', icone: '🦕', cor: '#d17c4a' },
  { nome: 'Jardim', icone: '🌸', cor: '#8a9a6b' },
  { nome: 'Aventura', icone: '⛰️', cor: '#c9a87c' },
];

const MODELOS_RAPIDOS = [
  { nome: "Semana Leve", descricao: "Rotina tranquila com tempo para você", icone: Heart, cor: "#d17c4a" },
  { nome: "Rotina com Crianças", descricao: "Atividades divertidas para toda família", icone: Users, cor: "#5f8a7f" },
  { nome: "Foco e Produtividade", descricao: "Semana organizada para render mais", icone: Target, cor: "#6b7b9a" },
  { nome: "Fim de Semana em Família", descricao: "Momentos juntos e tarefas divididas", icone: Home, cor: "#c9a87c" },
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
        tema: "Floresta",
        icone: "🌲"
      },
      {
        id: 2,
        nome: "Escala da Clara",
        dias: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        totalAtividades: 8,
        ultimaAtualizacao: "há 1 semana",
        tema: "Praia",
        icone: "🏖️"
      }
    ];
  });

  const [showModal, setShowModal] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>(['Seg', 'Ter', 'Qua', 'Qui', 'Sex']);
  const [temaSelecionado, setTemaSelecionado] = useState(TEMAS[0]);

  // Persistência
  useEffect(() => {
    localStorage.setItem('escalas', JSON.stringify(escalas));
  }, [escalas]);

  // Gamificação simples
  const totalAtividades = escalas.reduce((sum, e) => sum + e.totalAtividades, 0);
  const estrelas = Math.min(Math.floor(totalAtividades / 5), 12);
  const badges = [
    { nome: "Primeira Escala", conquistado: escalas.length >= 1, icone: Award },
    { nome: "10 Atividades", conquistado: totalAtividades >= 10, icone: Target },
    { nome: "Mestre da Semana", conquistado: escalas.length >= 3, icone: Star },
    { nome: "Em Chamas", conquistado: estrelas >= 5, icone: Flame },
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
      tema: temaSelecionado.nome,
      icone: temaSelecionado.icone
    };

    setEscalas([novaEscala, ...escalas]);
    setNovoNome('');
    setDiasSelecionados(['Seg', 'Ter', 'Qua', 'Qui', 'Sex']);
    setTemaSelecionado(TEMAS[0]);
    setShowModal(false);

    navigate(`/escala/${novaEscala.id}`);
  };

  const criarModelo = (modelo: typeof MODELOS_RAPIDOS[0]) => {
    const novaEscala: Escala = {
      id: Date.now(),
      nome: modelo.nome,
      dias: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
      totalAtividades: 0,
      ultimaAtualizacao: "agora",
      tema: "Floresta",
      icone: "🌲"
    };

    setEscalas([novaEscala, ...escalas]);
    navigate(`/escala/${novaEscala.id}`);
  };

  const excluirEscala = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Tem certeza que deseja excluir esta escala?')) {
      setEscalas(escalas.filter(e => e.id !== id));
    }
  };

  const duplicarEscala = (escala: Escala, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const novaEscala: Escala = {
      ...escala,
      id: Date.now(),
      nome: `${escala.nome} (cópia)`,
      ultimaAtualizacao: "agora"
    };

    setEscalas([novaEscala, ...escalas]);
  };

  return (
    <div className="min-h-screen bg-[#f8f4eb] text-[#2c2118]">
      {/* Header */}
      <div className="border-b border-[#e8dcc6] bg-[#f8f4eb]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#5f8a7f] rounded-full flex items-center justify-center">
              <span className="text-white text-xl tracking-[-2px] font-serif">R</span>
            </div>
            <div>
              <div className="font-serif text-2xl tracking-[-1.5px]">ROTINA EM CASA</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm px-5 py-2 text-[#6f5e4f] hover:text-[#2c2118] transition">Sair</Link>
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#d17c4a] text-white text-sm tracking-[2px] rounded-full hover:bg-[#c16a3a] transition"
            >
              <Plus className="w-4 h-4" /> CRIAR NOVA ESCALA
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Saudação */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">👋</span>
            <h1 className="font-serif text-6xl tracking-[-2.5px]">Bom dia, Clarice!</h1>
          </div>
          <p className="text-[#6f5e4f] text-xl">Vamos tornar essa semana mais leve e organizada?</p>
        </div>

        {/* Minhas Escalas */}
        <div className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-[#5f8a7f] text-xs tracking-[3px] mb-1">SUAS ROTINAS</div>
              <h2 className="font-serif text-5xl tracking-[-2px]">Minhas Escalas</h2>
            </div>
            <div className="text-sm text-[#8b5e3c] tracking-[2px]">{escalas.length} ESCALAS ATIVAS</div>
          </div>

          {escalas.length === 0 ? (
            <div className="border border-[#e8dcc6] rounded-3xl bg-white p-16 text-center">
              <Calendar className="w-14 h-14 mx-auto text-[#d17c4a] mb-6" />
              <p className="text-2xl text-[#6f5e4f] mb-3">Nenhuma escala ainda</p>
              <p className="text-[#8b5e3c]">Crie sua primeira escala e comece a organizar sua rotina com leveza.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {escalas.map((escala) => (
                <Link 
                  key={escala.id}
                  to={`/escala/${escala.id}`}
                  className="group border border-[#e8dcc6] bg-white rounded-3xl p-8 hover:shadow-xl transition-all duration-300 block relative overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="text-6xl">{escala.icone || '🌿'}</div>
                    <div className="text-right">
                      <div className="text-5xl font-serif text-[#2c2118] tabular-nums tracking-tighter">{escala.totalAtividades}</div>
                      <div className="text-[10px] text-[#8b5e3c] tracking-[1px] -mt-1">ATIVIDADES</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-3xl tracking-[-1px] mb-1 group-hover:text-[#d17c4a] transition-colors">{escala.nome}</h3>
                    <p className="text-xs text-[#8b5e3c] tracking-[2px] mb-4">{escala.ultimaAtualizacao}</p>
                    
                    <div className="flex items-center gap-2 text-sm text-[#6f5e4f] mb-6">
                      <Calendar className="w-4 h-4" />
                      <span>{escala.dias.join(" • ")}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6 border-t border-[#e8dcc6]">
                    <div className="flex-1 py-3 text-center text-sm tracking-[2px] border border-[#e8dcc6] rounded-2xl group-hover:bg-[#5f8a7f] group-hover:text-white transition">ABRIR</div>
                    <button 
                      onClick={(e) => duplicarEscala(escala, e)}
                      className="px-5 py-3 text-sm tracking-[2px] border border-[#e8dcc6] rounded-2xl hover:bg-[#f8f4eb] transition"
                    >
                      DUPLICAR
                    </button>
                  </div>

                  <button
                    onClick={(e) => excluirEscala(escala.id, e)}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-red-600/60 hover:text-red-600 text-xs px-3 py-1 border border-red-200 rounded-full transition"
                  >
                    Excluir
                  </button>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Criar Nova Escala + Modelos */}
        <div className="mb-16">
          <div className="text-[#5f8a7f] text-xs tracking-[3px] mb-3">NÃO SABE POR ONDE COMEÇAR?</div>
          <h2 className="font-serif text-5xl tracking-[-2px] mb-8">Comece por aqui</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MODELOS_RAPIDOS.map((modelo, index) => (
              <button
                key={index}
                onClick={() => criarModelo(modelo)}
                className="group border border-[#e8dcc6] bg-white rounded-3xl p-8 text-left hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: modelo.cor + '15' }}>
                  <modelo.icone className="w-6 h-6" style={{ color: modelo.cor }} />
                </div>
                <div className="font-serif text-2xl tracking-[-1px] mb-2">{modelo.nome}</div>
                <p className="text-sm text-[#6f5e4f] leading-snug">{modelo.descricao}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Gamificação Leve */}
        <div className="border border-[#e8dcc6] bg-white rounded-3xl p-10">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-[#5f8a7f] text-xs tracking-[3px] mb-1">SUA JORNADA</div>
              <h3 className="font-serif text-4xl tracking-[-1.5px]">Estrelas da Organização</h3>
            </div>
            <div className="flex items-center gap-2 text-3xl font-serif text-[#d17c4a]">
              <Star className="w-8 h-8" /> {estrelas}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {badges.map((badge, index) => (
              <div 
                key={index}
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl border text-sm tracking-[1px] transition-all ${
                  badge.conquistado 
                    ? 'bg-[#5f8a7f] text-white border-[#5f8a7f]' 
                    : 'bg-[#f8f4eb] text-[#8b5e3c] border-[#e8dcc6]'
                }`}
              >
                <badge.icone className="w-4 h-4" />
                {badge.nome}
              </div>
            ))}
          </div>
          
          <p className="text-xs text-[#8b5e3c] tracking-[2px] mt-6">Continue organizando para desbloquear novos temas e conquistas.</p>
        </div>
      </div>

      {/* Modal de Nova Escala */}
      {showModal && (
        <div className="fixed inset-0 bg-[#2c2118]/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-lg rounded-3xl p-10 border border-[#e8dcc6]">
            <h2 className="font-serif text-4xl tracking-[-1.5px] mb-2">Nova escala</h2>
            <p className="text-[#6f5e4f] mb-8">Dê um nome, escolha os dias e um tema visual</p>

            <div className="space-y-7">
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
                <label className="block text-xs tracking-[2px] mb-3 text-[#6f5e4f]">DIAS DA SEMANA</label>
                <div className="flex flex-wrap gap-2">
                  {DIAS_SEMANA.map(dia => (
                    <button key={dia} type="button" onClick={() => toggleDia(dia)}
                      className={`px-4 py-2 rounded-full text-sm border transition-all ${diasSelecionados.includes(dia) ? 'bg-[#2c2118] text-white border-[#2c2118]' : 'border-[#d4c3a3] hover:border-[#d17c4a]'}`}>
                      {dia}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-[2px] mb-3 text-[#6f5e4f]">TEMA VISUAL</label>
                <div className="flex flex-wrap gap-3">
                  {TEMAS.map((tema, i) => (
                    <button key={i} type="button" onClick={() => setTemaSelecionado(tema)}
                      className={`px-5 py-3 rounded-2xl border text-sm flex items-center gap-2 transition-all ${temaSelecionado.nome === tema.nome ? 'border-[#d17c4a] bg-[#d17c4a] text-white' : 'border-[#e8dcc6] hover:border-[#d17c4a]'}`}>
                      <span>{tema.icone}</span> {tema.nome}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-10">
              <button onClick={() => setShowModal(false)} className="flex-1 py-4 border border-[#d4c3a3] rounded-2xl text-sm tracking-[2px] hover:bg-[#f8f4eb] transition">CANCELAR</button>
              <button onClick={criarEscala} disabled={!novoNome.trim()} className="flex-1 py-4 bg-[#d17c4a] text-white rounded-2xl text-sm tracking-[2px] disabled:opacity-50 hover:bg-[#c16a3a] transition">CRIAR ESCALA</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
