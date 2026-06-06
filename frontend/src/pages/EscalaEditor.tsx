import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Check, Clock } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { atividades as todasAtividades, type AtividadeBase } from '../data/atividades';

interface AtividadeSelecionada extends AtividadeBase {
  dias?: string[];
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

// Atualizado: 06/06 01:15
export default function EscalaEditor() {
  const { id } = useParams();
  
  const [escalaNome] = useState(`Escala #${id}`);
  const [atividadesSelecionadas, setAtividadesSelecionadas] = useState<AtividadeSelecionada[]>([
    { ...todasAtividades[0], dias: ['Seg', 'Ter', 'Qua'] },
    { ...todasAtividades[10], dias: ['Seg', 'Qui'] },
  ]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);

  const totalMinutos = atividadesSelecionadas.reduce((s, a) => s + a.duracao, 0);

  const atividadesFiltradas = todasAtividades.filter(a => 
    !categoriaSelecionada || a.categoria === categoriaSelecionada
  );

  const toggleAtividade = (atividade: AtividadeBase) => {
    const jaExiste = atividadesSelecionadas.some(a => a.id === atividade.id);
    if (jaExiste) {
      setAtividadesSelecionadas(prev => prev.filter(a => a.id !== atividade.id));
    } else {
      setAtividadesSelecionadas(prev => [...prev, { ...atividade, dias: [] }]);
    }
  };

  const toggleDia = (atividadeId: number, dia: string) => {
    setAtividadesSelecionadas(prev =>
      prev.map(atividade => {
        if (atividade.id === atividadeId) {
          const novosDias = atividade.dias?.includes(dia)
            ? atividade.dias.filter(d => d !== dia)
            : [...(atividade.dias || []), dia];
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
    <div className="min-h-screen bg-[#f8f5f0] text-[#1f1810]">
      {/* Header */}
      <nav className="border-b border-[#e8dcc6] bg-[#f8f5f0]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-8 flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2 text-[#8b7a65] hover:text-[#1f1810]">
              <ArrowLeft size={18} /> Voltar
            </Link>
            <div className="w-px h-6 bg-[#e8dcc6]" />
            <div>
              <div className="font-serif text-2xl tracking-[-1px]">{escalaNome}</div>
              <div className="text-xs text-[#8b7a65]">Seg • Ter • Qua • Qui • Sex</div>
            </div>
          </div>
          <div className="text-sm text-[#8b7a65]">
            {totalMinutos} minutos • {atividadesSelecionadas.length} atividades
          </div>
        </div>
      </nav>

      <div className="max-w-screen-2xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Carrossel Esquerdo - Categorias (3D) */}
          <div className="lg:col-span-5">
            <div className="mb-4 px-2">
              <div className="text-sm font-medium tracking-[0.5px] text-[#8b7a65] uppercase">Categorias</div>
            </div>

            <div className="space-y-4 max-h-[640px] overflow-y-auto pr-3 custom-scroll perspective-[1200px]">
              {CATEGORIAS.map((cat, index) => {
                const isActive = categoriaSelecionada === cat.nome;
                const count = todasAtividades.filter(a => a.categoria === cat.nome).length;

                return (
                  <motion.button
                    key={index}
                    whileHover={{ 
                      rotateX: isActive ? 0 : -6, 
                      rotateY: isActive ? 0 : 4,
                      scale: isActive ? 1.01 : 1.02,
                      z: 40
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    onClick={() => setCategoriaSelecionada(cat.nome)}
                    className={`
                      w-full group relative overflow-hidden rounded-3xl border p-6 text-left flex items-center gap-5 transition-all
                      ${isActive 
                        ? 'bg-white border-[#1f1810] shadow-2xl' 
                        : 'bg-white/75 border-transparent hover:border-[#e8dcc6]'
                      }
                    `}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-2 rounded-l-3xl"
                      style={{ backgroundColor: cat.cor }}
                    />
                    
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
                      style={{ backgroundColor: cat.cor + '18' }}
                    >
                      {cat.icon}
                    </div>

                    <div className="flex-1">
                      <div className="font-medium text-2xl tracking-[-0.6px]">{cat.nome}</div>
                      <div className="text-sm text-[#8b7a65] mt-0.5">{count} atividades</div>
                    </div>

                    {isActive && <Check className="ml-auto" />}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Carrossel Direito - Atividades (3D) */}
          <div className="lg:col-span-7">
            <div className="mb-4 px-2 flex items-end justify-between">
              <div>
                <div className="text-sm font-medium tracking-[0.5px] text-[#8b7a65] uppercase">Atividades</div>
                <div className="text-3xl tracking-[-1px] font-medium mt-1">
                  {categoriaSelecionada || 'Todas as categorias'}
                </div>
              </div>
            </div>

            <div className="max-h-[640px] overflow-y-auto pr-3 custom-scroll space-y-4 perspective-[1200px]">
              {atividadesFiltradas.length > 0 ? (
                atividadesFiltradas.map((atividade) => {
                  const selecionada = estaSelecionada(atividade.id);
                  const cor = CATEGORIAS.find(c => c.nome === atividade.categoria)?.cor || '#b89a6f';

                  return (
                    <motion.div
                      key={atividade.id}
                      whileHover={{ 
                        rotateX: selecionada ? 0 : -4, 
                        rotateY: selecionada ? 0 : 3,
                        scale: 1.01,
                        z: 30
                      }}
                      transition={{ type: "spring", stiffness: 280, damping: 18 }}
                      onClick={() => toggleAtividade(atividade)}
                      className={`
                        group relative cursor-pointer rounded-3xl border p-7 flex gap-6 transition-all
                        ${selecionada 
                          ? 'bg-white border-[#1f1810] shadow-2xl' 
                          : 'bg-white/75 border-transparent hover:border-[#e8dcc6]'
                        }
                      `}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div 
                        className="w-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: cor }}
                      />

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

                        <div className="font-medium text-2xl tracking-[-0.5px] pr-4">
                          {atividade.nome}
                        </div>
                      </div>

                      <div className={`
                        mt-1 w-9 h-9 rounded-2xl border-2 flex items-center justify-center flex-shrink-0 transition-all
                        ${selecionada 
                          ? 'bg-[#1f1810] border-[#1f1810]' 
                          : 'border-[#d4c9b3] group-hover:border-[#b89a6f]'
                        }
                      `}>
                        {selecionada && <Check className="w-5 h-5 text-white" />}
                      </div>

                      {selecionada && (
                        <div className="absolute bottom-0 left-0 right-0 px-7 pb-6 pt-5 border-t border-[#f0e9dc] flex flex-wrap gap-2">
                          {DIAS.map(dia => {
                            const diaSelecionado = atividadesSelecionadas
                              .find(a => a.id === atividade.id)
                              ?.dias?.includes(dia);
                            
                            return (
                              <button
                                key={dia}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleDia(atividade.id, dia);
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
                    </motion.div>
                  );
                })
              ) : (
                <div className="h-64 flex items-center justify-center text-[#8b7a65]">
                  Nenhuma atividade encontrada.
                </div>
              )}
            </div>
          </div>

          {/* Lista de selecionadas */}
          <div className="lg:col-span-12 mt-6">
            <div className="bg-white border border-[#e8dcc6] rounded-3xl p-8">
              <div className="flex justify-between mb-6">
                <div className="font-medium text-xl">Atividades na escala</div>
                <div className="text-sm text-[#8b7a65]">{atividadesSelecionadas.length} itens • {totalMinutos} min</div>
              </div>

              {atividadesSelecionadas.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {atividadesSelecionadas.map((atividade) => (
                    <div key={atividade.id} className="flex items-center justify-between bg-[#faf7f2] px-5 py-4 rounded-2xl">
                      <div>
                        <div className="font-medium">{atividade.nome}</div>
                        <div className="text-xs text-[#8b7a65]">{atividade.duracao} min</div>
                      </div>
                      <button onClick={() => removerAtividade(atividade.id)} className="text-[#8b7a65] hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-[#8b7a65]">Nenhuma atividade adicionada</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
