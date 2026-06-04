import { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Search, Heart, BookOpen, Church, Home, Gamepad2, Briefcase, Users, Users2 } from 'lucide-react';
import { atividades } from '../data/atividades';

interface AtividadeSelecionada {
  id: number;
  nome: string;
  categoria: string;
  dias: string[];
}

const CATEGORIAS = [
  { nome: 'Saúde', icone: Heart },
  { nome: 'Estudos', icone: BookOpen },
  { nome: 'Fé', icone: Church },
  { nome: 'Casa', icone: Home },
  { nome: 'Lazer', icone: Gamepad2 },
  { nome: 'Trabalho', icone: Briefcase },
  { nome: 'Amigos', icone: Users },
  { nome: 'Família', icone: Users2 },
];

const DIAS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

export default function EscalaSpiral() {
  const [search, setSearch] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
  const [atividadesSelecionadas, setAtividadesSelecionadas] = useState<AtividadeSelecionada[]>([]);
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);

  const rotation = useMotionValue(0);
  const springRotation = useSpring(rotation, { stiffness: 60, damping: 18, mass: 0.8 });

  const atividadesFiltradas = atividades.filter((atividade) => {
    const matchSearch = atividade.nome.toLowerCase().includes(search.toLowerCase());
    const matchCategoria = !categoriaSelecionada || atividade.categoria === categoriaSelecionada;
    return matchSearch && matchCategoria;
  });

  const adicionarAtividade = (atividade: any) => {
    const jaExiste = atividadesSelecionadas.some((a) => a.id === atividade.id);
    if (!jaExiste) {
      setAtividadesSelecionadas([...atividadesSelecionadas, { ...atividade, dias: [] }]);
    }
  };

  const toggleDia = (dia: string) => {
    if (diasSelecionados.includes(dia)) {
      setDiasSelecionados(diasSelecionados.filter((d) => d !== dia));
    } else {
      setDiasSelecionados([...diasSelecionados, dia]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7fc] text-[#1f1a2e]">
      {/* Busca */}
      <div className="border-b border-[#e2def0] bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-8 py-6">
          <div className="relative">
            <Search className="absolute left-6 top-4 text-[#a5a1b8]" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar atividade..."
              className="w-full pl-14 pr-6 py-4 bg-white rounded-3xl border border-[#e2def0] text-lg placeholder:text-[#a5a1b8] focus:outline-none focus:border-[#b8a9e0]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-12 gap-8">
          {/* Categorias */}
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-24 space-y-1">
              {CATEGORIAS.map((cat) => {
                const Icon = cat.icone;
                return (
                  <button
                    key={cat.nome}
                    onClick={() => setCategoriaSelecionada(categoriaSelecionada === cat.nome ? null : cat.nome)}
                    className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-left transition-all ${
                      categoriaSelecionada === cat.nome
                        ? 'bg-[#1f1a2e] text-white'
                        : 'hover:bg-white border border-transparent hover:border-[#e2def0]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{cat.nome}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Espiral */}
          <div className="col-span-12 lg:col-span-6 flex flex-col items-center">
            <div className="relative w-[520px] h-[520px] flex items-center justify-center mb-8">
              <motion.div
                drag="x"
                dragMomentum={false}
                onDrag={(_, info) => {
                  rotation.set(rotation.get() + info.delta.x * 0.6);
                }}
                style={{ rotate: springRotation }}
                className="relative w-[420px] h-[420px] cursor-grab active:cursor-grabbing"
              >
                {atividadesFiltradas.map((atividade, index) => {
                  const total = atividadesFiltradas.length;
                  const angle = (index / total) * 360;
                  const radius = 175 + (index % 3) * 26;

                  return (
                    <button
                      key={atividade.id}
                      onClick={() => adicionarAtividade(atividade)}
                      className="absolute px-6 py-3 bg-white border border-[#e2def0] rounded-2xl text-sm shadow-sm hover:border-[#b8a9e0] active:scale-[0.985] transition-all"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`,
                      }}
                    >
                      {atividade.nome}
                    </button>
                  );
                })}
              </motion.div>
            </div>
            <p className="text-sm text-[#6b6680]">Arraste para girar • Clique nas atividades para selecionar</p>
          </div>

          {/* Atividades Selecionadas */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white border border-[#e2def0] rounded-3xl p-6">
              <h3 className="font-semibold mb-4">Atividades selecionadas</h3>
              {atividadesSelecionadas.length > 0 ? (
                <div className="space-y-2 max-h-[420px] overflow-y-auto">
                  {atividadesSelecionadas.map((atividade) => (
                    <div key={atividade.id} className="px-4 py-3 bg-[#f8f7fc] rounded-2xl text-sm">
                      {atividade.nome}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#6b6680]">Nenhuma atividade selecionada</p>
              )}
            </div>
          </div>
        </div>

        {/* Dias da Semana */}
        <div className="mt-12">
          <h3 className="text-center text-sm tracking-[3px] text-[#6b6680] mb-5">ATRIBUIR AOS DIAS DA SEMANA</h3>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4 max-w-5xl mx-auto">
            {DIAS.map((dia) => (
              <button
                key={dia}
                onClick={() => toggleDia(dia)}
                className={`py-4 rounded-2xl border text-sm font-medium transition-all ${
                  diasSelecionados.includes(dia)
                    ? 'bg-[#1f1a2e] text-white border-[#1f1a2e]'
                    : 'bg-white border-[#e2def0] hover:border-[#b8a9e0]'
                }`}
              >
                {dia}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
