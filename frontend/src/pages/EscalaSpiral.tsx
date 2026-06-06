import { useState } from 'react';
import { Check, Clock, ArrowRight } from 'lucide-react';
import type { AtividadeBase } from '../data/atividades';
import { atividades } from '../data/atividades';

interface AtividadeSelecionada extends AtividadeBase {
  dias: string[];
}

const CATEGORIAS = [
  { nome: 'Saúde', cor: '#e07a5f', icon: '❤️', descricao: 'Corpo e mente' },
  { nome: 'Estudos', cor: '#81b29a', icon: '📚', descricao: 'Conhecimento' },
  { nome: 'Fé', cor: '#b08968', icon: '🙏', descricao: 'Espiritualidade' },
  { nome: 'Casa', cor: '#6d6875', icon: '🏠', descricao: 'Lar e organização' },
  { nome: 'Lazer', cor: '#e9c46a', icon: '🎨', descricao: 'Descanso e hobbies' },
  { nome: 'Trabalho', cor: '#457b9d', icon: '💼', descricao: 'Produtividade' },
  { nome: 'Amigos', cor: '#f4a261', icon: '👥', descricao: 'Conexões' },
  { nome: 'Família', cor: '#2a9d8f', icon: '👨‍👩‍👧', descricao: 'Vínculos' },
];

const DIAS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

const getCorCategoria = (categoria: string) => {
  return CATEGORIAS.find(c => c.nome === categoria)?.cor || '#b89a6f';
};

// Atualizado: 06/06 00:15
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

  const categoriaInfo = CATEGORIAS.find(c => c.nome === categoriaSelecionada);

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-[#1f1810]">
      {/* Header */}
      <div className="border-b border-[#e8dcc6] bg-[#f8f5f0]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-8 py-6 flex items-center justify-between">
          <div>
            <div className="font-serif text-3xl tracking-[-1.5px]">Escolha sua rotina</div>
            <div className="text-sm text-[#8b7a65] mt-1">Selecione as atividades que fazem parte do seu dia</div>
          </div>
          <div className="px-4 py-2 bg-white rounded-2xl border border-[#e8dcc6] text-sm">
            {atividadesSelecionadas.length} atividades selecionadas
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* === CAROUSEL ESQUERDO: CATEGORIAS === */}
          <div className="lg:col-span-5">
            <div className="mb-4 flex items-center justify-between px-2">
              <div className="text-sm font-medium tracking-[0.5px] text-[#8b7a65] uppercase">Categorias</div>
              {categoriaSelecionada && (
                <button 
                  onClick={() => setCategoriaSelecionada(null)}
                  className="text-xs text-[#8b7a65] hover:text-[#1f1810] flex items-center gap-1"
                >
                  Limpar filtro <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="space-y-3 max-h-[680px] overflow-y-auto pr-3 custom-scroll">
              {CATEGORIAS.map((cat, index) => {
                const isActive = categoriaSelecionada === cat.nome;
                const count = atividades.filter(a => a.categoria === cat.nome).length;

                return (
                  <button
                    key={index}
                    onClick={() => setCategoriaSelecionada(cat.nome)}
                    className={`
                      w-full group relative overflow-hidden rounded-3xl border p-6 text-left transition-all duration-200 flex items-center gap-5
                      ${isActive 
                        ? 'bg-white border-[#1f1810] shadow-xl scale-[1.015]' 
                        : 'bg-white/80 border-transparent hover:border-[#e8dcc6] hover:bg-white hover:shadow-md'
                      }
                    `}
                  >
                    {/* Barra lateral colorida */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-3xl"
                      style={{ backgroundColor: cat.cor }}
                    />

                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
                      style={{ backgroundColor: cat.cor + '15' }}
                    >
                      {cat.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-2xl tracking-[-0.8px]">{cat.nome}</div>
                      <div className="text-sm text-[#8b7a65] mt-0.5">{cat.descricao}</div>
                      <div className="mt-3 text-xs text-[#8b7a65]">{count} atividades</div>
                    </div>

                    {isActive && (
                      <div className="px-4 py-1.5 rounded-2xl bg-[#1f1810] text-white text-xs font-medium flex items-center gap-2">
                        Selecionado <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* === CAROUSEL DIREITO: ATIVIDADES === */}
          <div className="lg:col-span-7">
            <div className="mb-4 px-2 flex items-end justify-between">
              <div>
                <div className="text-sm font-medium tracking-[0.5px] text-[#8b7a65] uppercase">Atividades</div>
                <div className="text-3xl tracking-[-1px] font-medium mt-1">
                  {categoriaSelecionada ? categoriaSelecionada : 'Todas as categorias'}
                </div>
              </div>
              {categoriaInfo && (
                <div className="text-right">
                  <div className="text-xs text-[#8b7a65]">Categoria selecionada</div>
                  <div className="font-medium" style={{ color: categoriaInfo.cor }}>{categoriaInfo.nome}</div>
                </div>
              )}
            </div>

            <div className="max-h-[680px] overflow-y-auto pr-3 custom-scroll space-y-4">
              {atividadesFiltradas.length > 0 ? (
                atividadesFiltradas.map((atividade) => {
                  const selecionada = estaSelecionada(atividade.id);
                  const cor = getCorCategoria(atividade.categoria);

                  return (
                    <div
                      key={atividade.id}
                      onClick={() => toggleAtividade(atividade)}
                      className={`
                        group relative cursor-pointer rounded-3xl border p-7 transition-all duration-200 flex gap-6
                        ${selecionada 
                          ? 'bg-white border-[#1f1810] shadow-xl' 
                          : 'bg-white/70 border-transparent hover:border-[#e8dcc6] hover:bg-white hover:shadow-md'
                        }
                      `}
                    >
                      {/* Barra lateral colorida forte */}
                      <div 
                        className="w-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: cor }}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div 
                            className="px-4 py-1 rounded-full text-xs font-medium tracking-wider"
                            style={{ backgroundColor: cor + '15', color: cor }}
                          >
                            {atividade.categoria}
                          </div>
                          {atividade.duracao && (
                            <div className="flex items-center gap-1.5 text-xs text-[#8b7a65]">
                              <Clock className="w-3.5 h-3.5" />
                              {atividade.duracao} min
                            </div>
                          )}
                        </div>

                        <div className="font-medium text-2xl tracking-[-0.6px] pr-4">
                          {atividade.nome}
                        </div>
                      </div>

                      {/* Checkbox visual */}
                      <div className={`
                        mt-1 w-9 h-9 rounded-2xl border-2 flex items-center justify-center flex-shrink-0 transition-all
                        ${selecionada 
                          ? 'bg-[#1f1810] border-[#1f1810]' 
                          : 'border-[#d4c9b3] group-hover:border-[#b89a6f]'
                        }
                      `}>
                        {selecionada && <Check className="w-5 h-5 text-white" />}
                      </div>

                      {/* Dias da semana (aparece quando selecionado) */}
                      {selecionada && (
                        <div className="absolute bottom-0 left-0 right-0 px-7 pb-6 pt-4 border-t border-[#f0e9dc] mt-4 flex gap-2 flex-wrap">
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
                                  px-5 py-1.5 text-xs rounded-2xl border font-medium transition-all
                                  ${diaSelecionado 
                                    ? 'bg-[#1f1810] text-white border-[#1f1810]' 
                                    : 'border-[#d4c9b3] hover:border-[#b89a6f] text-[#5c5245]'
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
                  Nenhuma atividade nesta categoria.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Barra inferior fixa */}
      {atividadesSelecionadas.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8dcc6] py-5 z-50">
          <div className="max-w-screen-2xl mx-auto px-8 flex items-center justify-between">
            <div>
              <div className="text-sm text-[#8b7a65]">Sua rotina está tomando forma</div>
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
