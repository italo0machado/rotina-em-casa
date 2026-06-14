// Atualizado: 14/06 14:35
import { useState } from 'react';
import { Clock } from 'lucide-react';

interface TimeRangeSliderProps {
  startHour: number; // 0-23
  endHour: number;   // 0-23
  onChange: (start: number, end: number) => void;
}

export default function TimeRangeSlider({
  startHour,
  endHour,
  onChange,
}: TimeRangeSliderProps) {
  const [localStart, setLocalStart] = useState(startHour);
  const [localEnd, setLocalEnd] = useState(endHour);

  const formatHour = (h: number) => `${String(h).padStart(2, '0')}:00`;

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value < localEnd) {
      setLocalStart(value);
    }
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > localStart) {
      setLocalEnd(value);
    }
  };

  const handleCommit = () => {
    onChange(localStart, localEnd);
  };

  const totalHours = 24;
  const startPercent = (localStart / totalHours) * 100;
  const endPercent = (localEnd / totalHours) * 100;

  return (
    <div className="bg-white rounded-3xl p-8 border border-[#e8dcc6]">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="w-5 h-5 text-[#8b7a65]" />
          <h3 className="text-xl font-serif text-[#1f1810]">Janela de horários</h3>
        </div>
        <p className="text-sm text-[#8b7a65]">
          Defina o intervalo de tempo para as atividades
        </p>
      </div>

      {/* Display de horários */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#f8f5f0] rounded-2xl p-4">
          <div className="text-xs text-[#8b7a65] mb-2">Início</div>
          <div className="text-3xl font-serif text-[#1f1810] tracking-tight">
            {formatHour(localStart)}
          </div>
        </div>
        <div className="bg-[#f8f5f0] rounded-2xl p-4">
          <div className="text-xs text-[#8b7a65] mb-2">Fim</div>
          <div className="text-3xl font-serif text-[#1f1810] tracking-tight">
            {formatHour(localEnd)}
          </div>
        </div>
      </div>

      {/* Timeline visual */}
      <div className="mb-8">
        <div className="relative h-3 bg-[#e8dcc6] rounded-full mb-6">
          {/* Background do intervalo selecionado */}
          <div
            className="absolute h-3 bg-[#1f1810] rounded-full"
            style={{
              left: `${startPercent}%`,
              right: `${100 - endPercent}%`,
            }}
          />
        </div>

        {/* Hora labels (grid simples) */}
        <div className="grid grid-cols-6 gap-0 text-xs text-[#b89a6f] text-center">
          {[0, 6, 12, 18].map((h) => (
            <div key={h} style={{ gridColumn: `${(h / 24) * 6 + 1} / span 1` }}>
              {formatHour(h)}
            </div>
          ))}
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-[#1f1810]">Hora de início</label>
            <span className="text-sm font-semibold text-[#1f1810] bg-[#f8f5f0] px-3 py-1 rounded-full">
              {formatHour(localStart)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="23"
            value={localStart}
            onChange={handleStartChange}
            onMouseUp={handleCommit}
            onTouchEnd={handleCommit}
            className="w-full h-2 bg-[#e8dcc6] rounded-lg appearance-none cursor-pointer accent-[#1f1810]"
            style={{
              background: `linear-gradient(to right, #1f1810 0%, #1f1810 ${(localStart / 23) * 100}%, #e8dcc6 ${(localStart / 23) * 100}%, #e8dcc6 100%)`,
            }}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-[#1f1810]">Hora de término</label>
            <span className="text-sm font-semibold text-[#1f1810] bg-[#f8f5f0] px-3 py-1 rounded-full">
              {formatHour(localEnd)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="23"
            value={localEnd}
            onChange={handleEndChange}
            onMouseUp={handleCommit}
            onTouchEnd={handleCommit}
            className="w-full h-2 bg-[#e8dcc6] rounded-lg appearance-none cursor-pointer accent-[#1f1810]"
            style={{
              background: `linear-gradient(to right, #1f1810 0%, #1f1810 ${(localEnd / 23) * 100}%, #e8dcc6 ${(localEnd / 23) * 100}%, #e8dcc6 100%)`,
            }}
          />
        </div>
      </div>

      {/* Info */}
      <div className="mt-8 pt-6 border-t border-[#e8dcc6]">
        <div className="text-sm text-[#8b7a65]">
          <span className="font-semibold text-[#1f1810]">{localEnd - localStart}h</span> de duração total
        </div>
      </div>
    </div>
  );
}
