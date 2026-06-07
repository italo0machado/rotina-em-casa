// Atualizado: 06/06 21:35
import { useState, useRef } from 'react';
import { atividades as todasAtividades } from '../data/atividades';

export interface Activity {
  id: string;
  name: string;
  emoji: string;
  time: string;
  subtitle?: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  gradient: string;
  dotBg: string;
  dotColor: string;
  activities: Activity[];
}

const CATEGORIAS: Category[] = [
  {
    id: "saude",
    name: "Saúde",
    emoji: "❤️",
    gradient: "linear-gradient(135deg,#e07a5f,#fda4af)",
    dotBg: "#fee2e2",
    dotColor: "#9f1239",
    activities: todasAtividades
      .filter(a => a.categoria === "Saúde")
      .slice(0, 8)
      .map((a, i) => ({
        id: a.id.toString(),
        name: a.nome,
        emoji: ["🌅","💧","🤸","🧘","📝","🌬️","✨","📓"][i % 8],
        time: `${a.duracao} min`,
        subtitle: "Rotina diária"
      }))
  },
  {
    id: "estudos",
    name: "Estudos",
    emoji: "📚",
    gradient: "linear-gradient(135deg,#81b29a,#a5d6a7)",
    dotBg: "#e8f5e9",
    dotColor: "#1b5e20",
    activities: todasAtividades
      .filter(a => a.categoria === "Estudos")
      .slice(0, 8)
      .map((a, i) => ({
        id: a.id.toString(),
        name: a.nome,
        emoji: ["📖","✏️","🔍","🗂️","🎧","💻","🌍","📝"][i % 8],
        time: `${a.duracao} min`,
        subtitle: "Rotina diária"
      }))
  },
  {
    id: "fe",
    name: "Fé",
    emoji: "🙏",
    gradient: "linear-gradient(135deg,#b08968,#d2b48c)",
    dotBg: "#fef3c7",
    dotColor: "#78350f",
    activities: todasAtividades
      .filter(a => a.categoria === "Fé")
      .slice(0, 8)
      .map((a, i) => ({
        id: a.id.toString(),
        name: a.nome,
        emoji: ["🙏","📿","🕯️","✝️","🕌","🕉️","☸️","🕎"][i % 8],
        time: `${a.duracao} min`,
        subtitle: "Rotina diária"
      }))
  },
  {
    id: "casa",
    name: "Casa",
    emoji: "🏠",
    gradient: "linear-gradient(135deg,#6d6875,#9ca3af)",
    dotBg: "#f3e8ff",
    dotColor: "#581c87",
    activities: todasAtividades
      .filter(a => a.categoria === "Casa")
      .slice(0, 8)
      .map((a, i) => ({
        id: a.id.toString(),
        name: a.nome,
        emoji: ["🏠","🧹","🧺","🪴","🛏️","🧽","🧴","🧺"][i % 8],
        time: `${a.duracao} min`,
        subtitle: "Rotina diária"
      }))
  },
  {
    id: "lazer",
    name: "Lazer",
    emoji: "🎨",
    gradient: "linear-gradient(135deg,#e9c46a,#fcd34d)",
    dotBg: "#fef3c7",
    dotColor: "#78350f",
    activities: todasAtividades
      .filter(a => a.categoria === "Lazer")
      .slice(0, 8)
      .map((a, i) => ({
        id: a.id.toString(),
        name: a.nome,
        emoji: ["🎨","🎮","🎵","🌿","📺","📚","🎭","🎪"][i % 8],
        time: `${a.duracao} min`,
        subtitle: "Rotina diária"
      }))
  },
  {
    id: "trabalho",
    name: "Trabalho",
    emoji: "💼",
    gradient: "linear-gradient(135deg,#457b9d,#60a5fa)",
    dotBg: "#dbeafe",
    dotColor: "#1e3a8a",
    activities: todasAtividades
      .filter(a => a.categoria === "Trabalho")
      .slice(0, 8)
      .map((a, i) => ({
        id: a.id.toString(),
        name: a.nome,
        emoji: ["💼","📊","💻","📈","📋","🗓️","📞","✉️"][i % 8],
        time: `${a.duracao} min`,
        subtitle: "Rotina diária"
      }))
  },
  {
    id: "amigos",
    name: "Amigos",
    emoji: "👥",
    gradient: "linear-gradient(135deg,#f4a261,#fb923c)",
    dotBg: "#ffedd5",
    dotColor: "#7c2d12",
    activities: todasAtividades
      .filter(a => a.categoria === "Amigos")
      .slice(0, 8)
      .map((a, i) => ({
        id: a.id.toString(),
        name: a.nome,
        emoji: ["👥","🎉","🍻","🎤","🎲","🏀","🎳","🎯"][i % 8],
        time: `${a.duracao} min`,
        subtitle: "Rotina diária"
      }))
  },
  {
    id: "familia",
    name: "Família",
    emoji: "👨‍👩‍👧",
    gradient: "linear-gradient(135deg,#2a9d8f,#5eead4)",
    dotBg: "#d1fae5",
    dotColor: "#064e3b",
    activities: todasAtividades
      .filter(a => a.categoria === "Família")
      .slice(0, 8)
      .map((a, i) => ({
        id: a.id.toString(),
        name: a.nome,
        emoji: ["👨‍👩‍👧","👨‍👩‍👧‍👦","👨‍👨‍👧","👩‍👩‍👧","👨‍👩‍👧‍👦","🧑‍🤝‍🧑","👪","👨‍👩‍👧‍👦"][i % 8],
        time: `${a.duracao} min`,
        subtitle: "Rotina diária"
      }))
  }
];

interface DualCarouselProps {
  categories?: Category[];
  onCategoryChange?: (category: Category) => void;
  onActivitySelect?: (activity: Activity, category: Category) => void;
}

export function DualCarousel({
  categories = CATEGORIAS,
  onCategoryChange,
  onActivitySelect,
}: DualCarouselProps) {
  const [selectedCatIndex, setSelectedCatIndex] = useState(0);
  const [selectedAct, setSelectedAct] = useState<Activity | null>(null);

  const catContainerRef = useRef<HTMLDivElement>(null);
  const actContainerRef = useRef<HTMLDivElement>(null);

  const selectedCategory = categories[selectedCatIndex];

  // Navegação por clique centralizado com efeito 3D forte
  const goToCategory = (index: number) => {
    setSelectedCatIndex(index);
    onCategoryChange?.(categories[index]);

    // Scroll suave com centralização
    const container = catContainerRef.current;
    if (container) {
      const children = Array.from(container.children) as HTMLElement[];
      const target = children[index];
      if (target) {
        const containerWidth = container.offsetWidth;
        const targetLeft = target.offsetLeft;
        const targetWidth = target.offsetWidth;
        const scrollPosition = targetLeft - (containerWidth / 2) + (targetWidth / 2);
        
        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleActivityClick = (activity: Activity) => {
    setSelectedAct(activity);
    onActivitySelect?.(activity, selectedCategory);
  };

  // Efeito de drag simples para o carrossel de categorias
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = catContainerRef.current;
    if (!container) return;
    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const container = catContainerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Aplica estilos 3D dinamicamente nas categorias
  const getCategoryStyle = (index: number) => {
    const isSelected = index === selectedCatIndex;
    const distance = Math.abs(index - selectedCatIndex);
    
    if (isSelected) {
      return {
        transform: 'translateZ(0) scale(1.08) rotateY(0deg)',
        opacity: 1,
        zIndex: 30,
      };
    }
    
    const rotate = index < selectedCatIndex ? -28 : 28;
    const scale = Math.max(0.82, 1 - distance * 0.09);
    const opacity = Math.max(0.65, 1 - distance * 0.18);
    
    return {
      transform: `perspective(1200px) translateZ(-80px) scale(${scale}) rotateY(${rotate}deg)`,
      opacity,
      zIndex: 20 - distance,
    };
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* === CARROSSEL DE CATEGORIAS - COVER FLOW 3D === */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <div>
              <div className="text-[15px] font-semibold tracking-[-0.2px] text-[#1f1810]">Categorias</div>
              <div className="text-[12px] text-[#8b7a65]">Arraste ou clique • Efeito Cover Flow 3D</div>
            </div>
            <div className="text-[11px] px-3 py-1 rounded-full bg-[#f0e9d9] text-[#8b7a65]">
              {selectedCategory.name}
            </div>
          </div>

          <div 
            ref={catContainerRef}
            className="flex gap-4 overflow-x-auto pb-8 pt-4 px-4 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              perspective: '1400px',
              perspectiveOrigin: 'center center'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {categories.map((cat, index) => (
              <div
                key={cat.id}
                onClick={() => goToCategory(index)}
                className="flex-shrink-0 snap-center transition-all duration-500 ease-out"
                style={{
                  ...getCategoryStyle(index),
                  width: '240px',
                  height: '310px',
                }}
              >
                <div 
                  className="relative w-full h-full rounded-[28px] overflow-hidden shadow-2xl border border-white/40"
                  style={{ background: cat.gradient }}
                >
                  {/* Brilho premium */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/10" />
                  
                  <div className="relative h-full flex flex-col items-center justify-center p-9 text-white">
                    <div className="text-[72px] mb-5 drop-shadow-xl">{cat.emoji}</div>
                    <div className="text-4xl font-semibold tracking-[-1.5px] mb-3">{cat.name}</div>
                    <div className="px-5 py-1 rounded-full bg-white/25 text-sm font-medium tracking-wide">
                      {cat.activities.length} atividades
                    </div>
                  </div>

                  {/* Borda de destaque quando selecionado */}
                  {index === selectedCatIndex && (
                    <div className="absolute inset-0 rounded-[28px] ring-1 ring-white/60 ring-offset-4 ring-offset-[#f8f5f0]" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === CARROSSEL DE ATIVIDADES - COVER FLOW 3D === */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <div>
              <div className="text-[15px] font-semibold tracking-[-0.2px] text-[#1f1810]">
                {selectedCategory.name}
              </div>
              <div className="text-[12px] text-[#8b7a65]">Toque para selecionar</div>
            </div>
            <div className="text-[11px] px-3 py-1 rounded-full bg-[#f0e9d9] text-[#8b7a65]">
              {selectedCategory.activities.length} opções
            </div>
          </div>

          <div 
            ref={actContainerRef}
            className="flex gap-4 overflow-x-auto pb-8 pt-4 px-4 snap-x snap-mandatory"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              perspective: '1200px'
            }}
          >
            {selectedCategory.activities.map((act, idx) => {
              const isCenter = idx === Math.floor(selectedCategory.activities.length / 2);
              return (
                <div
                  key={act.id}
                  onClick={() => handleActivityClick(act)}
                  className="flex-shrink-0 snap-center cursor-pointer transition-all duration-500 ease-out active:scale-[0.985]"
                  style={{
                    width: '195px',
                    height: '235px',
                    transform: isCenter 
                      ? 'perspective(1000px) translateZ(0) scale(1.03) rotateY(0deg)' 
                      : `perspective(1000px) translateZ(-60px) scale(0.9) rotateY(${idx % 2 === 0 ? -22 : 22}deg)`,
                    opacity: isCenter ? 1 : 0.85,
                    zIndex: isCenter ? 20 : 10,
                  }}
                >
                  <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl border border-white/30 bg-[#1f1810]">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/10 to-transparent" />
                    
                    <div className="relative h-full flex flex-col items-center justify-center p-7 text-white">
                      <div className="text-[62px] mb-5 drop-shadow-lg">{act.emoji}</div>
                      <div className="text-[21px] font-semibold tracking-[-0.6px] text-center leading-tight mb-1.5">
                        {act.name}
                      </div>
                      <div className="text-xs text-white/60 mb-4 tracking-wide">{act.subtitle}</div>
                      
                      <div 
                        className="px-4 py-px rounded-full text-xs font-medium tracking-wider"
                        style={{ 
                          background: selectedCategory.dotBg, 
                          color: selectedCategory.dotColor 
                        }}
                      >
                        {act.time}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal de atividade selecionada */}
      {selectedAct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-6" onClick={() => setSelectedAct(null)}>
          <div 
            className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-[78px] mb-6">{selectedAct.emoji}</div>
            <div className="text-4xl font-semibold tracking-[-1px] mb-2 text-[#1f1810]">{selectedAct.name}</div>
            <div className="text-[#8b7a65] text-lg mb-8">{selectedAct.time}</div>
            
            <button 
              onClick={() => setSelectedAct(null)}
              className="px-10 py-4 bg-[#1f1810] text-white rounded-2xl text-sm font-medium tracking-wider hover:bg-black active:bg-[#111] transition-all"
            >
              FECHAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export const EXAMPLE_CATEGORIES = CATEGORIAS;
