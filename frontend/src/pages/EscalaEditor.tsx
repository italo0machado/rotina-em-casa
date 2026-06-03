import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Plus } from 'lucide-react';

export default function EscalaEditor() {
  const { id } = useParams();

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
            <div className="font-serif text-2xl tracking-[-1px]">Escala #{id}</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 border border-[#e8dcc6] rounded-full text-sm tracking-[2px] hover:bg-white transition">
              <Download className="w-4 h-4" /> EXPORTAR PDF
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-[#2c2118] text-white rounded-full text-sm tracking-[2px] hover:bg-[#3f2a1d] transition">
              <Plus className="w-4 h-4" /> ADICIONAR ATIVIDADE
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="font-serif text-5xl tracking-[-2px]">Timeline da Escala</h1>
          <p className="text-[#6f5e4f] mt-2">Arraste as atividades para reorganizar • Clique para editar horários</p>
        </div>

        {/* Placeholder visual da timeline */}
        <div className="border border-[#e8dcc6] bg-white rounded-3xl p-10 min-h-[500px]">
          <div className="text-center py-20">
            <div className="text-[#b89a6f] mb-4">Timeline visual em desenvolvimento</div>
            <p className="text-[#6f5e4f] max-w-md mx-auto">
              Aqui será implementada a timeline arrastável com geração automática de horários, 
              feedback visual (verde/vermelho) e edição manual.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
