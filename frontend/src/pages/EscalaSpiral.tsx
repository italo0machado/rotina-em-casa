import { useState } from 'react';
import { Check, Clock } from 'lucide-react';
import type { AtividadeBase } from '../data/atividades';
import { atividades } from '../data/atividades';

interface AtividadeSelecionada extends AtividadeBase {
  dias: string[];
}

const CATEGORIAS = [
  { nome: 'Saúde', cor: '#e07a5f', icon: '❤️' },
  { nome: 'Estudos', cor: '#81b29a', icon: '📚' },
  { nome: 'Fé', cor: '#b08968', icon: '🙏' },
  { nome: 'Casa', cor: '#6d6875', icon: '🏠' },
  { nome: 'Lazer', cor: '#e9c46a', icon: '🎨' },
  { nome: 'Trabalho', cor: '#457b9d', icon: '💼' },
  { nome: 'Amigos', cor: '#f4a261', icon: '👥' },
  { nome: 'Família', cor: '#2a9d8f', icon: '👨‍👩‍👧' },
];

const DIAS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

const getCorCategoria = (categoria: string) => {
  return CATEGORIAS.find(c => c.nome === categoria)?.cor || '#b89a6f';
};

// Atualizado: 05/06 22:45
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
    <div className="min-h-screen bg-[#faf7f2] text-[#1f1810]">
      {/* Header */}
      <div className="border-b border-[#e8dcc6] bg-[#faf7f2]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="font-serif text-2xl tracking-[-1px]">Rotina</div>
            <div className="text-sm text-[#8b7a65]">Escolha suas atividades</div>
          </div>
          <div className="text-sm text-[#8b7a65]">
            {atividadesSelecionadas.length} selecionadas
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Categorias - Carrossel Vertical Esquerdo */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="mb-4 px-1">
                <div className="text-sm font-medium text-[#8b7a65] mb-3">Categorias</div>
              </div>
              
              <div className="space-y-2 max-h-[620px] overflow-y-auto pr-2 custom-scroll">
                {CATEGORIAS.map((cat, index) => {
                  const isSelected = categoriaSelecionada === cat.nome;
                  return (
                    <button
                      key={index}
                      onClick={() => setCategoriaSelecionada(cat.nome)}
                      className={`
                        w-full group flex items-center gap-4 px-6 py-5 rounded-3xl border transition-all duration-200 text-left
                        ${isSelected 
                          ? 'bg-white border-[#1f1810] shadow-lg scale-[1.01]' 
                          : 'bg-white/60 border-transparent hover:border-[#e8dcc6] hover:bg-white hover:shadow-sm'
                        }
                      `}
                    >
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ backgroundColor: cat.cor + '20' }}
                      >
                        {cat.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-lg tracking-[-0.3px]">{cat.nome}</div>
                        <div className="text-sm text-[#8b7a65]">
                          {atividades.filter(a => a.categoria === cat.nome).length} atividades
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-[#1f1810] flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Atividades - Carrossel Vertical Direito */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-4 px-1">
              <div>
                <div className="text-sm font-medium text-[#8b7a65]">Atividades</div>
                <div className="text-xl font-medium tracking-[-0.4px]">
                  {categoriaSelecionada ? categoriaSelecionada : 'Todas as categorias'}
                </div>
              </div>
              {categoriaSelecionada && (
                <button 
                  onClick={() => setCategoriaSelecionada(null)}
                  className="text-sm text-[#8b7a65] hover:text-[#1f1810] transition-colors"
                >
                  Ver todas
                </button>
              )}
            </div>

            <div className="max-h-[620px] overflow-y-auto pr-2 custom-scroll space-y-3">
              {atividadesFiltradas.length > 0 ? (
                atividadesFiltradas.map((atividade) => {
                  const selecionada = estaSelecionada(atividade.id);
                  const cor = getCorCategoria(atividade.categoria);
                  
                  return (
                    <div
                      key={atividade.id}
                      onClick={() => toggleAtividade(atividade)}
                      className={`
                        group cursor-pointer border rounded-3xl p-6 transition-all duration-200
                        ${selecionada 
                          ? 'bg-white border-[#1f1810] shadow-md' 
                          : 'bg-white/70 border-transparent hover:border-[#e8dcc6] hover:bg-white hover:shadow-sm'
                        }
                      `}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div 
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{ 
                                backgroundColor: cor + '15', 
                                color: cor 
                              }}
                            >
                              {atividade.categoria}
                            </div>
                            {atividade.duracao && (
                              <div className="flex items-center gap-1 text-xs text-[#8b7a65]">
                                <Clock className="w-3 h-3" />
                                {atividade.duracao}
                              </div>
                            )}
                          </div>
                          
                          <div className="font-medium text-lg tracking-[-0.3px] mb-1 pr-8">
                            {atividade.nome}
                          </div>
                          
                          )}
                        </div>

                        <div className={`
                          mt-1 w-8 h-8 rounded-2xl border flex items-center justify-center flex-shrink-0 transition-all
                          ${selecionada 
                            ? 'bg-[#1f1810] border-[#1f1810]' 
                            : 'border-[#d4c9b3] group-hover:border-[#b89a6f]'
                          }
                        `}>
                          {selecionada && <Check className="w-4 h-4 text-white" />}
                        </div>
                      </div>

                      {/* Dias da semana */}
                      {selecionada && (
                        <div className="mt-5 pt-5 border-t border-[#f0e9dc] flex flex-wrap gap-2">
                          {DIAS.map(dia => {
                            const selecionado = atividadesSelecionadas
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
                                  px-4 py-1.5 text-xs rounded-2xl border transition-all font-medium
                                  ${selecionado 
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
                <div className="text-center py-16 text-[#8b7a65]">
                  Nenhuma atividade encontrada nesta categoria.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Footer com selecionadas */}
      {atividadesSelecionadas.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8dcc6] py-4 z-50">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div className="text-sm text-[#8b7a65]">
              {atividadesSelecionadas.length} atividades selecionadas
            </div>
            <button 
              onClick={() => {
                // Aqui você pode adicionar a lógica de salvar
                alert('Funcionalidade de salvar ainda não implementada');
              }}
              className="px-8 py-3 bg-[#1f1810] text-white rounded-2xl text-sm font-medium hover:bg-black transition-colors"
            >
              Salvar minha rotina
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
