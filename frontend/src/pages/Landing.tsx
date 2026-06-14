// Atualizado: 14/06 20:30
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DualCarousel, EXAMPLE_CATEGORIES } from '../components/DualCarousel';

const Landing = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f5f0', color: '#1f1810', fontFamily: 'inherit' }}>

      {/* ── Navigation ── */}
      <nav style={{
        borderBottom: '1px solid #e8dcc6',
        background: 'rgba(248,245,240,0.96)',
        backdropFilter: 'blur(20px)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 1rem' : '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: isMobile ? 60 : 72 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, background: '#1f1810', borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#f8f5f0', fontSize: 18, fontFamily: 'Georgia, serif', fontWeight: 700 }}>R</span>
            </div>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? 16 : 20, letterSpacing: -1, fontWeight: 600, display: isMobile ? 'none' : 'inline' }}>Rotina em Casa</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 8 }}>
            {!isMobile && (
              <>
                <button
                  onClick={() => scrollToSection('como-funciona')}
                  style={{ padding: '8px 20px', color: '#6b5c4a', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 14 }}
                >
                  Como funciona
                </button>
                <button
                  onClick={() => scrollToSection('demo')}
                  style={{ padding: '8px 20px', color: '#6b5c4a', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 14 }}
                >
                  Demo
                </button>
                <button
                  onClick={() => (window.location.href = '/login')}
                  style={{ padding: '8px 24px', border: '1px solid #d4c3a3', borderRadius: 12, background: 'transparent', cursor: 'pointer', fontSize: 14 }}
                >
                  Entrar
                </button>
              </>
            )}
            <button
              onClick={() => (window.location.href = '/cadastro')}
              style={{ padding: isMobile ? '8px 16px' : '8px 24px', border: 'none', borderRadius: 12, background: '#1f1810', color: 'white', cursor: 'pointer', fontSize: isMobile ? 12 : 14, fontWeight: 600 }}
            >
              {isMobile ? 'Começar' : 'Começar grátis'}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        {/* decorative background blobs */}
        <div style={{
          position: 'absolute', top: -120, right: -80, width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(224,122,95,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          display: isMobile ? 'none' : 'block',
        }} />
        <div style={{
          position: 'absolute', bottom: -100, left: -80, width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,158,122,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
          display: isMobile ? 'none' : 'block',
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '35%', width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(176,137,104,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          display: isMobile ? 'none' : 'block',
        }} />

        <div style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '3rem 1.5rem 2.5rem' : '5rem 2rem 4rem', textAlign: 'center', position: 'relative' }}>

          {/* badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 18px', borderRadius: 999,
            background: 'white', border: '1px solid #e8dcc6',
            fontSize: isMobile ? 9 : 11, letterSpacing: 2, color: '#6b5c4a',
            marginBottom: isMobile ? 24 : 36, fontWeight: 600,
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
            {isMobile ? 'MAIS DE 2.4K FAMÍLIAS' : 'MAIS DE 2.400 FAMÍLIAS JÁ ORGANIZARAM SUA ROTINA'}
          </div>

          {/* headline */}
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: isMobile ? 'clamp(32px, 8vw, 48px)' : 'clamp(56px, 8vw, 96px)',
            lineHeight: 0.92,
            letterSpacing: 'clamp(-2px, -0.06em, -6px)',
            margin: '0 0 20px',
            fontWeight: 400,
          }}>
            A rotina da sua<br />
            casa, finalmente<br />
            <em style={{ fontStyle: 'normal', color: '#8b7a65' }}>em ordem.</em>
          </h1>

          <p style={{
            fontSize: isMobile ? 16 : 20, color: '#6b5c4a', maxWidth: 480, margin: '0 auto 32px',
            lineHeight: 1.65, letterSpacing: -0.2,
          }}>
            Uma forma bonita e simples de organizar tarefas em família.
            <br />Sem brigas. Sem esquecimento.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => (window.location.href = '/cadastro')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                background: '#1f1810', color: 'white',
                padding: '14px 32px', borderRadius: 16,
                fontSize: isMobile ? 12 : 13, letterSpacing: 2, fontWeight: 700, border: 'none', cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(31,24,16,0.25)',
                transition: 'transform 200ms, box-shadow 200ms',
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'translateY(-2px)'; (e.target as HTMLElement).style.boxShadow = '0 12px 32px rgba(31,24,16,0.35)'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.transform = ''; (e.target as HTMLElement).style.boxShadow = '0 8px 24px rgba(31,24,16,0.25)'; }}
            >
              CRIAR ESCALA AGORA
              {!isMobile && <ArrowRight size={16} />}
            </button>
            {!isMobile && (
              <button
                onClick={() => scrollToSection('demo')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: 'white', color: '#1f1810',
                  padding: '14px 32px', borderRadius: 16,
                  fontSize: 13, letterSpacing: 2, fontWeight: 600,
                  border: '1px solid #d4c3a3', cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                }}
              >
                EXPERIMENTAR A DEMO
              </button>
            )}
          </div>

          {/* social proof row */}
          {!isMobile && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 24, marginTop: 52, flexWrap: 'wrap',
            }}>
              {[
                { value: '2.4k+', label: 'famílias ativas' },
                { value: '8+', label: 'categorias' },
                { value: '350+', label: 'atividades prontas' },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1, color: '#1f1810', fontFamily: 'Georgia, serif' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 12, color: '#8b7a65', letterSpacing: 0.5, marginTop: 2 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── DEMO INTERATIVA ── */}
      <section id="demo" style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '2rem 1rem 3rem' : '0 1.5rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 24 : 40 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: '#8b7a65', marginBottom: 12, fontWeight: 700 }}>
            EXPERIMENTE AGORA
          </div>
          <h2 style={{
            fontFamily: 'Georgia, serif', fontSize: isMobile ? 'clamp(24px, 6vw, 40px)' : 'clamp(36px, 5vw, 58px)',
            letterSpacing: -2, margin: 0, lineHeight: 1.1, fontWeight: 400,
          }}>
            Arraste, explore,<br />
            <span style={{ color: '#8b7a65' }}>escolha sua rotina.</span>
          </h2>
          <p style={{ color: '#8b7a65', marginTop: isMobile ? 12 : 16, fontSize: isMobile ? 14 : 17, maxWidth: 500, margin: isMobile ? '12px auto 0' : '14px auto 0' }}>
            Clique numa categoria e role as atividades para descobrir o que encaixa no seu dia.
          </p>
        </div>

        {/* carousel container — elevated card */}
        <div style={{
          background: 'white',
          borderRadius: 32,
          border: '1px solid #e8dcc6',
          boxShadow: '0 32px 100px rgba(0,0,0,0.10), 0 8px 32px rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}>
          <DualCarousel
            categories={EXAMPLE_CATEGORIES}
            isMobile={isMobile}
            onActivitySelect={() => { window.location.href = '/cadastro'; }}
          />
        </div>
      </section>

      {/* ── Como funciona ── */}
      <section id="como-funciona" style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 1rem 3rem' : '0 2rem 6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 56 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: '#8b7a65', marginBottom: 12, fontWeight: 700 }}>
            SIMPLES E EFICAZ
          </div>
          <h2 style={{
            fontFamily: 'Georgia, serif', fontSize: isMobile ? 'clamp(24px, 6vw, 40px)' : 'clamp(36px, 5vw, 58px)',
            letterSpacing: -2, margin: 0, fontWeight: 400,
          }}>
            Três passos.<br />
            <span style={{ color: '#8b7a65' }}>Zero dor de cabeça.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {[
            { num: '01', title: 'Escolha as categorias', desc: 'Saúde, Estudos, Fé, Casa, Lazer, Trabalho, Amigos ou Família. Escolha o que importa para você.', color: '#e07a5f' },
            { num: '02', title: 'Selecione as atividades', desc: 'Cada categoria tem dezenas de atividades prontas. Role o carousel e escolha as que fazem sentido.', color: '#4a9e7a' },
            { num: '03', title: 'Defina os dias', desc: 'Marque em quais dias da semana cada atividade deve acontecer. Sua rotina fica pronta em minutos.', color: '#b08968' },
          ].map((step, i) => (
            <div key={i} style={{
              background: 'white', border: '1px solid #e8dcc6', borderRadius: 28, padding: isMobile ? '2rem 1.5rem' : '2.5rem 2rem',
              boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
            }}>
              <div style={{
                fontSize: isMobile ? 40 : 56, fontFamily: 'Georgia, serif', fontWeight: 400,
                color: '#e8dcc6', letterSpacing: -2, marginBottom: 24, lineHeight: 1,
              }}>
                {step.num}
              </div>
              <div style={{
                width: 40, height: 4, borderRadius: 999,
                background: step.color, marginBottom: 20,
              }} />
              <div style={{ fontSize: isMobile ? 18 : 20, fontWeight: 700, letterSpacing: -0.5, marginBottom: 12 }}>
                {step.title}
              </div>
              <p style={{ color: '#6b5c4a', lineHeight: 1.65, fontSize: isMobile ? 14 : 15, margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      {!isMobile && (
        <section style={{ background: 'white', borderTop: '1px solid #e8dcc6', borderBottom: '1px solid #e8dcc6', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: '#8b7a65', fontWeight: 700 }}>
                O QUE AS FAMÍLIAS DIZEM
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {[
                { quote: 'Finalmente achei um jeito de organizar as tarefas da casa sem conflito. Minha família toda usa!', author: 'Mariana S.', city: 'São Paulo' },
                { quote: 'O carousel de atividades é incrível. Consegui montar minha rotina de saúde em 5 minutos.', author: 'Roberto A.', city: 'Curitiba' },
                { quote: 'Uso para organizar a rotina dos filhos. Nunca mais esquecemos de nada importante.', author: 'Fernanda L.', city: 'Porto Alegre' },
              ].map((t, i) => (
                <div key={i} style={{
                  padding: '2rem', borderRadius: 24,
                  background: '#f8f5f0', border: '1px solid #e8dcc6',
                }}>
                  <div style={{ fontSize: 28, color: '#d4c3a3', lineHeight: 1, marginBottom: 12, fontFamily: 'Georgia, serif' }}>\"</div>
                  <p style={{ color: '#1f1810', fontSize: 15, lineHeight: 1.7, margin: '0 0 20px', fontStyle: 'italic' }}>
                    {t.quote}
                  </p>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#1f1810' }}>{t.author}</div>
                  <div style={{ fontSize: 12, color: '#8b7a65', marginTop: 2 }}>{t.city}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Final ── */}
      <section style={{ background: '#1f1810', padding: isMobile ? '3rem 1.5rem' : '6rem 2rem', position: 'relative', overflow: 'hidden' }}>
        {/* decorative elements */}
        <div style={{
          position: 'absolute', top: -60, right: -60, width: 320, height: 320,
          borderRadius: '50%',
          background: 'rgba(224,122,95,0.10)',
          pointerEvents: 'none',
          display: isMobile ? 'none' : 'block',
        }} />
        <div style={{
          position: 'absolute', bottom: -80, left: -60, width: 280, height: 280,
          borderRadius: '50%',
          background: 'rgba(74,158,122,0.08)',
          pointerEvents: 'none',
          display: isMobile ? 'none' : 'block',
        }} />

        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <h2 style={{
            fontFamily: 'Georgia, serif', fontSize: isMobile ? 'clamp(28px, 6vw, 48px)' : 'clamp(36px, 5vw, 60px)',
            letterSpacing: -2, margin: '0 0 20px', fontWeight: 400, color: 'white', lineHeight: 1.1,
          }}>
            Pronto para organizar<br />sua casa?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: isMobile ? 16 : 18, marginBottom: isMobile ? 24 : 36 }}>
            Comece grátis. Sem cartão de crédito.
          </p>
          <button
            onClick={() => (window.location.href = '/cadastro')}
            style={{
              padding: isMobile ? '12px 32px' : '16px 48px', borderRadius: 16, border: 'none', cursor: 'pointer',
              background: 'white', color: '#1f1810',
              fontSize: isMobile ? 12 : 13, letterSpacing: 2, fontWeight: 700,
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            }}
          >
            CRIAR MINHA CONTA AGORA
          </button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
