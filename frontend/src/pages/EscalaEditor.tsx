import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DualCarousel, EXAMPLE_CATEGORIES } from '../components/DualCarousel';

export default function EscalaEditor() {
  const { id } = useParams();

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
        fadeBg="#f8f5f0"
        onCategoryChange={(cat) => console.log("categoria:", cat.name)}
        onActivitySelect={(act, cat) => console.log("atividade:", act.name, "em", cat.name)}
      />
    </div>
  );
}
