// Atualizado: 14/06 14:40
import { useState } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface ActivityDurationPickerProps {
  activityName: string;
  initialDuration: number;
  onConfirm: (duration: number) => void;
  onCancel: () => void;
}

export default function ActivityDurationPicker({
  activityName,
  initialDuration,
  onConfirm,
  onCancel,
}: ActivityDurationPickerProps) {
  const [duration, setDuration] = useState(initialDuration);
  const [customInput, setCustomInput] = useState(initialDuration.toString());
  const [useCustom, setUseCustom] = useState(false);

  const PRESETS = [15, 30, 45, 60, 90, 120];

  const handlePreset = (minutes: number) => {
    setDuration(minutes);
    setCustomInput(minutes.toString());
    setUseCustom(false);
  };

  const handleCustomChange = (value: string) => {
    setCustomInput(value);
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      setDuration(num);
    }
  };

  const formatDuration = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const mins_remainder = mins % 60;
    if (hours === 0) return `${mins}min`;
    if (mins_remainder === 0) return `${hours}h`;
    return `${hours}h ${mins_remainder}min`;
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-[420px]">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-serif text-[#1f1810] mb-2">
            Quanto tempo?
          </h2>
          <p className="text-[#8b7a65] text-sm">
            Duração de <span className="font-semibold text-[#1f1810]">{activityName}</span>
          </p>
        </div>

        {/* Display de duração */}
        <div className="bg-[#f8f5f0] rounded-2xl p-6 mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-[#b89a6f]" />
            <span className="text-4xl font-serif text-[#1f1810]">
              {formatDuration(duration)}
            </span>
          </div>
          <p className="text-sm text-[#8b7a65]">{duration} minutos</p>
        </div>

        {/* Aviso sobre deslocamentos */}
        <div className="bg-[#fef3e2] border border-[#e8dcc6] rounded-2xl p-4 mb-8 flex gap-3">
          <AlertCircle className="w-5 h-5 text-[#b89a6f] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#6b5c4a]">
            Inclua tempo de deslocamento e preparação. Melhor estar tranquilo que apressado.
          </p>
        </div>

        {/* Presets */}
        <div className="mb-8">
          <label className="text-sm font-medium text-[#1f1810] block mb-4">
            Durações comuns
          </label>
          <div className="grid grid-cols-3 gap-2">
            {PRESETS.map((mins) => (
              <button
                key={mins}
                onClick={() => handlePreset(mins)}
                className={`py-3 px-4 rounded-2xl text-sm font-semibold transition-all ${
                  duration === mins && !useCustom
                    ? 'bg-[#1f1810] text-white'
                    : 'bg-[#f8f5f0] text-[#1f1810] border border-[#e8dcc6] hover:border-[#b89a6f]'
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>

        {/* Custom input */}
        <div className="mb-8">
          <label className="text-sm font-medium text-[#1f1810] block mb-3">
            Personalizad{useCustom ? 'a' : 'o'}
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              min="1"
              max="480"
              value={customInput}
              onChange={(e) => {
                handleCustomChange(e.target.value);
                setUseCustom(true);
              }}
              className="flex-1 px-4 py-3 border-2 border-[#e8dcc6] rounded-2xl text-[#1f1810] focus:border-[#1f1810] focus:outline-none transition-colors"
              placeholder="Ex: 75"
            />
            <span className="flex items-center px-4 py-3 bg-[#f8f5f0] rounded-2xl text-[#8b7a65] font-medium">
              min
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-6 rounded-2xl border border-[#e8dcc6] bg-white text-[#1f1810] font-semibold hover:bg-[#f8f5f0] transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(duration)}
            className="flex-1 py-3 px-6 rounded-2xl bg-[#1f1810] text-white font-semibold hover:bg-black transition-all"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
