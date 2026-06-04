import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Download, Sparkles, Search } from 'lucide-react';
import { useState } from 'react';
import { Reorder, motion, AnimatePresence } from 'framer-motion';

interface Atividade {
  id: number;
  nome: string;
  duracao: number;
  horario?: string;
  tipo?: 'Saúde' | 'Estudos' | 'Fé' | 'Casa' | 'Lazer' | 'Trabalho' | 'Amigos' | 'Família';
}

interface Escala {
  id: number;
  nome: string;
  dias: string[];
}

const CATEGORIAS = ['Saúde', 'Estudos', 'Fé', 'Casa', 'Lazer', 'Trabalho', 'Amigos', 'Família'] as const;

const TIPO_CONFIG: Record<string, { cor: string; icone: string }> = {
  Saúde:    { cor: '#10b981', icone: '🧘' },
  Estudos:  { cor: '#3b82f6', icone: '📚' },
  Fé:       { cor: '#8b5cf6', icone: '🙏' },
  Casa:     { cor: '#f59e0b', icone: '🏠' },
  Lazer:    { cor: '#ec4899', icone: '🎨' },
  Trabalho: { cor: '#6366f1', icone: '💼' },
  Amigos:   { cor: '#14b8a6', icone: '👥' },
  Família:  { cor: '#f43f5e', icone: '👨‍👩‍👧' },
};

const sugestoesPorCategoria: Record<string, string[]> = {
  Saúde: ["Academia", "Alongamento", "Meditação", "Caminhada"],
  Estudos: ["Ler 20min", "Revisar matéria", "Fazer resumo"],
  Fé: ["Oração", "Leitura espiritual", "Meditação"],
  Casa: ["Arrumar quarto", "Lavar louça", "Organizar armário"],
  Lazer: ["Assistir série", "Jogar", "Pintar"],
  Trabalho: ["Planejar semana", "Responder e-mails", "Estudar relatório"],
  Amigos: ["Marcar café", "Ligar para alguém", "Jogar online"],
  Família: ["Jantar em família", "Brincar com crianças", "Contar história"],
};

function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

function recalculateHorarios(atividades: Atividade[], start = 6): Atividade[] {
  let current = start * 60;
  return atividades.map(a => {
    const horario = formatTime(current);
    current += a.duracao;
    return { ...a, horario };
  });
}

export default function EscalaEditor() {
  const { id } = useParams();
  const location = useLocation();
  const escalaInicial = location.state?.escala as Escala | undefined;

  const [escala] = useState<Escala>(escalaInicial || {
    id: Number(id), nome: `Escala #${id}`, dias: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex']
  });

  const [atividades, setAtividades] = useState<Atividade[]>(() =>
    recalculateHorarios([
      { id: 1, nome: "Acordar e higiene", duracao: 30, tipo: 'Saúde' },
      { id: 2, nome: "Café da manhã", duracao: 25, tipo: 'Casa' },
      { id: 3, nome: "Café com a família", duracao: 30, tipo: 'Família' },
    ])
  );

  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('Saúde');
  const [search, setSearch] = useState('');
  const [rotation, setRotation] = useState(0);
  

  const filteredCategorias = CATEGORIAS.filter(cat =>
    cat.toLowerCase().includes(search.toLowerCase())
  );

  const atividadesDaCategoria = (sugestoesPorCategoria[categoriaSelecionada] || []).map((nome, i) => ({
    id: 1000 + i,
    nome,
    duracao: 20,
    tipo: categoriaSelecionada as any
  }));

  const filteredAtividades = search
    ? atividadesDaCategoria.filter(a => a.nome.toLowerCase().includes(search.toLowerCase()))
    : atividadesDaCategoria;

  const handleReorder = (novaOrdem: Atividade[]) => {
    setAtividades(recalculateHorarios(novaOrdem));
  };

  const adicionarAtividade = (atividade: Atividade) => {
    const nova = { ...atividade, id: Date.now() };
    const atualizadas = recalculateHorarios([...atividades, nova]);
    setAtividades(atualizadas);

    // Feedback visual
  };

  const surpreendaMe = () => {
    const todas = Object.values(sugestoesPorCategoria).flat();
    const sugestao = todas[Math.floor(Math.random() * todas.length)];
    const nova: Atividade = {
      id: Date.now(),
      nome: sugestao,
      duracao: 20,
      tipo: 'Lazer'
    };
    setAtividades(recalculateHorarios([...atividades, nova]));
  };

  const removerAtividade = (id: number) => {
    setAtividades(recalculateHorarios(atividades.filter(a => a.id !== id)));
  };

  const totalMinutos = atividades.reduce((s, a) => s + a.duracao, 0);
  const totalHoras = Math.floor(totalMinutos / 60);
  const minsRestantes = totalMinutos % 60;
  const progresso = Math.min(Math.round((totalMinutos / (16 * 60)) * 100), 100);

  return (
    <div className="min-h-screen bg-[#f8f4eb] text-[#2c2118]">
      {/* Navbar Premium */}
      <nav className="border-b border-[#e8dcc6] bg-[#f8f4eb]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2 text-[#6f5e4f] hover:text-[#2c2118] transition">
              <ArrowLeft className="w-4 h-4" /> Voltar
            </Link>
            <div className="w-px h-6 bg-[#e8dcc6] mx-3" />
            <div>
              <div className="font-serif text-2xl tracking-[-1.2px]">{escala.nome}</div>
              <div className="text-xs text-[#8b5e3c] tracking-[2px]">{escala.dias.join(" • ")}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 border border-[#e8dcc6] rounded-2xl text-sm tracking-[2px] hover:bg-white transition">
              <Download className="w-4 h-4" /> EXPORTAR PDF
            </button>
            <button onClick={surpreendaMe} className="flex items-center gap-2 px-6 py-2.5 border border-[#b89a6f] text-[#b89a6f] rounded-2xl text-sm tracking-[2px] hover:bg-[#b89a6f] hover:text-white transition">
              <Sparkles className="w-4 h-4" /> SURPREENDA-ME
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="font-serif text-6xl tracking-[-2.5px]">Sua Escala</h1>
            <p className="text-[#6f5e4f] mt-2 text-lg">Organize seu dia com calma e intenção</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-serif tracking-tighter text-[#2c2118]">{totalHoras}h {minsRestantes}min</div>
            <div className="text-xs text-[#8b5e3c] tracking-[2px] mt-1">DURAÇÃO TOTAL</div>
          </div>
        </div>

        {/* Barra de Busca */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-5 top-4 text-[#b89a6f] w-4 h-4" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar categoria ou atividade..."
            className="w-full pl-12 pr-5 py-3.5 bg-white border border-[#e8dcc6] rounded-2xl text-sm placeholder:text-[#8b5e3c] focus:outline-none focus:border-[#b89a6f] transition"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Categorias */}
          <div className="lg:col-span-3">
            <div className="text-xs tracking-[3px] text-[#8b5e3c] mb-4 px-1">CATEGORIAS</div>
            <div className="space-y-1">
              {filteredCategorias.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategoriaSelecionada(cat);
                    setSearch('');
                  }}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-left transition-all ${categoriaSelecionada === cat
                      ? 'bg-[#2c2118] text-white shadow-sm'
                      : 'hover:bg-white border border-transparent hover:border-[#e8dcc6]'
                    }`}
                >
                  <span className="text-xl">{TIPO_CONFIG[cat]?.icone}</span>
                  <span className="font-medium tracking-[-0.2px]">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Espiral Central */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-[380px] h-[380px] flex items-center justify-center mb-6">
              {/* Círculo central */}
              <div className="absolute w-24 h-24 rounded-full bg-[#f8f4eb] border border-[#e8dcc6] flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="text-xs text-[#8b5e3c] tracking-[2px]">CATEGORIA</div>
                  <div className="font-serif text-xl tracking-[-1px] text-[#2c2118]">{categoriaSelecionada}</div>
                </div>
              </div>

              {/* Espiral de Atividades */}
              <AnimatePresence>
                {filteredAtividades.map((atividade, index) => {
                  const angle = (index / filteredAtividades.length) * 360 + rotation;
                  const radius = 145;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;

                  return (
                    <motion.button
                      key={atividade.id}
                      onClick={() => adicionarAtividade(atividade)}
                      className="absolute px-5 py-2.5 bg-white border border-[#e8dcc6] rounded-2xl text-sm hover:border-[#b89a6f] transition-all shadow-sm active:scale-95 flex items-center gap-2"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>{TIPO_CONFIG[atividade.tipo || 'Casa']?.icone}</span>
                      <span className="font-medium tracking-[-0.3px]">{atividade.nome}</span>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Controles da Espiral */}
            <div className="flex gap-3">
              <button onClick={() => setRotation(r => r - 45)} className="px-6 py-2 border border-[#e8dcc6] rounded-2xl text-sm hover:bg-white transition">← Girar</button>
              <button onClick={() => setRotation(r => r + 45)} className="px-6 py-2 border border-[#e8dcc6] rounded-2xl text-sm hover:bg-white transition">Girar →</button>
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-3">
            <div className="text-xs tracking-[3px] text-[#8b5e3c] mb-4 px-1">SUA TIMELINE</div>
            <div className="bg-white border border-[#e8dcc6] rounded-3xl p-6 min-h-[420px]">
              {atividades.length === 0 ? (
                <div className="text-center py-12 text-[#8b5e3c] text-sm">Nenhuma atividade adicionada</div>
              ) : (
                <Reorder.Group axis="y" values={atividades} onReorder={handleReorder} className="space-y-2">
                  {atividades.map((atividade) => (
                    <Reorder.Item key={atividade.id} value={atividade} className="flex items-center justify-between bg-[#f8f4eb] border border-[#e8dcc6] rounded-2xl px-4 py-3 text-sm group">
                      <div className="flex items-center gap-3">
                        <span>{TIPO_CONFIG[atividade.tipo || 'Casa']?.icone}</span>
                        <div>
                          <div className="font-medium tracking-[-0.3px]">{atividade.nome}</div>
                          <div className="text-[10px] text-[#8b5e3c]">{atividade.horario} • {atividade.duracao}min</div>
                        </div>
                      </div>
                      <button onClick={() => removerAtividade(atividade.id)} className="opacity-0 group-hover:opacity-100 text-red-500 text-xs">remover</button>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              )}
            </div>
          </div>
        </div>

        {/* Barra de Progresso */}
        <div className="mt-10 max-w-md mx-auto">
          <div className="flex justify-between text-xs text-[#8b5e3c] mb-2 px-1">
            <div>Progresso do dia</div>
            <div>{progresso}%</div>
          </div>
          <div className="h-1.5 bg-[#e8dcc6] rounded-full overflow-hidden">
            <div className="h-full bg-[#b89a6f] transition-all" style={{ width: `${progresso}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
