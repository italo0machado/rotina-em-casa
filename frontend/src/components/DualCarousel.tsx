// Atualizado: 06/06 22:18
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
    id: "saude", name: "Saúde", emoji: "❤️",
    gradient: "linear-gradient(135deg,#e07a5f,#fda4af)",
    dotBg: "#fee2e2", dotColor: "#9f1239",
    activities: todasAtividades.filter(a => a.categoria === "Saúde").map((a, i) => ({
      id: a.id.toString(), name: a.nome,
      emoji: ["🌅","💧","🤸","🧘","📝","🌬️","✨","📓","🏃","🧘‍♀️","💪","🧴","🧘‍♂️","🏊","🚴","🧎","🧖","💆","🦵","🧠"][i % 20],
      time: `${a.duracao} min`, subtitle: "Rotina diária"
    }))
  },
  {
    id: "estudos", name: "Estudos", emoji: "📚",
    gradient: "linear-gradient(135deg,#81b29a,#a5d6a7)",
    dotBg: "#e8f5e9", dotColor: "#1b5e20",
    activities: todasAtividades.filter(a => a.categoria === "Estudos").map((a, i) => ({
      id: a.id.toString(), name: a.nome,
      emoji: ["📖","✏️","🔍","🗂️","🎧","💻","🌍","📝","📚","🧠","✍️","📐","📕","🧮","📊","📋","🔬","📜","🖋️","📎"][i % 20],
      time: `${a.duracao} min`, subtitle: "Rotina diária"
    }))
  },
  {
    id: "fe", name: "Fé", emoji: "🙏",
    gradient: "linear-gradient(135deg,#b08968,#d2b48c)",
    dotBg: "#fef3c7", dotColor: "#78350f",
    activities: todasAtividades.filter(a => a.categoria === "Fé").map((a, i) => ({
      id: a.id.toString(), name: a.nome,
      emoji: ["🙏","📿","🕯️","✝️","🕌","🕉️","☸️","🕎","🕊️","📖","🙏","🕯️","🛐","📿","🕯️","🙏","🕌","🕉️","☸️","🕎"][i % 20],
      time: `${a.duracao} min`, subtitle: "Rotina diária"
    }))
  },
  {
    id: "casa", name: "Casa", emoji: "🏠",
    gradient: "linear-gradient(135deg,#6d6875,#9ca3af)",
    dotBg: "#f3e8ff", dotColor: "#581c87",
    activities: todasAtividades.filter(a => a.categoria === "Casa").map((a, i) => ({
      id: a.id.toString(), name: a.nome,
      emoji: ["🏠","🧹","🧺","🪴","🛏️","🧽","🧴","🧺","🧼","🪟","🛋️","🧺","🪑","🧹","🧺","🛏️","🪴","🧽","🧴","🧺"][i % 20],
      time: `${a.duracao} min`, subtitle: "Rotina diária"
    }))
  },
  {
    id: "lazer", name: "Lazer", emoji: "🎨",
    gradient: "linear-gradient(135deg,#e9c46a,#fcd34d)",
    dotBg: "#fef3c7", dotColor: "#78350f",
    activities: todasAtividades.filter(a => a.categoria === "Lazer").map((a, i) => ({
      id: a.id.toString(), name: a.nome,
      emoji: ["🎨","🎮","🎵","🌿","📺","📚","🎭","🎪","🎳","🎬","🎤","🏕️","🎨","🎮","🎵","🌿","📺","🎭","🎪","🎳"][i % 20],
      time: `${a.duracao} min`, subtitle: "Rotina diária"
    }))
  },
  {
    id: "trabalho", name: "Trabalho", emoji: "💼",
    gradient: "linear-gradient(135deg,#457b9d,#60a5fa)",
    dotBg: "#dbeafe", dotColor: "#1e3a8a",
    activities: todasAtividades.filter(a => a.categoria === "Trabalho").map((a, i) => ({
      id: a.id.toString(), name: a.nome,
      emoji: ["💼","📊","💻","📈","📋","🗓️","📞","✉️","📎","🖥️","📌","🗂️","💼","📊","💻","📈","📋","🗓️","📞","✉️"][i % 20],
      time: `${a.duracao} min`, subtitle: "Rotina diária"
    }))
  },
  {
    id: "amigos", name: "Amigos", emoji: "👥",
    gradient: "linear-gradient(135deg,#f4a261,#fb923c)",
    dotBg: "#ffedd5", dotColor: "#7c2d12",
    activities: todasAtividades.filter(a => a.categoria === "Amigos").map((a, i) => ({
      id: a.id.toString(), name: a.nome,
      emoji: ["👥","🎉","🍻","🎤","🎲","🏀","🎳","🎯","🎮","🍕","🎤","🎉","👥","🎉","🍻","🎤","🎲","🏀","🎳","🎯"][i % 20],
      time: `${a.duracao} min`, subtitle: "Rotina diária"
    }))
  },
  {
    id: "familia", name: "Família", emoji: "👨‍👩‍👧",
    gradient: "linear-gradient(135deg,#2a9d8f,#5eead4)",
    dotBg: "#d1fae5", dotColor: "#064e3b",
    activities: todasAtividades.filter(a => a.categoria === "Família").map((a, i) => ({
      id: a.id.toString(), name: a.nome,
      emoji: ["👨‍👩‍👧","👨‍👩‍👧‍👦","👨‍👨‍👧","👩‍👩‍👧","👨‍👩‍👧‍👦","🧑‍🤝‍🧑","👪","👨‍👩‍👧‍👦","🧑‍🧑‍🧒","👨‍👧","👩‍👧","👨‍👩‍👧","👨‍👩‍👧","👨‍👩‍👧‍👦","👨‍👨‍👧","👩‍👩‍👧","👨‍👩‍👧‍👦","🧑‍🤝‍🧑","👪","👨‍👩‍👧‍👦"][i % 20],
      time: `${a.duracao} min`, subtitle: "Rotina diária"
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

  const catRef = useRef<HTMLDivElement>(null);
  const actRef = useRef<HTMLDivElement>(null);

  const selectedCategory = categories[selectedCatIndex];

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [dragTarget, setDragTarget] = useState<'cat' | 'act' | null>(null);

  const startDrag = (e: React.MouseEvent, target: 'cat' | 'act') => {
    const ref = target === 'cat' ? catRef : actRef;
    if (!ref.current) return;
    setIsDragging(true);
    setDragTarget(target);
    setStartX(e.pageX);
    setScrollStart(ref.current.scrollLeft);
  };

  const onDragMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragTarget) return;
    const ref = dragTarget === 'cat' ? catRef : actRef;
    if (!ref.current) return;
    const delta = e.pageX - startX;
    ref.current.scrollLeft = scrollStart - delta * 1.8;
  };

  const endDrag = () => {
    setIsDragging(false);
    setDragTarget(null);
  };

  const goToCategory = (index: number) => {
    if (isDragging) return;
    setSelectedCatIndex(index);
    onCategoryChange?.(categories[index]);

    const container = catRef.current;
    if (container) {
      const children = Array.from(container.children) as HTMLElement[];
      const target = children[index];
      if (target) {
        const containerWidth = container.offsetWidth;
        const targetCenter = target.offsetLeft + target.offsetWidth / 2;
        const scrollPos = targetCenter - containerWidth / 2;
        container.scrollTo({ left: scrollPos, behavior: 'smooth' });
      }
    }
  };

  const handleActivityClick = (activity: Activity) => {
    if (isDragging) return;
    setSelectedAct(activity);
    onActivitySelect?.(activity, selectedCategory);
  };

  const getCatStyle = (index: number) => {
    const dist = Math.abs(index - selectedCatIndex);
    const isActive = index === selectedCatIndex;

    if (isActive) {
      return {
        transform: 'perspective(1400px) translateZ(0) scale(1.06) rotateY(0deg)',
        opacity: 1,
        zIndex: 40,
        transition: 'transform 420ms cubic-bezier(0.23, 1.0, 0.32, 1), opacity 300ms ease'
      };
    }

    const rotate = index < selectedCatIndex ? -32 : 32;
    const scale = Math.max(0.78, 1 - dist * 0.095);
    const opacity = Math.max(0.55, 1 - dist * 0.22);

    return {
      transform: `perspective(1400px) translateZ(-90px) scale(${scale}) rotateY(${rotate}deg)`,
      opacity,
      zIndex: 30 - dist,
      transition: 'transform 520ms cubic-bezier(0.23, 1.0, 0.32, 1), opacity 400ms ease'
    };
  };

  const getActStyle = (index: number, total: number) => {
    const center = Math.floor(total / 2);
    const dist = Math.abs(index - center);
    const isCenter = index === center;

    if (isCenter) {
      return {
        transform: 'perspective(1200px) translateZ(10px) scale(1.04) rotateY(0deg)',
        opacity: 1,
        zIndex: 30,
        transition: 'transform 380ms cubic-bezier(0.23, 1.0, 0.32, 1)'
      };
    }

    const rotate = index < center ? -26 : 26;
    const scale = Math.max(0.82, 1 - dist * 0.07);

    return {
      transform: `perspective(1200px) translateZ(-70px) scale(${scale}) rotateY(${rotate}deg)`,
      opacity: Math.max(0.7, 1 - dist * 0.15),
      zIndex: 20 - dist,
      transition: 'transform 480ms cubic-bezier(0.23, 1.0, 0.32, 1)'
    };
  };

  return (
    <div className="w-full max-w-[1320px] mx-auto px-6 py-10 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* CATEGORIAS */}
        <div>
          <div className="mb-3 px-1 flex items-end justify-between">
            <div>
              <div className="text-[15px] font-semibold tracking-[-0.3px]">Categorias</div>
              <div className="text-[12px] text-[#8b7a65]">Arraste horizontalmente</div>
            </div>
            <div className="text-xs px-3.5 py-1 rounded-full bg-[#f0e9d9] text-[#8b7a65]">
              {selectedCategory.name}
            </div>
          </div>

          <div
            ref={catRef}
            className="flex gap-5 overflow-x-auto pb-9 pt-5 px-2 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', perspective: '1600px' }}
            onMouseDown={(e) => startDrag(e, 'cat')}
            onMouseMove={onDragMove}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
          >
            {categories.map((cat, index) => (
              <div
                key={cat.id}
                onClick={() => goToCategory(index)}
                className="flex-shrink-0 snap-center cursor-pointer"
                style={{ width: '245px', height: '318px', ...getCatStyle(index) }}
              >
                <div className="relative w-full h-full rounded-[26px] overflow-hidden shadow-2xl border border-white/50" style={{ background: cat.gradient }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10" />
                  <div className="relative h-full flex flex-col items-center justify-center p-9 text-white">
                    <div className="text-[76px] mb-6 drop-shadow-2xl">{cat.emoji}</div>
                    <div className="text-[34px] font-semibold tracking-[-1.8px] mb-3">{cat.name}</div>
                    <div className="px-6 py-1.5 rounded-full bg-white/20 text-sm tracking-wider font-medium">
                      {cat.activities.length} atividades
                    </div>
                  </div>
                  {index === selectedCatIndex && (
                    <div className="absolute inset-0 rounded-[26px] ring-1 ring-white/70 ring-offset-[6px] ring-offset-[#f8f5f0]" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ATIVIDADES - agora com todas as 40+ */}
        <div>
          <div className="mb-3 px-1 flex items-end justify-between">
            <div>
              <div className="text-[15px] font-semibold tracking-[-0.3px]">{selectedCategory.name}</div>
              <div className="text-[12px] text-[#8b7a65]">Arraste ou clique para escolher</div>
            </div>
            <div className="text-xs px-3.5 py-1 rounded-full bg-[#f0e9d9] text-[#8b7a65]">
              {selectedCategory.activities.length} opções
            </div>
          </div>

          <div
            ref={actRef}
            className="flex gap-4 overflow-x-auto pb-9 pt-5 px-2 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', perspective: '1300px' }}
            onMouseDown={(e) => startDrag(e, 'act')}
            onMouseMove={onDragMove}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
          >
            {selectedCategory.activities.map((act, index) => (
              <div
                key={act.id}
                onClick={() => handleActivityClick(act)}
                className="flex-shrink-0 snap-center cursor-pointer"
                style={{ width: '198px', height: '242px', ...getActStyle(index, selectedCategory.activities.length) }}
              >
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl border border-white/30 bg-[#1f1810]">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/10 to-transparent" />
                  <div className="relative h-full flex flex-col items-center justify-center p-7 text-white">
                    <div className="text-[64px] mb-5 drop-shadow-xl">{act.emoji}</div>
                    <div className="text-[20px] font-semibold tracking-[-0.5px] text-center leading-tight mb-1.5 px-2">
                      {act.name}
                    </div>
                    <div className="text-xs text-white/55 mb-4 tracking-wide">{act.subtitle}</div>
                    <div 
                      className="px-4 py-0.5 rounded-full text-xs font-medium tracking-wider"
                      style={{ background: selectedCategory.dotBg, color: selectedCategory.dotColor }}
                    >
                      {act.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedAct && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xl z-50 flex items-center justify-center p-6" onClick={() => setSelectedAct(null)}>
          <div className="bg-white rounded-3xl p-12 max-w-md w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-[86px] mb-7">{selectedAct.emoji}</div>
            <div className="text-[42px] font-semibold tracking-[-1.5px] mb-3 text-[#1f1810]">{selectedAct.name}</div>
            <div className="text-[#8b7a65] text-xl mb-9">{selectedAct.time}</div>
            <button onClick={() => setSelectedAct(null)} className="px-14 py-4 bg-[#1f1810] hover:bg-black active:bg-[#111] transition text-white rounded-2xl text-sm font-medium tracking-[0.5px]">
              FECHAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export const EXAMPLE_CATEGORIES = CATEGORIAS;
