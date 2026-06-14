// Atualizado: 14/06 15:05
import { useState } from 'react';
import ScheduleGrid, { ScheduleItem } from './ScheduleGrid';

interface ScheduleEditorProps {
  items: ScheduleItem[];
  dias: string[];
  startHour: number;
  endHour: number;
  onChange: (newItems: ScheduleItem[]) => void;
}

export default function ScheduleEditor({
  items,
  dias,
  startHour,
  endHour,
  onChange,
}: ScheduleEditorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [highlight, setHighlight] = useState<{
    type: 'green' | 'red' | null;
    ids: string[];
  }>({ type: null, ids: [] });

  const clearHighlight = () => {
    setHighlight({ type: null, ids: [] });
  };

  const handleItemClick = (clickedItem: ScheduleItem) => {
    if (!selectedId) {
      // Primeira seleção
      setSelectedId(clickedItem.id);
      return;
    }

    if (selectedId === clickedItem.id) {
      // Clicou na mesma → deseleciona
      setSelectedId(null);
      clearHighlight();
      return;
    }

    // Segunda seleção → tentar inverter
    const firstItem = items.find((i) => i.id === selectedId);
    if (!firstItem) {
      setSelectedId(null);
      return;
    }

    const secondItem = clickedItem;
    const sameDay = firstItem.dia === secondItem.dia;

    // Aplica realce temporário
    setHighlight({
      type: sameDay ? 'green' : 'red',
      ids: [firstItem.id, secondItem.id],
    });

    // Realiza a inversão
    let newItems = [...items];

    // Troca as atividades (nome + duração + categoria)
    const tempAtividade = firstItem.atividade;
    const tempDuracao = firstItem.duracao;
    const tempCategoria = firstItem.categoria;

    const idx1 = newItems.findIndex((i) => i.id === firstItem.id);
    const idx2 = newItems.findIndex((i) => i.id === secondItem.id);

    newItems[idx1] = {
      ...newItems[idx1],
      atividade: secondItem.atividade,
      duracao: secondItem.duracao,
      categoria: secondItem.categoria,
    };

    newItems[idx2] = {
      ...newItems[idx2],
      atividade: tempAtividade,
      duracao: tempDuracao,
      categoria: tempCategoria,
    };

    // Se durações diferentes, recalcula horários do(s) dia(s) afetado(s)
    const affectedDays = new Set([firstItem.dia, secondItem.dia]);

    affectedDays.forEach((dia) => {
      // Pega todos os itens do dia, ordenados pelo horário original
      const dayItems = newItems
        .filter((i) => i.dia === dia)
        .sort((a, b) => {
          const timeA = a.horaInicio * 60 + a.minutoInicio;
          const timeB = b.horaInicio * 60 + b.minutoInicio;
          return timeA - timeB;
        });

      // Recalcula horários sequencialmente a partir do startHour
      let currentTime = startHour * 60;

      dayItems.forEach((item) => {
        const itemIndex = newItems.findIndex((i) => i.id === item.id);
        const newHora = Math.floor(currentTime / 60);
        const newMinuto = currentTime % 60;

        newItems[itemIndex] = {
          ...newItems[itemIndex],
          horaInicio: newHora,
          minutoInicio: newMinuto,
        };

        currentTime += newItems[itemIndex].duracao;
      });
    });

    // Atualiza o estado
    onChange(newItems);

    // Limpa seleção após swap
    setSelectedId(null);

    // Remove o realce após 1.2s
    setTimeout(() => {
      clearHighlight();
    }, 1200);
  };

  // Passa os itens com informação de seleção para o ScheduleGrid
  const itemsWithSelection = items.map((item) => ({
    ...item,
    // Poderíamos adicionar classes extras aqui se quiséssemos estilizar o grid
  }));

  return (
    <div className="space-y-4">
      {/* Instruções de uso */}
      <div className="bg-[#f8f5f0] border border-[#e8dcc6] rounded-2xl px-5 py-4 text-sm text-[#6b5c4a]">
        <strong className="text-[#1f1810]">Como ajustar:</strong> Clique em uma atividade e depois em outra para inverter. Mesmos dias = verde. Dias diferentes = vermelho. Durações diferentes recalculam automaticamente.
      </div>

      {/* Grid com callback de clique */}
      <ScheduleGrid
        items={itemsWithSelection}
        dias={dias}
        startHour={startHour}
        endHour={endHour}
        onItemClick={handleItemClick}
      />

      {/* Feedback visual do realce (pode ser melhorado com CSS classes no grid futuramente) */}
      {highlight.type && (
        <div className={`text-center text-sm font-medium py-2 rounded-xl ${
          highlight.type === 'green' ? 'bg-[#d1fae5] text-[#166534]' : 'bg-[#fee2e2] text-[#991b1b]'
        }`}>
          {highlight.type === 'green' 
            ? '✓ Invertendo atividades do mesmo dia (recalculando horários)...' 
            : '⚠ Invertendo atividades de dias diferentes'}
        </div>
      )}
    </div>
  );
}
