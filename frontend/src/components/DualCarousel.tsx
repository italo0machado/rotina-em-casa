// Atualizado: 14/06 20:30
import { useState, useRef, useEffect, useCallback } from 'react';
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
  gradientDark: string;
  accentBg: string;
  accentColor: string;
  activities: Activity[];
}

const EMOJIS: Record<string, string[]> = {
  'Saúde':    ['🌅','💧','🤸','🧘','🏃','💪','🏊','🚴','🧎','🧖','💆','🥗','🏋️','🧗','🤽','⛹️','🚶','🏄','🧜','⛷️'],
  'Estudos':  ['📖','✏️','🔍','🗂️','🎧','💻','🌍','📝','📚','🧠','✍️','📐','📕','🧮','📊','📋','🔬','📜','🖋️','📎'],
  'Fé':       ['🙏','📿','🕯️','✝️','🕌','🕉️','☸️','🕎','🕊️','📖','🛐','🌿','💒','🔔','🙌','🌙','⭐','🌟','🏛️','🎵'],
  'Casa':     ['🏠','🧹','🧺','🪴','🛏️','🧽','🧴','🧼','🪟','🛋️','🪑','🍳','☕','🌊','🪣','🪞','💡','🔧','🛠️','🔩'],
  'Lazer':    ['🎨','🎮','🎵','🌿','📺','📚','🎭','🎪','🎳','🎬','🎤','🏕️','🎻','🎸','🎹','🎲','🃏','🎯','🎡','🎠'],
  'Trabalho': ['💼','📊','💻','📈','📋','🗓️','📞','✉️','📎','🖥️','📌','🗂️','🖊️','📤','📥','🖨️','🔑','💡','📡','🏢'],
  'Amigos':   ['👥','🎉','🍻','🎤','🎲','🏀','🎳','🎯','🎮','🍕','🎊','🤝','🎁','🍿','🌃','🎡','🏖️','🛶','⛺','🚀'],
  'Família':  ['👨‍👩‍👧','👨‍👩‍👧‍👦','👪','🧑‍🤝‍🧑','🤱','👶','🧒','👧','🏡','🍽️','🎂','🛀','🧸','🎠','🏞️','🌅','📷','💝','🫶','🤗'],
};

const CATEGORIAS: Category[] = [
  { id: 'saude',    name: 'Saúde',    emoji: '❤️',      gradient: 'linear-gradient(145deg,#e07a5f,#f4a5a0)',  gradientDark: 'linear-gradient(145deg,#c45d44,#e07a5f)', accentBg: '#fee2e2', accentColor: '#9f1239' },
  { id: 'estudos',  name: 'Estudos',  emoji: '📚',      gradient: 'linear-gradient(145deg,#4a9e7a,#81b29a)',  gradientDark: 'linear-gradient(145deg,#2d7a59,#4a9e7a)', accentBg: '#dcfce7', accentColor: '#14532d' },
  { id: 'fe',       name: 'Fé',       emoji: '🙏',      gradient: 'linear-gradient(145deg,#b08968,#d4a87a)',  gradientDark: 'linear-gradient(145deg,#8a6748,#b08968)', accentBg: '#fef3c7', accentColor: '#78350f' },
  { id: 'casa',     name: 'Casa',     emoji: '🏠',      gradient: 'linear-gradient(145deg,#6d6875,#9c8fa8)',  gradientDark: 'linear-gradient(145deg,#4d4856,#6d6875)', accentBg: '#f3e8ff', accentColor: '#581c87' },
  { id: 'lazer',    name: 'Lazer',    emoji: '🎨',      gradient: 'linear-gradient(145deg,#d4a017,#e9c46a)',  gradientDark: 'linear-gradient(145deg,#a87c10,#d4a017)', accentBg: '#fef9c3', accentColor: '#713f12' },
  { id: 'trabalho', name: 'Trabalho', emoji: '💼',      gradient: 'linear-gradient(145deg,#2563a8,#3b82f6)',  gradientDark: 'linear-gradient(145deg,#1a4b8a,#2563a8)', accentBg: '#dbeafe', accentColor: '#1e3a8a' },
  { id: 'amigos',   name: 'Amigos',   emoji: '👥',      gradient: 'linear-gradient(145deg,#d4620a,#f4844e)',  gradientDark: 'linear-gradient(145deg,#a84b08,#d4620a)', accentBg: '#ffedd5', accentColor: '#7c2d12' },
  { id: 'familia',  name: 'Família',  emoji: '👨‍👩‍👧',   gradient: 'linear-gradient(145deg,#0f8a7a,#2a9d8f)',  gradientDark: 'linear-gradient(145deg,#0a6a5c,#0f8a7a)', accentBg: '#d1fae5', accentColor: '#064e3b' },
].map(cat => ({
  ...cat,
  activities: todasAtividades
    .filter(a => a.categoria === cat.name)
    .map((a, i) => ({
      id: a.id.toString(),
      name: a.nome,
      emoji: (EMOJIS[cat.name] ?? ['✨'])[i % (EMOJIS[cat.name]?.length ?? 1)],
      time: `${a.duracao} min`,
      subtitle: 'Rotina diária',
    })),
}));

// ── Layout constants ───────────────────────────────────────
const CARD_H = 120;
const CARD_G = 8;
const ITEM_H = CARD_H + CARD_G;
const N_VIS  = 2.8; // mostra ~2.8 cards com centralização
const VIEW_H = Math.round(N_VIS * CARD_H + (Math.floor(N_VIS) - 1) * CARD_G);

interface DualCarouselProps {
  categories?: Category[];
  onCategoryChange?: (c: Category) => void;
  onActivitySelect?: (a: Activity, c: Category) => void;
  isMobile?: boolean;
}

export function DualCarousel({
  categories = CATEGORIAS,
  onCategoryChange,
  onActivitySelect,
  isMobile = false,
}: DualCarouselProps) {
  const [catIdx, setCatIdx] = useState(0);
  const [actIdx, setActIdx] = useState(0);
  const [selAct, setSelAct] = useState<Activity | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [wheelActive, setWheelActive] = useState(false);

  const catRef = useRef<HTMLDivElement>(null);
  const actRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const selectedCat = categories[catIdx];

  // ── sync actIdx from scroll — centraliza no meio da viewport ─────────────────────────────
  const syncAct = useCallback(() => {
    if (!actRef.current) return;
    // Calcula qual card está no centro da viewport
    const viewCenter = actRef.current.scrollTop + VIEW_H / 2;
    const idx = Math.round(viewCenter / ITEM_H) - Math.floor(N_VIS / 2);
    setActIdx(Math.max(0, Math.min(idx, selectedCat.activities.length - 1)));
  }, [selectedCat.activities.length]);

  useEffect(() => {
    const el = actRef.current;
    if (!el) return;
    const handler = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(syncAct);
    };
    el.addEventListener('scroll', handler, { passive: true });
    return () => el.removeEventListener('scroll', handler);
  }, [syncAct]);

  // ── wheel scroll for categories (desktop only) ─────────────────────
  useEffect(() => {
    if (isMobile) return;
    
    const handleWheel = (e: WheelEvent) => {
      if (!catRef.current) return;
      e.preventDefault();
      setWheelActive(true);
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const newIdx = Math.max(0, Math.min(catIdx + direction, categories.length - 1));
      if (newIdx !== catIdx) {
        selectCat(newIdx);
      }
      
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
      wheelTimeoutRef.current = setTimeout(() => setWheelActive(false), 500);
    };
    
    catRef.current?.addEventListener('wheel', handleWheel, { passive: false });
    return () => catRef.current?.removeEventListener('wheel', handleWheel);
  }, [catIdx, categories.length, isMobile]);

  useEffect(() => {
    setActIdx(0);
    if (actRef.current) {
      // Scroll para centralizar o primeiro item
      actRef.current.scrollTo({ top: -ITEM_H * Math.floor(N_VIS / 2), behavior: 'smooth' });
    }
  }, [catIdx]);

  // ── category select + scroll center ────────────────────
  const selectCat = (i: number) => {
    if (isDragging) return;
    setCatIdx(i);
    onCategoryChange?.(categories[i]);
    const el = catRef.current;
    if (el) {
      const child = el.children[i] as HTMLElement | undefined;
      if (child) {
        const target = child.offsetLeft + child.offsetWidth / 2 - el.offsetWidth / 2;
        el.scrollTo({ left: target, behavior: 'smooth' });
      }
    }
  };

  // ── drag on categories (horizontal) ────────────────────
  const handleCatMouseDown = (e: React.MouseEvent) => {
    setIsDragging(false);
    const startX    = e.pageX;
    const startLeft = catRef.current?.scrollLeft ?? 0;
    const move = (ev: MouseEvent) => {
      const dx = ev.pageX - startX;
      if (Math.abs(dx) > 6) setIsDragging(true);
      if (catRef.current) catRef.current.scrollLeft = startLeft - dx * 1.6;
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      setTimeout(() => setIsDragging(false), 100);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  // ── 3D perspective for category cards (horizontal) ─────
  const getCatStyle = (i: number): React.CSSProperties => {
    const d = i - catIdx;
    const a = Math.abs(d);
    if (a === 0) return {
      transform: 'rotateY(0deg) scale(1.05) translateZ(20px)',
      opacity: 1,
      zIndex: 50,
      filter: 'brightness(1.05)',
      transition: 'transform 450ms cubic-bezier(0.23,1,0.32,1), opacity 280ms ease, filter 280ms ease',
    };
    const ry = d < 0 ? -42 : 42;
    const sc = Math.max(0.68, 1 - a * 0.14);
    return {
      transform: `rotateY(${ry}deg) scale(${sc}) translateZ(0px)`,
      opacity: Math.max(0.25, 1 - a * 0.35),
      zIndex: 40 - a * 5,
      filter: `brightness(${Math.max(0.6, 1 - a * 0.15)})`,
      transition: 'transform 500ms cubic-bezier(0.23,1,0.32,1), opacity 360ms ease, filter 360ms ease',
    };
  };

  // ── 3D scale for activity cards (vertical snap) — centraliza no meio ─────────
  const getActStyle = (i: number): React.CSSProperties => {
    const d = i - actIdx;
    const absD = Math.abs(d);
    
    if (absD > 3) return { opacity: 0, pointerEvents: 'none', transform: 'scale(0.85)' };
    
    if (d === 0) return {
      transform: 'scale(1) translateX(0)',
      opacity: 1,
      boxShadow: '0 20px 50px rgba(0,0,0,0.30), 0 6px 18px rgba(0,0,0,0.15)',
      transition: 'transform 380ms cubic-bezier(0.23,1,0.32,1), opacity 280ms ease, box-shadow 380ms ease',
    };
    
    const sc = Math.max(0.78, 1 - absD * 0.075);
    const tx = d * 4;
    return {
      transform: `scale(${sc}) translateX(${tx}px)`,
      opacity: Math.max(0.35, 1 - absD * 0.25),
      boxShadow: `0 ${4 + absD * 2}px ${12 + absD * 4}px rgba(0,0,0,0.10)`,
      transition: 'transform 440ms cubic-bezier(0.23,1,0.32,1), opacity 340ms ease, box-shadow 440ms ease',
    };
  };

  // ── activity gradient (per-item variation) ──────────────
  const getActGradient = (cat: Category, i: number): string => {
    return i % 2 === 0 ? cat.gradient : cat.gradientDark;
  };

  return (
    <div className="w-full select-none" style={{ padding: isMobile ? '1.5rem 1rem 2rem' : '2rem 2rem 2.5rem' }}>
      {/* ── RESPONSIVE: stack on mobile, grid on desktop ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '2fr 3fr',
        gap: isMobile ? '1.5rem' : '2rem',
        alignItems: 'start',
      }}>

        {/* ── CATEGORIES COLUMN ── */}
        <div>
          {/* header */}
          <div style={{ marginBottom: '1rem', padding: '0 0.25rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8b7a65', marginBottom: 4 }}>
                Categorias
              </div>
              <div style={{ fontSize: isMobile ? 20 : 26, fontWeight: 700, letterSpacing: '-1px', color: '#1f1810', lineHeight: 1.1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {selectedCat.name}
              </div>
            </div>
            <div style={{ fontSize: 11, padding: '5px 12px', borderRadius: 999, background: '#f0e9d9', color: '#8b7a65', fontWeight: 600, flexShrink: 0 }}>
              {selectedCat.activities.length} ativ.
            </div>
          </div>

          {/* 3D cover-flow horizontal — scrollável no mobile ─────────────────────────────────*/}
          <div
            ref={catRef}
            onMouseDown={handleCatMouseDown}
            style={{
              display: 'flex',
              gap: 12,
              overflowX: 'auto',
              overflowY: 'hidden',
              paddingBottom: 20,
              paddingTop: 16,
              paddingLeft: isMobile ? 8 : 20,
              paddingRight: isMobile ? 8 : 20,
              scrollbarWidth: 'none',
              scrollSnapType: 'x mandatory',
              perspective: '1200px',
              perspectiveOrigin: 'center 60%',
              cursor: isMobile ? 'grab' : wheelActive ? 'default' : 'grab',
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth',
            }}
          >
            {categories.map((cat, i) => (
              <div
                key={cat.id}
                onClick={() => selectCat(i)}
                style={{
                  flexShrink: 0,
                  width: isMobile ? 140 : 160,
                  height: isMobile ? 200 : 220,
                  scrollSnapAlign: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  ...getCatStyle(i),
                }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 24,
                  overflow: 'hidden',
                  position: 'relative',
                  background: cat.gradient,
                  boxShadow: i === catIdx
                    ? '0 24px 60px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.20)'
                    : '0 8px 24px rgba(0,0,0,0.20)',
                  border: '1px solid rgba(255,255,255,0.25)',
                }}>
                  {/* gloss overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(160deg, rgba(255,255,255,0.28) 0%, transparent 55%, rgba(0,0,0,0.18) 100%)',
                  }} />
                  {/* content */}
                  <div style={{
                    position: 'relative', height: '100%',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    padding: '1.5rem 1rem',
                    color: 'white',
                    gap: 6,
                  }}>
                    <div style={{ fontSize: isMobile ? 48 : 64, lineHeight: 1, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.30))' }}>
                      {cat.emoji}
                    </div>
                    <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, letterSpacing: -0.8, textShadow: '0 1px 3px rgba(0,0,0,0.35)' }}>
                      {cat.name}
                    </div>
                    <div style={{
                      padding: '4px 12px', borderRadius: 999,
                      background: 'rgba(255,255,255,0.22)', fontSize: 10,
                      fontWeight: 600, letterSpacing: 0.5,
                    }}>
                      {cat.activities.length} ativ.
                    </div>
                  </div>
                  {/* active ring */}
                  {i === catIdx && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      borderRadius: 24, pointerEvents: 'none',
                      boxShadow: 'inset 0 0 0 2.5px rgba(255,255,255,0.8)',
                    }} />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* dots — escondidos no mobile */}
          {!isMobile && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: -8 }}>
              {categories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => selectCat(i)}
                  style={{
                    borderRadius: 999, border: 'none', cursor: 'pointer', padding: 0,
                    width: i === catIdx ? 20 : 6, height: 6,
                    background: i === catIdx ? '#1f1810' : '#d4c9b3',
                    transition: 'all 300ms ease',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── ACTIVITIES COLUMN ── */}
        <div>
          {/* header */}
          <div style={{ marginBottom: '1rem', padding: '0 0.25rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8b7a65', marginBottom: 4 }}>
                Atividades
              </div>
              <div style={{
                fontSize: isMobile ? 16 : 20, fontWeight: 700, letterSpacing: '-0.6px', lineHeight: 1.2,
                color: selectedCat.accentColor, overflow: 'hidden',
                display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical',
              }}>
                {selectedCat.activities[actIdx]?.name ?? '—'}
              </div>
            </div>
            <div style={{ fontSize: 11, padding: '5px 12px', borderRadius: 999, background: '#f0e9d9', color: '#8b7a65', fontWeight: 600, flexShrink: 0, whiteSpace: 'nowrap' }}>
              {actIdx + 1} / {selectedCat.activities.length}
            </div>
          </div>

          {/* scroll window — com padding para centralizar o item */}
          <div style={{ height: VIEW_H, overflow: 'hidden', position: 'relative' }}>
            <div
              ref={actRef}
              style={{
                height: '100%',
                overflowY: 'auto',
                scrollbarWidth: 'none',
                scrollSnapType: 'y mandatory',
                paddingTop: ITEM_H * Math.floor(N_VIS / 2),
                paddingBottom: ITEM_H * Math.floor(N_VIS / 2),
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {selectedCat.activities.map((act, i) => (
                <div
                  key={act.id}
                  onClick={() => { if (!isDragging) { setSelAct(act); onActivitySelect?.(act, selectedCat); } }}
                  style={{
                    height: CARD_H,
                    marginBottom: CARD_G,
                    scrollSnapAlign: 'center',
                    borderRadius: 20,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: getActGradient(selectedCat, i),
                    position: 'relative',
                    ...getActStyle(i),
                  }}
                >
                  {/* dark-to-transparent overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(100deg, rgba(0,0,0,0.35) 0%, transparent 60%)',
                  }} />
                  {/* content */}
                  <div style={{
                    position: 'relative', height: '100%',
                    display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 16, padding: isMobile ? '0 16px' : '0 24px',
                  }}>
                    <div style={{ fontSize: isMobile ? 36 : 44, lineHeight: 1, filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.25))', flexShrink: 0 }}>
                      {act.emoji}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontWeight: 700, fontSize: isMobile ? 16 : 18, letterSpacing: -0.4, lineHeight: 1.2,
                        color: 'white', textShadow: '0 1px 4px rgba(0,0,0,0.25)',
                      }}>
                        {act.name}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, marginTop: 2 }}>
                        {act.subtitle}
                      </div>
                    </div>
                    <div style={{
                      flexShrink: 0, padding: '6px 12px', borderRadius: 999,
                      background: selectedCat.accentBg, color: selectedCat.accentColor,
                      fontSize: 11, fontWeight: 700, letterSpacing: 0.5, whiteSpace: 'nowrap',
                    }}>
                      {act.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* fade edges — ajustadas para centralização */}
            <div style={{
              pointerEvents: 'none', position: 'absolute', top: 0, left: 0, right: 0,
              height: CARD_H * 0.8,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.95), transparent)',
            }} />
            <div style={{
              pointerEvents: 'none', position: 'absolute', bottom: 0, left: 0, right: 0,
              height: CARD_H * 0.8,
              background: 'linear-gradient(to top, rgba(255,255,255,0.95), transparent)',
            }} />
          </div>

          {/* progress bar */}
          <div style={{ marginTop: 16, height: 3, background: '#e8dcc6', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 999,
              width: `${((actIdx + 1) / selectedCat.activities.length) * 100}%`,
              background: selectedCat.gradient,
              transition: 'width 300ms ease',
            }} />
          </div>
        </div>
      </div>

      {/* ── Activity Modal ── */}
      {selAct && (
        <div
          onClick={() => setSelAct(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(16px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'white', borderRadius: 28, padding: isMobile ? '2rem 1.5rem' : '3rem 2.5rem',
              maxWidth: 360, width: '100%', textAlign: 'center',
              boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
            }}
          >
            <div style={{ fontSize: isMobile ? 56 : 72, lineHeight: 1, marginBottom: 16 }}>{selAct.emoji}</div>
            <div style={{ fontSize: isMobile ? 24 : 28, fontWeight: 700, letterSpacing: -1, color: '#1f1810', marginBottom: 6 }}>{selAct.name}</div>
            <div style={{ color: '#8b7a65', fontSize: 16, marginBottom: 28 }}>{selAct.time}</div>
            <button
              onClick={() => setSelAct(null)}
              style={{
                padding: '12px 40px', borderRadius: 16, border: 'none', cursor: 'pointer',
                background: '#1f1810', color: 'white', fontSize: 13, fontWeight: 700,
                letterSpacing: 2,
              }}
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
