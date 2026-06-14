// Atualizado: 14/06 14:32
// Atualizado: 14/06 15:55

export interface DaySelection {
  seg: boolean;
  ter: boolean;
  qua: boolean;
  qui: boolean;
  sex: boolean;
  sab: boolean;
  dom: boolean;
}

interface DaySelectorProps {
  selected: DaySelection;
  onChange: (selection: DaySelection) => void;
}

const DIAS = [
  { id: 'seg', label: 'Segunda', abrev: 'Seg' },
  { id: 'ter', label: 'Terça', abrev: 'Ter' },
  { id: 'qua', label: 'Quarta', abrev: 'Qua' },
  { id: 'qui', label: 'Quinta', abrev: 'Qui' },
  { id: 'sex', label: 'Sexta', abrev: 'Sex' },
  { id: 'sab', label: 'Sábado', abrev: 'Sab' },
  { id: 'dom', label: 'Domingo', abrev: 'Dom' },
] as const;

export default function DaySelector({ selected, onChange }: DaySelectorProps) {
  const toggleDay = (dayId: keyof DaySelection) => {
    onChange({
      ...selected,
      [dayId]: !selected[dayId],
    });
  };

  const selectWeekdaysOnly = () => {
    onChange({
      seg: true,
      ter: true,
      qua: true,
      qui: true,
      sex: true,
      sab: false,
      dom: false,
    });
  };

  const selectAll = () => {
    onChange({
      seg: true,
      ter: true,
      qua: true,
      qui: true,
      sex: true,
      sab: true,
      dom: true,
    });
  };

  const selectNone = () => {
    onChange({
      seg: false,
      ter: false,
      qua: false,
      qui: false,
      sex: false,
      sab: false,
      dom: false,
    });
  };

  const selectedCount = Object.values(selected).filter(Boolean).length;
  const isWeekdaysOnly = 
    selected.seg && selected.ter && selected.qua && selected.qui && selected.sex &&
    !selected.sab && !selected.dom;

  return (
    <div className="bg-white rounded-3xl p-8 border border-[#e8dcc6]">
      <div className="mb-8">
        <h3 className="text-xl font-serif text-[#1f1810] mb-2">Dias da semana</h3>
        <p className="text-sm text-[#8b7a65]">
          {selectedCount === 0
            ? 'Selecione pelo menos um dia'
            : `${selectedCount} dia${selectedCount !== 1 ? 's' : ''} selecionado${selectedCount !== 1 ? 's' : ''}`}
        </p>
      </div>

      {/* Grid de dias */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {DIAS.map(({ id, label, abrev }) => {
          const isSelected = selected[id as keyof DaySelection];
          const isWeekend = id === 'sab' || id === 'dom';

          return (
            <button
              key={id}
              onClick={() => toggleDay(id as keyof DaySelection)}
              className={`p-4 rounded-2xl border-2 transition-all ${
                isSelected
                  ? 'border-[#1f1810] bg-[#1f1810] text-white'
                  : isWeekend
                  ? 'border-[#d4c3a3] bg-white text-[#6b5c4a]'
                  : 'border-[#e8dcc6] bg-[#f8f5f0] text-[#6b5c4a] hover:border-[#b89a6f]'
              }`}
            >
              <div className="font-semibold text-sm">{abrev}</div>
              <div className="text-xs opacity-75">{label.substring(0, 3)}</div>
            </button>
          );
        })}
      </div>

      {/* Botões rápidos */}
      <div className="flex gap-3">
        <button
          onClick={selectWeekdaysOnly}
          className={`flex-1 py-3 px-4 rounded-2xl text-sm font-medium transition-all ${
            isWeekdaysOnly
              ? 'bg-[#1f1810] text-white border-[#1f1810]'
              : 'bg-white border border-[#e8dcc6] text-[#1f1810] hover:bg-[#f8f5f0]'
          }`}
        >
          Seg–Sex
        </button>

        <button
          onClick={selectAll}
          className="flex-1 py-3 px-4 rounded-2xl text-sm font-medium transition-all border border-[#e8dcc6] bg-white text-[#1f1810] hover:bg-[#f8f5f0]"
        >
          Todos
        </button>

        <button
          onClick={selectNone}
          className="flex-1 py-3 px-4 rounded-2xl text-sm font-medium transition-all border border-[#e8dcc6] bg-white text-[#8b7a65] hover:bg-[#f8f5f0]"
        >
          Limpar
        </button>
      </div>
    </div>
  );
}
