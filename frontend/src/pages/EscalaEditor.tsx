import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Search, RotateCw } from 'lucide-react';
import { useState } from 'react';
import { Reorder, motion } from 'framer-motion';

interface Atividade {
  id: number;
  nome: string;
  duracao: number;
  horario?: string;
  categoria: string;
}

interface Escala {
  id: number;
  nome: string;
  dias: string[];
}

const CATEGORIAS = [
  { nome: 'Saúde', cor: '#3b82f6', icone: '🧘' },
  { nome: 'Estudos', cor: '#8b5cf6', icone: '📚' },
  { nome: 'Fé', cor: '#6366f1', icone: '🙏' },
  { nome: 'Casa', cor: '#10b981', icone: '🏠' },
  { nome: 'Lazer', cor: '#f59e0b', icone: '🎨' },
  { nome: 'Trabalho', cor: '#ef4444', icone: '💼' },
  { nome: 'Amigos', cor: '#ec4899', icone: '👥' },
  { nome: 'Família', cor: '#14b8a6', icone: '👨‍👩‍👧' },
];

const ATIVIDADES_POR_CATEGORIA: Record<string, Omit<Atividade, 'id' | 'horario'>[]> = {
  Saúde: [
    { nome: 'Academia', duracao: 60, categoria: 'Saúde' },
    { nome: 'Alongamento matinal', duracao: 15, categoria: 'Saúde' },
    { nome: 'Meditação', duracao: 20, categoria: 'Saúde' },
    { nome: 'Caminhada', duracao: 30, categoria: 'Saúde' },
  ],
  Estudos: [
    { nome: 'Estudar inglês', duracao: 45, categoria: 'Estudos' },
    { nome: 'Ler 30 páginas', duracao: 40, categoria: 'Estudos' },
    { nome: 'Revisar anotações', duracao: 25, categoria: 'Estudos' },
  ],
  Fé: [
    { nome: 'Oração', duracao: 15, categoria: 'Fé' },
    { nome: 'Leitura bíblica', duracao: 20, categoria: 'Fé' },
  ],
  Casa: [
    { nome: 'Arrumar a cozinha', duracao: 20, categoria: 'Casa' },
    { nome: 'Lavar roupa', duracao: 30, categoria: 'Casa' },
    { nome: 'Organizar armário', duracao: 25, categoria: 'Casa' },
  ],
  Lazer: [
    { nome: 'Assistir série', duracao: 60, categoria: 'Lazer' },
    { nome: 'Jogar', duracao: 45, categoria: 'Lazer' },
    { nome: 'Passear no parque', duracao: 40, categoria: 'Lazer' },
  ],
  Trabalho: [
    { nome: 'Reunião equipe', duracao: 50, categoria: 'Trabalho' },
    { nome: 'Responder e-mails', duracao: 30, categoria: 'Trabalho' },
  ],
  Amigos: [
    { nome: 'Café com amigos', duracao: 90, categoria: 'Amigos' },
    { nome: 'Chamada de vídeo', duracao: 30, categoria: 'Amigos' },
  ],
  Família: [
    { nome: 'Jantar em família', duracao: 60, categoria: 'Família' },
    { nome: 'Brincar com as crianças', duracao: 40, categoria: 'Família' },
    { nome: 'Filme em casa', duracao: 120, categoria: 'Família' },
  ],
};

function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

function recalcularHorarios(lista: Atividade[]): Atividade[] {
  let minutos = 6 * 60;
  return lista.map((a) => {
    const horario = formatTime(minutos);
    minutos += a.duracao;
    return { ...a, horario };
  });
}

export default function EscalaEditor() {
  const { id } = useParams();
  const [escala] = useState<Escala>({ id: Number(id), nome: `Escala #${id}`, dias: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'] });

  const [atividades, setAtividades] = useState<Atividade[]>(() =>
    recalcularHorarios([
      { id: 1, nome: 'Academia', duracao: 60, categoria: 'Saúde', horario: '06:00' },
      { id: 2, nome: 'Café da manhã', duracao: 25, categoria: 'Casa', horario: '07:00' },
    ])
  );

  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Saúde');
  const [busca, setBusca] = useState('');
  const [rotacao, setRotacao] = useState(0);

  const categoriasFiltradas = CATEGORIAS.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const atividadesDaCategoria = ATIVIDADES_POR_CATEGORIA[categoriaSelecionada] || [];
  const atividadesFiltradas = atividadesDaCategoria.filter((a) =>
    a.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleReorder = (novaOrdem: Atividade[]) => {
    setAtividades(recalcularHorarios(novaOrdem));
  };

  const adicionarDaEspiral = (atividadeBase: Omit<Atividade, 'id' | 'horario'>) => {
    const nova: Atividade = {
      id: Date.now(),
      ...atividadeBase,
    };
    setAtividades((prev) => recalcularHorarios([...prev, nova]));
  };

  const girarEspiral = (direcao: number) => {
    setRotacao((prev) => prev + direcao * 45);
  };

  const totalMinutos = atividades.reduce((s, a) => s + a.duracao, 0);
  const totalHoras = Math.floor(totalMinutos / 60);
  const minsRestantes = totalMinutos % 60;

  return (
    <div className="min-h-screen bg-[#f8f4eb] text-[#2c2118] font-light">
      {/* Navbar Premium */}
      <nav className="border-b border-[#e8dcc6] bg-[#f8f4eb]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2 text-[#6f5e4f] hover:text-[#2c2118]">
              <ArrowLeft className="w-4 h-4" /> Voltar
            </Link>
            <div className="w-px h-6 bg-[#e8dcc6]" />
            <div>
              <div className="font-serif text-2xl tracking-[-1px]">{escala.nome}</div>
              <div className="text-xs text-[#8b5e3c] tracking-[2px]">{escala.dias.join(' • ')}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 border border-[#e8dcc6] rounded-2xl text-sm tracking-[2px] hover:bg-white transition">
              <Download className="w-4 h-4" /> Exportar PDF
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="font-serif text-6xl tracking-[-3px]">Organize sua semana</h1>
            <p className="text-[#6f5e4f] mt-2 text-lg">Arraste, gire e descubra o que realmente importa</p>
          </div>
          <div className="text-right">
            <div className="font-serif text-5xl tracking-tighter text-[#2c2118]">{totalHoras}h {minsRestantes > 0 && `${minsRestantes}min`}</div>
            <div className="text-xs text-[#8b5e3c] tracking-[3px] mt-1">DURAÇÃO TOTAL</div>
          </div>
        </div>

        {/* Busca */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-5 top-4 text-[#b89a6f]" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Busque por categoria ou atividade..."
            className="w-full pl-12 pr-6 py-3.5 bg-white border border-[#e8dcc6] rounded-2xl text-sm focus:outline-none focus:border-[#b89a6f] placeholder:text-[#9c8a6e]"
          />
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar Categorias */}
          <div className="col-span-12 md:col-span-3">
            <div className="sticky top-24">
              <div className="text-xs tracking-[3px] text-[#8b5e3c] mb-4 px-1">CATEGORIAS</div>
              <div className="space-y-1">
                {CATEGORIAS.map((cat) => {
                  const isActive = categoriaSelecionada === cat.nome;
                  const isFiltered = categoriasFiltradas.some((c) => c.nome === cat.nome);
                  if (!isFiltered && busca) return null;

                  return (
                    <button
                      key={cat.nome}
                      onClick={() => {
                        setCategoriaSelecionada(cat.nome);
                        setBusca('');
                      }}
                      className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all text-left ${
                        isActive
                          ? 'bg-[#2c2118] text-white shadow'
                          : 'hover:bg-white border border-transparent hover:border-[#e8dcc6]'
                      }`}
                    >
                      <span className="text-2xl">{cat.icone}</span>
                      <span className="font-medium tracking-[-0.3px]">{cat.nome}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Espiral Central */}
          <div className="col-span-12 md:col-span-6 flex flex-col items-center">
            <div className="relative w-[380px] h-[380px] flex items-center justify-center mb-6">
              <motion.div
                className="w-[320px] h-[320px] rounded-full border-[14px] border-[#e8dcc6] relative flex items-center justify-center"
                animate={{ rotate: rotacao }}
                transition={{ type: 'spring', stiffness: 60, damping: 20 }}
              >
                <div className="w-[220px] h-[220px] rounded-full border-[10px] border-[#d4c3a3]" />
                <div className="w-[120px] h-[120px] rounded-full border-[8px] border-[#b89a6f]" />
              </motion.div>

              {/* Atividades na Espiral */}
              <div className="absolute inset-0 flex items-center justify-center">
                {atividadesFiltradas.map((ativ, index) => {
                  const angle = (index * (360 / Math.max(atividadesFiltradas.length, 3))) + rotacao;
                  return (
                    <motion.button
                      key={index}
                      onClick={() => adicionarDaEspiral(ativ)}
                      className="absolute px-5 py-2 bg-white border border-[#e8dcc6] rounded-2xl shadow-sm text-sm hover:shadow-md active:scale-95 transition"
                      style={{
                        transform: `rotate(${angle}deg) translateY(-130px) rotate(${-angle}deg)`,
                      }}
                    >
                      {ativ.nome}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => girarEspiral(-1)} className="flex items-center gap-2 px-5 py-2 border border-[#e8dcc6] rounded-2xl text-sm hover:bg-white">
                <RotateCw className="w-4 h-4 rotate-180" /> Girar
              </button>
              <button onClick={() => girarEspiral(1)} className="flex items-center gap-2 px-5 py-2 border border-[#e8dcc6] rounded-2xl text-sm hover:bg-white">
                Girar <RotateCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Painel Direito */}
          <div className="col-span-12 md:col-span-3">
            <div className="text-xs tracking-[3px] text-[#8b5e3c] mb-4">ATIVIDADES NA CATEGORIA</div>
            <div className="space-y-2">
              {atividadesFiltradas.length > 0 ? (
                atividadesFiltradas.map((ativ, idx) => (
                  <button
                    key={idx}
                    onClick={() => adicionarDaEspiral(ativ)}
                    className="w-full text-left px-5 py-3 bg-white border border-[#e8dcc6] rounded-2xl hover:border-[#b89a6f] transition flex justify-between items-center text-sm"
                  >
                    <span>{ativ.nome}</span>
                    <span className="text-[#8b5e3c]">{ativ.duracao} min</span>
                  </button>
                ))
              ) : (
                <div className="text-[#8b5e3c] text-sm px-2">Nenhuma atividade encontrada.</div>
              )}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4 px-1">
            <div>
              <div className="font-serif text-3xl tracking-[-1px]">Sua Timeline</div>
              <div className="text-sm text-[#8b5e3c]">Arraste para reorganizar</div>
            </div>
            <button onClick={() => setAtividades([])} className="text-xs tracking-[2px] text-red-600/70 hover:text-red-600">Limpar tudo</button>
          </div>

          <div className="border border-[#e8dcc6] bg-white rounded-3xl p-8 min-h-[220px]">
            {atividades.length === 0 ? (
              <div className="h-40 flex items-center justify-center text-[#8b5e3c]">Comece adicionando atividades da espiral ou categorias</div>
            ) : (
              <Reorder.Group axis="y" values={atividades} onReorder={handleReorder} className="space-y-3">
                {atividades.map((atividade) => {
                  const cat = CATEGORIAS.find((c) => c.nome === atividade.categoria);
                  return (
                    <Reorder.Item key={atividade.id} value={atividade} className="flex items-center gap-5 border border-[#e8dcc6] rounded-2xl px-6 py-4 bg-white cursor-grab active:cursor-grabbing">
                      <div className="text-2xl w-8">{cat?.icone}</div>
                      <div className="flex-1 font-medium tracking-[-0.2px]">{atividade.nome}</div>
                      <div className="font-mono text-[#6f5e4f] w-16 text-right">{atividade.horario}</div>
                      <div className="text-sm text-[#8b5e3c] w-20 text-right">{atividade.duracao} min</div>
                    </Reorder.Item>
                  );
                })}
              </Reorder.Group>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
