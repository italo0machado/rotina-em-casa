import { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { X } from 'lucide-react';
import type { AtividadeBase } from '../data/atividades';
import { atividades } from '../data/atividades';

interface AtividadeSelecionada extends AtividadeBase {
  dias: string[];
}

const CATEGORIAS = [
  { nome: 'Saúde', cor: '#e07a5f' },
  { nome: 'Estudos', cor: '#81b29a' },
  { nome: 'Fé', cor: '#b08968' },
  { nome: 'Casa', cor: '#6d6875' },
  { nome: 'Lazer', cor: '#e9c46a' },
  { nome: 'Trabalho', cor: '#457b9d' },
  { nome: 'Amigos', cor: '#f4a261' },
  { nome: 'Família', cor: '#2a9d8f' },
];

const DIAS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

const getCorCategoria = (categoria: string) => {
  return CATEGORIAS.find(c => c.nome === categoria)?.cor || '#b89a6f';
};

// Atualizado: 05/06 21:18
export default function EscalaSpiral() {
  const [search, setSearch] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
  const [atividadesSelecionadas, setAtividadesSelecionadas] = useState<AtividadeSelecionada[]>([]);

  const rotation = useMotionValue(0);
  const springRotation = useSpring(rotation, { stiffness: 80, damping: 20, mass: 0.7 });

  const atividadesFiltradas = atividades.filter((atividade) => {
    const matchSearch = atividade.nome.toLowerCase().includes(search.toLowerCase());
    const matchCategoria = !categoriaSelecionada || atividade.categoria === categoriaSelecionada;
    return matchSearch && matchCategoria;
  });

  const toggleAtividade = (atividade: AtividadeBase) => {
    const jaExiste = atividadesSelecionadas.some(a => a.id === atividade.id);
    
    if (jaExiste) {
      setAtividadesSelecionadas(prev => prev.filter(a => a.id !== atividade.id));
    } else {
      setAtividadesSelecionadas(prev => [...prev, { ...atividade, dias: [] }]);
    }
  };

  const toggleDiaNaAtividade = (atividadeId: number, dia: string) => {
    setAtividadesSelecionadas(prev =>
      prev.map(atividade => {
        if (atividade.id === atividadeId) {
          const novosDias = atividade.dias.includes(dia)
            ? atividade.dias.filter(d => d !== dia)
            : [...atividade.dias, dia];
          return { ...atividade, dias: novosDias };
        }
        return atividade;
      })
    );
  };

  const removerAtividade = (id: number) => {
    setAtividadesSelecionadas(prev => prev.filter(a => a.id !== id));
  };

  const estaSelecionada = (id: number) => {
    return atividadesSelecionadas.some(a => a.id === id);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1f1810]">
      {/* Header */}
      <div className="border-b border-[#e8dcc6] bg-[#faf7f2]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="font-serif text-2xl tracking-[-1px]">Espiral</div>
            <div className="text-sm text-[#8b7a65]">Arraste para girar • Clique para selecionar</div>
          </div>
          <div className="text-sm text-[#8b7a65]">
            {atividadesSelecionadas.length} selecionadas
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Categorias */}
          <div className="lg:col-span-3">
            <div className="sticky top-24 space-y-1">
              <button
                onClick={() => setCategoriaSelecionada(null)}
                className={`w-full text-left px-5 py-3 rounded-2xl text-sm transition-all ${
                  !categoriaSelecionada ? 'bg-[#1f1810] text-white' : 'hover:bg-white border border-transparent hover:border-[#e8dcc6]'
                }`}
              >
                Todas as categorias
              </button>
              {CATEGORIAS.map((cat) => (
                <button
                  key={cat.nome}
                  onClick={() => setCategoriaSelecionada(categoriaSelecionada === cat.nome ? null : cat.nome)}
                  className={`w-full flex items-center gap-3 px-5 py-3 rounded-2xl text-sm transition-all ${
                    categoriaSelecionada === cat.nome 
                      ? 'bg-[#1f1810] text-white' 
                      : 'hover:bg-white border border-transparent hover:border-[#e8dcc6]'
                  }`}
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.cor }} />
                  {cat.nome}
                </button>
              ))}
            </div>
          </div>

          {/* Espiral */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-[520px] h-[520px] flex items-center justify-center mb-6">
              <motion.div
                drag="x"
                dragMomentum={false}
                onDrag={(_, info) => {
                  rotation.set(rotation.get() + info.delta.x * 0.8);
                }}
                style={{ rotate: springRotation }}
                className="relative w-[440px] h-[440px] cursor-grab active:cursor-grabbing"
              >
                {atividadesFiltradas.slice(0, 60).map((atividade, index) => {
                  const total = Math.min(atividadesFiltradas.length, 60);
                  const angle = (index / total) * 360;
                  const radius = 170 + (index % 4) * 18;
                  const selecionada = estaSelecionada(atividade.id);
                  const cor = getCorCategoria(atividade.categoria);

                  return (
                    <button
                      key={atividade.id}
                      onClick={() => toggleAtividade(atividade)}
                      className={`absolute px-4 py-1.5 text-xs rounded-full border transition-all flex items-center gap-2 ${
                        selecionada 
                          ? 'bg-[#1f1810] text-white border-[#1f1810] scale-105' 
                          : 'bg-white border-[#e8dcc6] hover:border-[#b89a6f]'
                      }`}
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`,
                      }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: selecionada ? '#fff' : cor }}
                      />
                      <span className="whitespace-nowrap">{atividade.nome}</span>
                    </button>
                  );
                })}
              </motion.div>
            </div>

            <div className="text-center text-sm text-[#8b7a65]">
              Arraste horizontalmente para girar • Clique nas atividades para adicionar/remover
            </div>
          </div>

          {/* Atividades Selecionadas */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-[#e8dcc6] rounded-3xl p-6 sticky top-24">
              <h3 className="font-medium mb-4 text-sm tracking-[1px]">SELECIONADAS ({atividadesSelecionadas.length})</h3>
              
              {atividadesSelecionadas.length > 0 ? (
                <div className="space-y-3 max-h-[420px] overflow-auto pr-2">
                  {atividadesSelecionadas.map((atividade) => (
                    <div key={atividade.id} className="bg-[#faf7f2] rounded-2xl p-4 text-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-medium">{atividade.nome}</div>
                        <button onClick={() => removerAtividade(atividade.id)} className="text-[#8b7a65] hover:text-red-500">
                          <X size={14} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {DIAS.map(dia => (
                          <button
                            key={dia}
                            onClick={() => toggleDiaNaAtividade(atividade.id, dia)}
                            className={`px-3 py-1 text-xs rounded-full border transition-all ${
                              atividade.dias.includes(dia)
                                ? 'bg-[#1f1810] text-white border-[#1f1810]'
                                : 'bg-white border-[#e8dcc6] hover:border-[#b89a6f]'
                            }`}
                          >
                            {dia}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-[#8b7a65] py-8 text-center">
                  Clique nas atividades da espiral para começar
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
