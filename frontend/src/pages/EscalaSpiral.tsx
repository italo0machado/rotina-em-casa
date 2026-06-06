import { Check, Clock } from 'lucide-react';
import { useState } from 'react';
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

// Atualizado: 06/06 02:45
export default function EscalaSpiral() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
  const [atividadesSelecionadas, setAtividadesSelecionadas] = useState<AtividadeSelecionada[]>([]);

  const atividadesFiltradas = atividades.filter((atividade) => {
    const matchCategoria = !categoriaSelecionada || atividade.categoria === categoriaSelecionada;
    return matchCategoria;
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

  const estaSelecionada = (id: number) => {
    return atividadesSelecionadas.some(a => a.id === id);
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-[#1f1810]">
      {/* Header */}
      <div className="border-b border-[#e8dcc6] bg-[#f8f5f0]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-8 py-6 flex items-center justify-between">
          <div>
            <div className="font-serif text-3xl tracking-[-1.5px]">Escolha sua rotina</div>
            <div className="text-sm text-[#8b7a65] mt-1">Categorias à esquerda • Atividades à direita</div>
          </div>
          <div className="px-5 py-2 bg-white rounded-2xl border border-[#e8dcc6] text-sm">
            {atividadesSelecionadas.length} selecionadas
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* CATEGORIAS - Carousel Menor (Esquerda) */}
          <div className="lg:col-span-4">
            <div className="mb-4 px-2">
              <div className="text-sm font-medium tracking-[0.5px] text-[#8b7a65] uppercase">Categorias</div>
            </div>

            <div className="space-y-3 max-h-[620px] overflow-y-auto pr-2 custom-scroll snap-y snap-mandatory">
              {CATEGORIAS.map((cat, index) => {
                const isActive = categoriaSelecionada === cat.nome;
                const count = atividades.filter(a => a.categoria === cat.nome).length;

                return (
                  <button
                    key={index}
                    onClick={() => setCategoriaSelecionada(cat.nome)}
                    className={`
                      w-full snap-start group relative overflow-hidden rounded-3xl border p-6 text-left transition-all active:scale-[0.985]
                      ${isActive 
                        ? 'bg-white border-[#1f1810] shadow-xl' 
                        : 'bg-white/70 border-transparent active:bg-white'
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: cat.cor }}
                      />
                      <div className="font-medium text-2xl tracking-[-0.6px]">{cat.nome}</div>
                    </div>
                    <div className="text-sm text-[#8b7a65] mt-1 ml-7">{count} atividades</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ATIVIDADES - Carousel Maior (Direita) */}
          <div className="lg:col-span-8">
            <div className="mb-4 px-2 flex items-end justify-between">
              <div>
                <div className="text-sm font-medium tracking-[0.5px] text-[#8b7a65] uppercase">Atividades</div>
                <div className="text-3xl tracking-[-1px] font-medium mt-1">
                  {categoriaSelecionada || 'Todas as categorias'}
                </div>
              </div>
            </div>

            <div className="max-h-[620px] overflow-y-auto pr-2 custom-scroll snap-y snap-mandatory space-y-4">
              {atividadesFiltradas.length > 0 ? (
                atividadesFiltradas.map((atividade) => {
                  const selecionada = estaSelecionada(atividade.id);
                  const cor = getCorCategoria(atividade.categoria);

                  return (
                    <div
                      key={atividade.id}
                      onClick={() => toggleAtividade(atividade)}
                      className={`
                        snap-start group relative cursor-pointer rounded-3xl border p-8 transition-all active:scale-[0.985]
                        ${selecionada 
                          ? 'bg-white border-[#1f1810] shadow-xl' 
                          : 'bg-white/70 border-transparent active:bg-white'
                        }
                      `}
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <div 
                              className="px-4 py-1 rounded-full text-xs font-medium"
                              style={{ backgroundColor: cor + '15', color: cor }}
                            >
                              {atividade.categoria}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-[#8b7a65]">
                              <Clock className="w-3.5 h-3.5" /> {atividade.duracao} min
                            </div>
                          </div>

                          <div className="font-medium text-3xl tracking-[-0.8px] pr-4 leading-tight">
                            {atividade.nome}
                          </div>
                        </div>

                        <div className={`
                          mt-2 w-9 h-9 rounded-2xl border-2 flex items-center justify-center flex-shrink-0 transition-all
                          ${selecionada 
                            ? 'bg-[#1f1810] border-[#1f1810]' 
                            : 'border-[#d4c9b3]'
                          }
                        `}>
                          {selecionada && <Check className="w-5 h-5 text-white" />}
                        </div>
                      </div>

                      {/* Dias da semana */}
                      {selecionada && (
                        <div className="mt-6 pt-6 border-t border-[#f0e9dc] flex flex-wrap gap-2">
                          {DIAS.map(dia => {
                            const diaSelecionado = atividadesSelecionadas
                              .find(a => a.id === atividade.id)
                              ?.dias.includes(dia);
                            
                            return (
                              <button
                                key={dia}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleDiaNaAtividade(atividade.id, dia);
                                }}
                                className={`
                                  px-6 py-2 text-sm rounded-2xl border font-medium transition-all active:scale-95
                                  ${diaSelecionado 
                                    ? 'bg-[#1f1810] text-white border-[#1f1810]' 
                                    : 'border-[#d4c9b3] text-[#5c5245]'
                                  }
                                `}
                              >
                                {dia}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="h-64 flex items-center justify-center text-[#8b7a65]">
                  Nenhuma atividade encontrada.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      {atividadesSelecionadas.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8dcc6] py-5 z-50">
          <div className="max-w-screen-2xl mx-auto px-8 flex items-center justify-between">
            <div>
              <div className="text-sm text-[#8b7a65]">Sua rotina</div>
              <div className="font-medium">{atividadesSelecionadas.length} atividades selecionadas</div>
            </div>
            <button 
              onClick={() => alert('Funcionalidade de salvar em desenvolvimento')}
              className="px-10 py-4 bg-[#1f1810] hover:bg-black transition-colors text-white rounded-2xl font-medium text-sm tracking-wider"
            >
              SALVAR MINHA ROTINA
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
