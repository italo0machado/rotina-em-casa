import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Download, Plus, Clock, GripVertical, Sparkles } from 'lucide-react';
import { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from '@hello-pangea/dnd';

interface Atividade {
  id: number;
  nome: string;
  duracao: number;
  horario?: string;
  tipo?: 'autocuidado' | 'casa' | 'movimento' | 'estudo' | 'familia';
}

interface Escala {
  id: number;
  nome: string;
  dias: string[];
}

const TIPO_CONFIG = {
  autocuidado: { cor: '#3b82f6', label: 'Autocuidado', icone: '🛁' },
  casa:        { cor: '#10b981', label: 'Casa',        icone: '🏠' },
  movimento:   { cor: '#f59e0b', label: 'Movimento',   icone: '🏃' },
  estudo:      { cor: '#8b5cf6', label: 'Estudo',      icone: '📚' },
  familia:     { cor: '#ec4899', label: 'Família',     icone: '❤️' },
};

const MENSAGENS_MOTIVACIONAIS = [
  "Bom começo! Continue assim.",
  "Você está indo muito bem!",
  "Ótimo ritmo! A casa agradece.",
  "Quase lá! Está ficando lindo.",
  "Dia organizado é dia feliz.",
];

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

function recalculateHorarios(atividades: Atividade[], startHour = 6): Atividade[] {
  let currentMinutes = startHour * 60;
  return atividades.map((atividade) => {
    const horario = formatTime(currentMinutes);
    currentMinutes += atividade.duracao;
    return { ...atividade, horario };
  });
}

function getMensagemMotivacional(progresso: number): string {
  if (progresso < 20) return MENSAGENS_MOTIVACIONAIS[0];
  if (progresso < 40) return MENSAGENS_MOTIVACIONAIS[1];
  if (progresso < 70) return MENSAGENS_MOTIVACIONAIS[2];
  if (progresso < 95) return MENSAGENS_MOTIVACIONAIS[3];
  return MENSAGENS_MOTIVACIONAIS[4];
}

const ATIVIDADES_SUGERIDAS = [
  { nome: "Alongamento matinal", duracao: 15, tipo: 'movimento' as const },
  { nome: "Ler 20 páginas", duracao: 25, tipo: 'estudo' as const },
  { nome: "Jogar com as crianças", duracao: 30, tipo: 'familia' as const },
  { nome: "Organizar a geladeira", duracao: 20, tipo: 'casa' as const },
  { nome: "Meditação de 10 minutos", duracao: 10, tipo: 'autocuidado' as const },
];

export default function EscalaEditor() {
  const { id } = useParams();
  const location = useLocation();

  const escalaInicial = location.state?.escala as Escala | undefined;

  const [escala] = useState<Escala>(escalaInicial || {
    id: Number(id),
    nome: `Escala #${id}`,
    dias: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex']
  });

  const [atividades, setAtividades] = useState<Atividade[]>(() => {
    const iniciais: Atividade[] = [
      { id: 1, nome: "Acordar e higiene pessoal", duracao: 30, tipo: 'autocuidado' },
      { id: 2, nome: "Preparar café da manhã", duracao: 25, tipo: 'casa' },
      { id: 3, nome: "Café da manhã em família", duracao: 30, tipo: 'familia' },
      { id: 4, nome: "Arrumar a casa", duracao: 20, tipo: 'casa' },
    ];
    return recalculateHorarios(iniciais);
  });

  const totalMinutos = atividades.reduce((sum, a) => sum + a.duracao, 0);
  const totalHoras = Math.floor(totalMinutos / 60);
  const minutosRestantes = totalMinutos % 60;

  // Progresso do dia (considerando 16h = 960 minutos como dia útil)
  const progresso = Math.min(Math.round((totalMinutos / 960) * 100), 100);
  const mensagem = getMensagemMotivacional(progresso);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(atividades);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setAtividades(recalculateHorarios(items));
  };

  const adicionarAtividade = () => {
    const nova: Atividade = {
      id: Date.now(),
      nome: "Nova atividade",
      duracao: 20,
      tipo: 'casa',
    };
    setAtividades(recalculateHorarios([...atividades, nova]));
  };

  const surpreendaMe = () => {
    const sugerida = ATIVIDADES_SUGERIDAS[Math.floor(Math.random() * ATIVIDADES_SUGERIDAS.length)];
    const nova: Atividade = {
      id: Date.now(),
      nome: sugerida.nome,
      duracao: sugerida.duracao,
      tipo: sugerida.tipo,
    };
    setAtividades(recalculateHorarios([...atividades, nova]));
  };

  const removerAtividade = (id: number) => {
    const filtradas = atividades.filter(a => a.id !== id);
    setAtividades(recalculateHorarios(filtradas));
  };

  const editarAtividade = (id: number) => {
    const atividade = atividades.find(a => a.id === id);
    if (!atividade) return;

    const novoNome = prompt('Nome da atividade:', atividade.nome);
    if (novoNome === null) return;

    const novaDuracaoStr = prompt('Duração em minutos:', atividade.duracao.toString());
    if (novaDuracaoStr === null) return;

    const novaDuracao = parseInt(novaDuracaoStr) || 20;

    const atualizadas = atividades.map(a =>
      a.id === id ? { ...a, nome: novoNome.trim() || a.nome, duracao: novaDuracao } : a
    );

    setAtividades(recalculateHorarios(atualizadas));
  };

  return (
    <div className="min-h-screen bg-[#f9f5f0] text-[#2c2118]">
      {/* Navbar */}
      <nav className="border-b border-[#e8dcc6] bg-[#f9f5f0]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2 text-[#6f5e4f] hover:text-[#2c2118] transition">
              <ArrowLeft className="w-4 h-4" /> Voltar
            </Link>
            <div className="w-px h-6 bg-[#e8dcc6] mx-2" />
            <div>
              <div className="font-serif text-2xl tracking-[-1px]">{escala.nome}</div>
              <div className="text-xs text-[#8b5e3c] tracking-[2px]">{escala.dias.join(" • ")}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 border border-[#e8dcc6] rounded-2xl text-sm tracking-[2px] hover:bg-white transition">
              <Download className="w-4 h-4" /> EXPORTAR PDF
            </button>
            <button
              onClick={adicionarAtividade}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#2c2118] text-white rounded-2xl text-sm tracking-[2px] hover:bg-[#3f2a1d] transition"
            >
              <Plus className="w-4 h-4" /> ADICIONAR
            </button>
            <button
              onClick={surpreendaMe}
              className="flex items-center gap-2 px-6 py-2.5 border border-[#b89a6f] text-[#b89a6f] rounded-2xl text-sm tracking-[2px] hover:bg-[#b89a6f] hover:text-white transition"
            >
              <Sparkles className="w-4 h-4" /> SURPREENDA-ME
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Cabeçalho com mensagem e progresso */}
        <div className="mb-8">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h1 className="font-serif text-5xl tracking-[-2px]">Timeline da Escala</h1>
              <p className="text-[#6f5e4f] mt-2 text-lg">{mensagem}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-serif tracking-tighter text-[#2c2118]">
                {totalHoras}h{minutosRestantes > 0 ? ` ${minutosRestantes}min` : ''}
              </div>
              <div className="text-xs text-[#8b5e3c] tracking-[2px]">DURAÇÃO TOTAL</div>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-[#8b5e3c] mb-1.5 tracking-[1px]">
              <span>PROGRESSO DO DIA</span>
              <span>{progresso}%</span>
            </div>
            <div className="h-2 bg-[#e8dcc6] rounded-2xl overflow-hidden">
              <div 
                className="h-2 bg-[#b89a6f] transition-all duration-500" 
                style={{ width: `${progresso}%` }}
              />
            </div>
          </div>
        </div>

        {/* Timeline com Drag & Drop */}
        <div className="border border-[#e8dcc6] bg-white rounded-3xl p-10">
          {atividades.length === 0 ? (
            <div className="text-center py-16">
              <Clock className="w-10 h-10 mx-auto text-[#b89a6f] mb-4" />
              <p className="text-[#6f5e4f]">Nenhuma atividade adicionada ainda.</p>
              <button
                onClick={adicionarAtividade}
                className="mt-6 px-8 py-3 bg-[#2c2118] text-white rounded-2xl text-sm tracking-[2px]"
              >
                ADICIONAR PRIMEIRA ATIVIDADE
              </button>
            </div>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="timeline">
                {(provided: import("@hello-pangea/dnd").DroppableProvided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-3"
                  >
                    {atividades.map((atividade, index) => {
                      const config = atividade.tipo ? TIPO_CONFIG[atividade.tipo] : TIPO_CONFIG.casa;
                      return (
                        <Draggable key={atividade.id} draggableId={atividade.id.toString()} index={index}>
                          {(provided: import("@hello-pangea/dnd").DraggableProvided, snapshot: import("@hello-pangea/dnd").DraggableStateSnapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`flex items-center gap-6 border border-[#e8dcc6] rounded-2xl p-6 transition-all group ${
                                snapshot.isDragging ? 'shadow-2xl ring-2 ring-[#b89a6f]/30 bg-white' : 'hover:border-[#b89a6f]'
                              }`}
                            >
                              {/* Drag Handle */}
                              <div {...provided.dragHandleProps} className="text-[#b89a6f] cursor-grab active:cursor-grabbing">
                                <GripVertical className="w-5 h-5" />
                              </div>

                              {/* Horário */}
                              <div className="w-20 text-right">
                                <div className="font-mono text-xl tracking-tighter text-[#2c2118]">
                                  {atividade.horario}
                                </div>
                              </div>

                              {/* Tipo + Nome */}
                              <div className="flex-1 flex items-center gap-4">
                                <div 
                                  className="w-9 h-9 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                                  style={{ backgroundColor: `${config.cor}15` }}
                                >
                                  {config.icone}
                                </div>
                                <div>
                                  <div className="font-medium text-lg tracking-[-0.3px]">{atividade.nome}</div>
                                  <div className="text-sm text-[#8b5e3c] mt-0.5">
                                    {atividade.duracao} minutos • {config.label}
                                  </div>
                                </div>
                              </div>

                              {/* Ações */}
                              <div className="flex items-center gap-3 text-sm text-[#6f5e4f]">
                                <button
                                  onClick={() => editarAtividade(atividade.id)}
                                  className="px-4 py-1.5 border border-[#e8dcc6] rounded-2xl hover:bg-[#f9f5f0] transition"
                                >
                                  Editar
                                </button>
                                <button
                                  onClick={() => removerAtividade(atividade.id)}
                                  className="px-4 py-1.5 text-red-600/70 hover:text-red-600 transition"
                                >
                                  Remover
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>

        <div className="mt-6 text-xs text-[#8b5e3c] tracking-[2px] text-center">
          {atividades.length} ATIVIDADES • {escala.dias.length} DIAS
        </div>
      </div>
    </div>
  );
}
