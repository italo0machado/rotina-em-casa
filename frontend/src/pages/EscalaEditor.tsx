// Atualizado: 14/06 16:15
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DualCarousel, EXAMPLE_CATEGORIES } from '../components/DualCarousel';
import type { AtividadeBase } from '../data/atividades';

export default function EscalaEditor() {
  const { id } = useParams();
  const [selectedActivities, setSelectedActivities] = useState<AtividadeBase[]>([]);

  const handleActivitySelect = (activity: AtividadeBase) => {
    if (!selectedActivities.find(a => a.id === activity.id)) {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      <nav className="border-b border-[#e8dcc6] bg-[#f8f5f0]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-8 flex items-center justify-between h-20">
          <Link to="/dashboard" className="flex items-center gap-2 text-[#8b7a65] hover:text-[#1f1810]">
            <ArrowLeft size={18} /> Voltar
          </Link>
          <div className="font-serif text-2xl tracking-[-1px]">Escala #{id}</div>
        </div>
      </nav>

      <DualCarousel
        categories={EXAMPLE_CATEGORIES}
        onCategoryChange={(cat) => console.log("categoria:", cat.name)}
        onActivitySelect={(act: any) => handleActivitySelect(act)}
      />

      {selectedActivities.length > 0 && (
        <div className="max-w-4xl mx-auto px-8 py-10">
          <div className="bg-white border border-[#e8dcc6] rounded-3xl p-8">
            <h3 className="font-serif text-2xl mb-4">Atividades selecionadas</h3>
            <div className="flex flex-wrap gap-3">
              {selectedActivities.map((act, i) => (
                <div key={i} className="px-4 py-2 bg-[#f8f5f0] rounded-2xl text-sm border border-[#e8dcc6]">
                  {act.nome} ({act.duracao}min)
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-[#8b7a65]">
              Próximo passo: vamos integrar o DaySelector, TimeRangeSlider e ScheduleEditor mantendo o carousel intacto.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
