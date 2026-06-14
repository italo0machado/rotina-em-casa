// Atualizado: 14/06 15:30
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Save } from 'lucide-react';
import DaySelector from '../components/DaySelector';
import type { DaySelection } from '../components/DaySelector';
import TimeRangeSlider from '../components/TimeRangeSlider';
import SearchActivityBar from '../components/SearchActivityBar';
import ActivityDurationPicker from '../components/ActivityDurationPicker';
import ScheduleEditor from '../components/ScheduleEditor';
import type { ScheduleItem } from '../components/ScheduleGrid';
import { atividades } from '../data/atividades';
import type { AtividadeBase } from '../data/atividades';

const DIAS_MAP: { [key: string]: string } = {
  seg: 'Segunda',
  ter: 'Terça',
  qua: 'Quarta',
  qui: 'Quinta',
  sex: 'Sexta',
  sab: 'Sábado',
  dom: 'Domingo',
};

export default function EscalaEditor() {
  const { id } = useParams();

  const [daySelection, setDaySelection] = useState<DaySelection>({
    seg: true, ter: true, qua: true, qui: true, sex: true,
    sab: false, dom: false,
  });

  const [startHour, setStartHour] = useState(6);
  const [endHour, setEndHour] = useState(19);

  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [pendingActivity, setPendingActivity] = useState<AtividadeBase | null>(null);

  const selectedDays = Object.entries(daySelection)
    .filter(([_, selected]) => selected)
    .map(([key]) => DIAS_MAP[key]);

  const generateInitialSchedule = (selectedActivities: { atividade: AtividadeBase; duration: number }[]) => {
    const newItems: ScheduleItem[] = [];
    let currentDayIndex = 0;
    const activeDays = selectedDays;

    if (activeDays.length === 0) return;

    let currentHour = startHour;
    let currentMinute = 0;

    selectedActivities.forEach((sel, index) => {
      const day = activeDays[currentDayIndex % activeDays.length];

      newItems.push({
        id: `item-${Date.now()}-${index}`,
        atividade: sel.atividade.nome,
        dia: day,
        horaInicio: currentHour,
        minutoInicio: currentMinute,
        duracao: sel.duration,
        categoria: sel.atividade.categoria,
      });

      currentMinute += sel.duration;
      while (currentMinute >= 60) {
        currentMinute -= 60;
        currentHour++;
      }

      if (currentHour >= endHour) {
        currentHour = startHour;
        currentMinute = 0;
        currentDayIndex++;
      }
    });

    setScheduleItems(newItems);
  };

  const handleActivitySelect = (activity: AtividadeBase) => {
    setPendingActivity(activity);
  };

  const handleDurationConfirm = (duration: number) => {
    if (!pendingActivity) return;

    const currentSelection = scheduleItems.map(item => ({
      atividade: { 
        id: 0, 
        nome: item.atividade, 
        duracao: item.duracao, 
        categoria: item.categoria 
      } as AtividadeBase,
      duration: item.duracao,
    }));

    currentSelection.push({
      atividade: pendingActivity,
      duration,
    });

    generateInitialSchedule(currentSelection);
    setPendingActivity(null);
  };

  const handleDurationCancel = () => {
    setPendingActivity(null);
  };

  const handleTimeRangeChange = (start: number, end: number) => {
    setStartHour(start);
    setEndHour(end);
  };

  const handleScheduleChange = (newItems: ScheduleItem[]) => {
    setScheduleItems(newItems);
  };

  const handleSave = () => {
    alert(`Escala salva com ${scheduleItems.length} atividades!`);
    localStorage.setItem(`escala-${id}`, JSON.stringify(scheduleItems));
  };

  const handleExportPDF = () => {
    alert('Exportação PDF será implementada na próxima etapa.');
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      <nav className="border-b border-[#e8dcc6] bg-[#f8f5f0]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-8 flex items-center justify-between h-20">
          <Link to="/dashboard" className="flex items-center gap-2 text-[#8b7a65] hover:text-[#1f1810]">
            <ArrowLeft size={18} /> Voltar ao Dashboard
          </Link>
          <div className="font-serif text-2xl tracking-[-1px]">Escala #{id}</div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 rounded-2xl border border-[#e8dcc6] text-sm font-medium hover:bg-white transition-colors"
            >
              <Save className="w-4 h-4" /> Salvar
            </button>
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-[#1f1810] text-white text-sm font-medium hover:bg-black transition-colors"
            >
              <Download className="w-4 h-4" /> PDF
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-8 py-10">
        {scheduleItems.length === 0 && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-10">
              <h1 className="font-serif text-4xl tracking-[-1.5px] mb-3">Configure sua escala</h1>
              <p className="text-[#8b7a65]">Escolha os dias, a janela de horários e comece a adicionar atividades.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <DaySelector selected={daySelection} onChange={setDaySelection} />
              <TimeRangeSlider
                startHour={startHour}
                endHour={endHour}
                onChange={handleTimeRangeChange}
              />
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4 text-[#1f1810]">Adicione atividades</h3>
              <SearchActivityBar
                activities={atividades}
                onSelect={handleActivitySelect}
                placeholder="Busque por nome ou categoria..."
              />
              <p className="text-xs text-[#8b7a65] mt-3">
                Clique em uma atividade para definir a duração e adicioná-la à escala.
              </p>
            </div>
          </div>
        )}

        {scheduleItems.length > 0 && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-[#e8dcc6] rounded-3xl px-8 py-5">
              <div>
                <div className="text-sm text-[#8b7a65]">Dias selecionados</div>
                <div className="font-medium">{selectedDays.join(' • ')}</div>
              </div>
              <div>
                <div className="text-sm text-[#8b7a65]">Janela</div>
                <div className="font-medium">{startHour.toString().padStart(2, '0')}:00 – {endHour.toString().padStart(2, '0')}:00</div>
              </div>
              <div>
                <div className="text-sm text-[#8b7a65]">Atividades</div>
                <div className="font-medium">{scheduleItems.length}</div>
              </div>
              <button
                onClick={() => setScheduleItems([])}
                className="text-sm px-4 py-2 border border-[#e8dcc6] rounded-2xl hover:bg-[#f8f5f0]"
              >
                Reiniciar
              </button>
            </div>

            <div className="max-w-xl">
              <SearchActivityBar
                activities={atividades}
                onSelect={handleActivitySelect}
                placeholder="Adicionar mais atividades..."
              />
            </div>

            <ScheduleEditor
              items={scheduleItems}
              dias={selectedDays}
              startHour={startHour}
              endHour={endHour}
              onChange={handleScheduleChange}
            />
          </div>
        )}
      </div>

      {pendingActivity && (
        <ActivityDurationPicker
          activityName={pendingActivity.nome}
          initialDuration={pendingActivity.duracao}
          onConfirm={handleDurationConfirm}
          onCancel={handleDurationCancel}
        />
      )}
    </div>
  );
}
