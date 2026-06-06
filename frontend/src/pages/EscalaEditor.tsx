import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Atividade {
  id: number;
  nome: string;
  duracao: number;
  tipo?: string;
}

const CATEGORIAS = ['Saúde', 'Estudos', 'Fé', 'Casa', 'Lazer', 'Trabalho', 'Amigos', 'Família'];

const COR_CATEGORIA: Record<string, string> = {
  Saúde: '#e07a5f',
  Estudos: '#81b29a',
  Fé: '#b08968',
  Casa: '#6d6875',
  Lazer: '#e9c46a',
  Trabalho: '#457b9d',
  Amigos: '#f4a261',
  Família: '#2a9d8f',
};

// Atualizado: 05/06 21:48
export default function EscalaEditor() {
  const { id } = useParams();
  
  const [escalaNome] = useState(`Escala #${id}`);
  const [atividades, setAtividades] = useState<Atividade[]>([
    { id: 1, nome: "Acordar e higiene", duracao: 30, tipo: 'Saúde' },
    { id: 2, nome: "Café da manhã", duracao: 25, tipo: 'Casa' },
    { id: 3, nome: "Café com a família", duracao: 30, tipo: 'Família' },
  ]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Saúde');

  // Espiral
  const rotation = useMotionValue(0);
  const springRotation = useSpring(rotation, { stiffness: 70, damping: 18 });

  const sugestoes = [
    "Alongamento matinal", "Ler 20min", "Oração", "Arrumar quarto",
    "Caminhada", "Revisar matéria", "Meditar", "Lavar louça"
  ];

  const adicionarAtividade = (nome: string) => {
    const nova: Atividade = {
      id: Date.now(),
      nome,
      duracao: 20,
      tipo: categoriaSelecionada
    };
    setAtividades([...atividades, nova]);
  };

  const removerAtividade = (id: number) => {
    setAtividades(atividades.filter(a => a.id !== id));
  };

  const totalMinutos = atividades.reduce((s, a) => s + a.duracao, 0);

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1f1810]">
      {/* Header */}
      <nav className="border-b border-[#e8dcc6] bg-[#faf7f2]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Espiral */}
          <div className="lg:col-span-7">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm tracking-[2px] text-[#8b7a65]">ESPIRAL DE ATIVIDADES</div>
                <div className="font-serif text-3xl tracking-[-1px]">Arraste para girar</div>
              </div>
            </div>

            <div className="bg-white border border-[#e8dcc6] rounded-3xl p-8 flex justify-center">
              <div className="relative w-[480px] h-[480px] flex items-center justify-center">
                <motion.div
                  drag="x"
                  dragMomentum={false}
                  onDrag={(_, info) => rotation.set(rotation.get() + info.delta.x * 0.9)}
                  style={{ rotate: springRotation }}
                  className="relative w-[400px] h-[400px] cursor-grab active:cursor-grabbing"
                >
                  {sugestoes.map((nome, index) => {
                    const angle = (index / sugestoes.length) * 360;
                    const radius = 155;
                    return (
                      <button
                        key={index}
                        onClick={() => adicionarAtividade(nome)}
                        className="absolute px-5 py-2 text-sm bg-white border border-[#e8dcc6] rounded-full hover:border-[#b89a6f] active:scale-95 transition-all whitespace-nowrap"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`
                        }}
                      >
                        {nome}
                      </button>
                    );
                  })}
                </motion.div>
              </div>
            </div>
            <p className="text-center text-sm text-[#8b7a65] mt-4">Clique nas atividades para adicionar</p>
          </div>

          {/* Lista de Atividades */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#e8dcc6] rounded-3xl p-7 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="font-medium">Atividades da escala</div>
                <div className="text-sm text-[#8b7a65]">{atividades.length} itens</div>
              </div>

              <div className="space-y-2 mb-8">
                {atividades.length > 0 ? (
                  atividades.map((atividade) => (
                    <div key={atividade.id} className="flex items-center justify-between bg-[#faf7f2] px-5 py-4 rounded-2xl">
                      <div>
                        <div>{atividade.nome}</div>
                        <div className="text-xs text-[#8b7a65]">{atividade.duracao} min</div>
                      </div>
                      <button onClick={() => removerAtividade(atividade.id)} className="text-[#8b7a65] hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-[#8b7a65]">Nenhuma atividade adicionada</div>
                )}
              </div>

              {/* Categorias */}
              <div className="text-xs tracking-[2px] text-[#8b7a65] mb-3">CATEGORIAS</div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIAS.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoriaSelecionada(cat)}
                    className={`px-4 py-1.5 text-sm rounded-full border transition-all ${
                      categoriaSelecionada === cat 
                        ? 'bg-[#1f1810] text-white border-[#1f1810]' 
                        : 'border-[#e8dcc6] hover:border-[#b89a6f]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
