import { useEffect, useRef, useState } from "react";
import { atividades as todasAtividades } from "../data/atividades";

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

const STYLES = `... (mesmo CSS do código que você enviou) ...`;

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected) return;
  const el = document.createElement("style");
  el.textContent = STYLES;
  document.head.appendChild(el);
  stylesInjected = true;
}

interface DualCarouselProps {
  categories: Category[];
  fadeBg?: string;
  onCategoryChange?: (category: Category) => void;
  onActivitySelect?: (activity: Activity, category: Category) => void;
}

export function DualCarousel({
  categories,
  fadeBg = "var(--color-background-secondary, #f5f5f5)",
  onCategoryChange,
  onActivitySelect,
}: DualCarouselProps) {
  const [selIdx, setSelIdx] = useState(0);
  const catTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    const track = catTrackRef.current;
    if (!track) return;
    const item = track.children[selIdx] as HTMLElement | undefined;
    item?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [selIdx]);

  const selectedCat = categories[selIdx];

  function handleCatClick(idx: number) {
    setSelIdx(idx);
    onCategoryChange?.(categories[idx]);
  }

  function handleActClick(act: Activity) {
    onActivitySelect?.(act, selectedCat);
  }

  return (
    <div className="dc-root">
      {/* CATEGORIAS */}
      <div className="dc-cat-wrap">
        <div className="dc-cat-track" ref={catTrackRef}>
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              className="dc-cat-item"
              onClick={() => handleCatClick(i)}
              role="button"
              aria-label={`Categoria ${cat.name}`}
              aria-pressed={i === selIdx}
            >
              <div className="dc-cat-slide">
                <div
                  className={`dc-cat-card${i === selIdx ? " dc-sel" : ""}`}
                  style={{ background: cat.gradient }}
                >
                  <div className="dc-cat-glow" />
                  <div className="dc-cat-emoji">{cat.emoji}</div>
                  <div className="dc-cat-name">{cat.name}</div>
                  <div className="dc-cat-badge">{cat.activities.length} ativ.</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HERO */}
      {selectedCat && (
        <div className="dc-hero">
          <span className="dc-hero-emoji">{selectedCat.emoji}</span>
          <span className="dc-hero-name">{selectedCat.name}</span>
          <span className="dc-hero-count">
            · {selectedCat.activities.length} atividades
          </span>
        </div>
      )}

      {/* ATIVIDADES */}
      {selectedCat && (
        <div className="dc-act-outer" style={{ "--dc-fade": fadeBg } as React.CSSProperties}>
          <div className="dc-act-track">
            {selectedCat.activities.map((act) => (
              <div
                key={act.id}
                className="dc-act-item"
                onClick={() => handleActClick(act)}
                role="button"
                aria-label={`Atividade ${act.name}`}
              >
                <div className="dc-act-slide">
                  <div className="dc-act-card">
                    <div
                      className="dc-act-dot"
                      style={{ background: selectedCat.dotBg }}
                    >
                      <span>{act.emoji}</span>
                    </div>
                    <div className="dc-act-info">
                      <div className="dc-act-name">{act.name}</div>
                      <div className="dc-act-sub">
                        {act.subtitle ?? "Rotina diária"}
                      </div>
                    </div>
                    <div
                      className="dc-act-time"
                      style={{
                        background: selectedCat.dotBg,
                        color: selectedCat.dotColor,
                      }}
                    >
                      {act.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const EXAMPLE_CATEGORIES = CATEGORIAS;
