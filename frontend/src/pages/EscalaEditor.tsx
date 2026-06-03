import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Download, Plus, Clock, GripVertical } from 'lucide-react';
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
}

interface Escala {
  id: number;
  nome: string;
  dias: string[];
}

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
    const iniciais = [
      { id: 1, nome: "Acordar e higiene pessoal", duracao: 30 },
      { id: 2, nome: "Preparar café da manhã", duracao: 25 },
      { id: 3, nome: "Café da manhã em família", duracao: 30 },
      { id: 4, nome: "Arrumar a casa", duracao: 20 },
    ];
    return recalculateHorarios(iniciais);
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(atividades);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedWithHorarios = recalculateHorarios(items);
    setAtividades(reorderedWithHorarios);
  };

  const adicionarAtividade = () => {
    const nova: Atividade = {
      id: Date.now(),
      nome: "Nova atividade",
      duracao: 20,
    };
    const atualizadas = recalculateHorarios([...atividades, nova]);
    setAtividades(atualizadas);
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

  const totalMinutos = atividades.reduce((sum, a) => sum + a.duracao, 0);
  const totalHoras = Math.floor(totalMinutos / 60);
  const minutosRestantes = totalMinutos % 60;

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
            <button className="flex items-center gap-2 px-6 py-2.5 border border-[#e8dcc6] rounded-full text-sm tracking-[2px] hover:bg-white transition">
              <Download className="w-4 h-4" /> EXPORTAR PDF
            </button>
            <button
              onClick={adicionarAtividade}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#2c2118] text-white rounded-full text-sm tracking-[2px] hover:bg-[#3f2a1d] transition"
            >
              <Plus className="w-4 h-4" /> ADICIONAR ATIVIDADE
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="font-serif text-5xl tracking-[-2px]">Timeline da Escala</h1>
            <p className="text-[#6f5e4f] mt-2">Arraste as atividades para reorganizar • Os horários são recalculados automaticamente</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-serif tracking-tighter text-[#2c2118]">
              {totalHoras}h{minutosRestantes > 0 ? ` ${minutosRestantes}min` : ''}
            </div>
            <div className="text-xs text-[#8b5e3c] tracking-[2px]">DURAÇÃO TOTAL</div>
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
                className="mt-6 px-8 py-3 bg-[#2c2118] text-white rounded-full text-sm tracking-[2px]"
              >
                ADICIONAR PRIMEIRA ATIVIDADE
              </button>
            </div>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="timeline">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-3"
                  >
                    {atividades.map((atividade, index) => (
                      <Draggable key={atividade.id} draggableId={atividade.id.toString()} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`flex items-center gap-6 border border-[#e8dcc6] rounded-2xl p-6 transition-all group ${
                              snapshot.isDragging ? 'shadow-2xl ring-2 ring-[#b89a6f]/30 bg-white' : 'hover:border-[#b89a6f]'
                            }`}
                          >
                            {/* Drag Handle */}
                            <div
                              {...provided.dragHandleProps}
                              className="text-[#b89a6f] cursor-grab active:cursor-grabbing"
                            >
                              <GripVertical className="w-5 h-5" />
                            </div>

                            {/* Horário */}
                            <div className="w-20 text-right">
                              <div className="font-mono text-xl tracking-tighter text-[#2c2118]">
                                {atividade.horario}
                              </div>
                            </div>

                            {/* Conteúdo */}
                            <div className="flex-1">
                              <div className="font-medium text-lg tracking-[-0.3px]">{atividade.nome}</div>
                              <div className="text-sm text-[#8b5e3c] mt-0.5">
                                {atividade.duracao} minutos
                              </div>
                            </div>

                            {/* Ações */}
                            <div className="flex items-center gap-3 text-sm text-[#6f5e4f]">
                              <button
                                onClick={() => editarAtividade(atividade.id)}
                                className="px-4 py-1.5 border border-[#e8dcc6] rounded-full hover:bg-[#f9f5f0] transition"
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
                    ))}
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
