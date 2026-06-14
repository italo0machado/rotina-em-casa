// Atualizado: 14/06 15:22
import { Clock } from 'lucide-react';

export interface ScheduleItem {
  id: string;
  atividade: string;
  dia: string;
  horaInicio: number; // 0-23
  minutoInicio: number; // 0-59
  duracao: number; // em minutos
  categoria: string;
}

interface ScheduleGridProps {
  items: ScheduleItem[];
  dias: string[];
  startHour: number;
  endHour: number;
  onItemClick?: (item: ScheduleItem) => void;
}

export default function ScheduleGrid({
  items,
  dias,
  startHour,
  endHour,
  onItemClick,
}: ScheduleGridProps) {
  const formatTime = (h: number, m: number) => `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  
  const totalHours = endHour - startHour;
  const pixelsPerHour = 100;

  const getItemStyle = (item: ScheduleItem) => {
    const itemStartMinutes = item.horaInicio * 60 + item.minutoInicio;
    const windowStartMinutes = startHour * 60;
    const offsetMinutes = itemStartMinutes - windowStartMinutes;
    
    const topPercent = (offsetMinutes / (totalHours * 60)) * 100;
    const heightPercent = (item.duracao / (totalHours * 60)) * 100;
    
    return {
      top: `${topPercent}%`,
      height: `${heightPercent}%`,
      minHeight: '60px',
    };
  };

  const getCategoryColor = (categoria: string) => {
    const colors: { [key: string]: string } = {
      'Saúde': '#e07a5f',
      'Estudos': '#81b29a',
      'Fé': '#6b5b95',
      'Casa': '#f4a261',
      'Lazer': '#c2b28f',
      'Trabalho': '#9b6b5e',
      'Amigos': '#d4a574',
      'Família': '#a8937a',
    };
    return colors[categoria] || '#a8937a';
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-[#e8dcc6] text-center">
        <div className="py-16">
          <Clock className="w-16 h-16 text-[#b89a6f] mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-serif text-[#6b5c4a] mb-2">
            Nenhuma atividade adicionada
          </h3>
          <p className="text-sm text-[#8b7a65]">
            Adicione atividades usando a barra de busca para gerar sua escala
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-[#e8dcc6] overflow-hidden">
      <div className="flex">
        <div className="w-20 bg-[#f8f5f0] border-r border-[#e8dcc6] py-8 px-3">
          <div className="text-xs font-semibold text-[#b89a6f] mb-2">Horário</div>
          {Array.from({ length: totalHours + 1 }).map((_, i) => {
            const h = startHour + i;
            return (
              <div
                key={h}
                style={{ height: `${pixelsPerHour}px` }}
                className="flex items-center justify-center text-xs text-[#8b7a65] font-medium"
              >
                {String(h).padStart(2, '0')}h
              </div>
            );
          })}
        </div>

        <div className="flex-1 overflow-x-auto">
          <div style={{ minWidth: `${dias.length * 280}px` }} className="flex">
            {dias.map((dia) => (
              <div
                key={dia}
                className="flex-1 min-w-[280px] border-r border-[#e8dcc6] last:border-r-0"
              >
                <div className="bg-[#f8f5f0] border-b border-[#e8dcc6] p-4">
                  <h4 className="font-serif text-[#1f1810] text-sm font-semibold">
                    {dia}
                  </h4>
                </div>

                <div
                  className="relative bg-white"
                  style={{ height: `${(totalHours * pixelsPerHour)}px` }}
                >
                  {Array.from({ length: totalHours }).map((_, i) => (
                    <div
                      key={`line-${i}`}
                      className="absolute w-full border-t border-[#f0e9d9]"
                      style={{ top: `${((i + 1) / totalHours) * 100}%` }}
                    />
                  ))}

                  {items
                    .filter((item) => item.dia === dia)
                    .map((item) => (
                      <button
                        key={item.id}
                        onClick={() => onItemClick?.(item)}
                        style={{
                          ...getItemStyle(item),
                          backgroundColor: getCategoryColor(item.categoria),
                        }}
                        className="absolute left-2 right-2 rounded-2xl p-3 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer overflow-hidden flex flex-col justify-between group"
                      >
                        <div>
                          <div className="text-xs font-semibold opacity-90 line-clamp-2">
                            {item.atividade}
                          </div>
                        </div>
                        <div className="text-xs opacity-75 font-medium">
                          {formatTime(item.horaInicio, item.minutoInicio)} • {item.duracao}min
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#f8f5f0] border-t border-[#e8dcc6] p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries({
          'Saúde': '#e07a5f',
          'Estudos': '#81b29a',
          'Fé': '#6b5b95',
          'Casa': '#f4a261',
          'Lazer': '#c2b28f',
          'Trabalho': '#9b6b5e',
          'Amigos': '#d4a574',
          'Família': '#a8937a',
        }).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs text-[#6b5c4a] font-medium">{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
