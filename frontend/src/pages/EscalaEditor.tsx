import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Check, Clock } from 'lucide-react';
import { useState } from 'react';

interface Atividade {
  id: number;
  nome: string;
  duracao: number;
  tipo?: string;
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

const TODAS_ATIVIDADES = [
  { id: 1, nome: "Alongamento matinal", duracao: 15, tipo: 'Saúde' },
  { id: 2, nome: "Academia", duracao: 60, tipo: 'Saúde' },
  { id: 3, nome: "Ler 20 minutos", duracao: 20, tipo: 'Estudos' },
  { id: 4, nome: "Oração / Meditação", duracao: 15, tipo: 'Fé' },
  { id: 5, nome: "Arrumar o quarto", duracao: 20, tipo: 'Casa' },
  { id: 6, nome: "Caminhada", duracao: 30, tipo: 'Lazer' },
  { id: 7, nome: "Revisar matéria", duracao: 45, tipo: 'Estudos' },
  { id: 8, nome: "Café com a família", duracao: 30, tipo: 'Família' },
];

// Atualizado: 06/06 00:25
export default function EscalaEditor() {
  const { id } = useParams();
  
  const [escalaNome] = useState(`Escala #${id}`);
  const [atividades, setAtividades] = useState<Atividade[]>([
    { id: 1, nome: "Acordar e higiene", duracao: 30, tipo: 'Saúde' },
    { id: 2, nome: "Café da manhã", duracao: 25, tipo: 'Casa' },
    { id: 3, nome: "Café com a família", duracao: 30, tipo: 'Família' },
  ]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);

  const totalMinutos = atividades.reduce((s, a) => s + a.duracao, 0);

  const atividadesFiltradas = TODAS_ATIVIDADES.filter(a => 
    !categoriaSelecionada || a.tipo === categoriaSelecionada
  );

  const adicionarAtividade = (atividade: Atividade) => {
    if (!atividades.some(a => a.id === atividade.id)) {
      setAtividades([...atividades, atividade]);
    }
  };

  const removerAtividade = (id: number) => {
    setAtividades(atividades.filter(a => a.id !== id));
  };

  const jaAdicionada = (id: number) => atividades.some(a => a.id === id);

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
            {totalMinutos} minutos • {atividades.length} atividades
          </div>
        </div>
      </nav>

      <div className="max-w-screen-2xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Carrossel Esquerdo - Categorias */}
          <div className="lg:col-span-5">
            <div className="mb-4 px-2">
              <div className="text-sm font-medium tracking-[0.5px] text-[#8b7a65] uppercase">Categorias</div>
            </div>

            <div className="space-y-3 max-h-[620px] overflow-y-auto pr-3 custom-scroll">
              {CATEGORIAS.map((cat, index) => {
                const isActive = categoriaSelecionada === cat.nome;
                return (
                  <button
                    key={index}
                    onClick={() => setCategoriaSelecionada(cat.nome)}
                    className={`
                      w-full group relative overflow-hidden rounded-3xl border p-5 text-left flex items-center gap-4 transition-all
                      ${isActive 
                        ? 'bg-white border-[#1f1810] shadow-lg' 
                        : 'bg-white/70 border-transparent hover:border-[#e8dcc6] hover:bg-white'
                      }
                    `}
                  >
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                      style={{ backgroundColor: cat.cor + '18' }}
                    >
                      {cat.icon}
                    </div>
                    <div>
                      <div className="font-medium text-xl tracking-[-0.4px]">{cat.nome}</div>
                    </div>
                    {isActive && <Check className="ml-auto text-[#1f1810]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Carrossel Direito - Atividades */}
          <div className="lg:col-span-7">
            <div className="mb-4 px-2 flex justify-between items-end">
              <div>
                <div className="text-sm font-medium tracking-[0.5px] text-[#8b7a65] uppercase">Atividades</div>
                <div className="text-3xl tracking-[-1px] font-medium">
                  {categoriaSelecionada || 'Todas'}
                </div>
              </div>
              {categoriaSelecionada && (
                <button onClick={() => setCategoriaSelecionada(null)} className="text-sm text-[#8b7a65]">
                  Limpar
                </button>
              )}
            </div>

            <div className="max-h-[620px] overflow-y-auto pr-3 custom-scroll space-y-3">
              {atividadesFiltradas.map((atividade) => {
                const adicionada = jaAdicionada(atividade.id);
                const cor = CATEGORIAS.find(c => c.nome === atividade.tipo)?.cor || '#b89a6f';

                return (
                  <div
                    key={atividade.id}
                    onClick={() => !adicionada && adicionarAtividade(atividade)}
                    className={`
                      group flex items-center gap-5 border rounded-3xl p-6 cursor-pointer transition-all
                      ${adicionada 
                        ? 'bg-white border-[#1f1810] opacity-60' 
                        : 'bg-white/70 border-transparent hover:border-[#e8dcc6] hover:bg-white'
                      }
                    `}
                  >
                    <div 
                      className="w-2 h-12 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cor }}
                    />
                    
                    <div className="flex-1">
                      <div className="font-medium text-xl tracking-[-0.4px]">{atividade.nome}</div>
                      <div className="flex items-center gap-2 text-sm text-[#8b7a65] mt-1">
                        <Clock className="w-4 h-4" /> {atividade.duracao} min
                      </div>
                    </div>

                    <div className={`
                      w-9 h-9 rounded-2xl border flex items-center justify-center flex-shrink-0
                      ${adicionada ? 'bg-[#1f1810] border-[#1f1810]' : 'border-[#d4c9b3] group-hover:border-[#b89a6f]'}
                    `}>
                      {adicionada ? <Check className="text-white w-4 h-4" /> : <span className="text-xs">+</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lista de Atividades Selecionadas */}
          <div className="lg:col-span-12 mt-8">
            <div className="bg-white border border-[#e8dcc6] rounded-3xl p-8">
              <div className="flex justify-between mb-6">
                <div className="font-medium text-xl">Atividades da escala</div>
                <div className="text-sm text-[#8b7a65]">{atividades.length} itens • {totalMinutos} min</div>
              </div>

              {atividades.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {atividades.map((atividade) => (
                    <div key={atividade.id} className="flex items-center justify-between bg-[#faf7f2] px-5 py-4 rounded-2xl">
                      <div>
                        <div>{atividade.nome}</div>
                        <div className="text-xs text-[#8b7a65]">{atividade.duracao} min</div>
                      </div>
                      <button onClick={() => removerAtividade(atividade.id)} className="text-[#8b7a65] hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-[#8b7a65]">Nenhuma atividade adicionada ainda</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
