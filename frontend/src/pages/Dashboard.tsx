// Atualizado: 14/06 20:45
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, MoreVertical, Copy, Trash2 } from 'lucide-react';

interface Escala {
  id: number;
  nome: string;
  dias: string[];
  totalAtividades: number;
  ultimaAtualizacao: string;
  tema?: string;
  criadaEm?: string;
}

const TEMAS = [
  { id: 'praia', nome: 'Praia', cor: '#e07a5f' },
  { id: 'floresta', nome: 'Floresta', cor: '#81b29a' },
  { id: 'espaco', nome: 'Espaço', cor: '#6b5b95' },
  { id: 'dinossauro', nome: 'Dinossauro', cor: '#f4a261' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [escalas, setEscalas] = useState<Escala[]>(() => {
    const saved = localStorage.getItem('escalas');
    if (saved) {
      try { return JSON.parse(saved); } catch { return []; }
    }
    return [
      {
        id: 1,
        nome: "Rotina da Semana",
        dias: ["Seg", "Ter", "Qua", "Qui", "Sex"],
        totalAtividades: 12,
        ultimaAtualizacao: "há 2 dias",
        tema: "praia",
        criadaEm: "10 de junho"
      },
      {
        id: 2,
        nome: "Escala da Clara",
        dias: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        totalAtividades: 8,
        ultimaAtualizacao: "há 1 semana",
        tema: "floresta",
        criadaEm: "5 de junho"
      }
    ];
  });

  const [showModal, setShowModal] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [temaSelecionado, setTemaSelecionado] = useState('praia');
  const [menuAberto, setMenuAberto] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('escalas', JSON.stringify(escalas));
  }, [escalas]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getTemaInfo = (temaId?: string) => {
    return TEMAS.find(t => t.id === temaId) || TEMAS[0];
  };

  const criarEscala = () => {
    if (!novoNome.trim()) return;

    const novaEscala: Escala = {
      id: Date.now(),
      nome: novoNome.trim(),
      dias: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
      totalAtividades: 0,
      ultimaAtualizacao: "agora",
      tema: temaSelecionado,
      criadaEm: new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long' }).format(new Date())
    };

    setEscalas([novaEscala, ...escalas]);
    setNovoNome('');
    setTemaSelecionado('praia');
    setShowModal(false);
    navigate(`/escala/${novaEscala.id}`);
  };

  const excluirEscala = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta escala?')) {
      setEscalas(escalas.filter(e => e.id !== id));
      setMenuAberto(null);
    }
  };

  const duplicarEscala = (escala: Escala) => {
    const novaEscala: Escala = {
      ...escala,
      id: Date.now(),
      nome: `${escala.nome} (Cópia)`,
      ultimaAtualizacao: "agora",
      criadaEm: new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long' }).format(new Date())
    };
    setEscalas([novaEscala, ...escalas]);
    setMenuAberto(null);
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-[#1f1810]">
      {/* Header */}
      <div className="border-b border-[#e8dcc6] bg-[#f8f5f0]/95 backdrop-blur sticky top-0 z-50">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 1rem' : '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: isMobile ? 60 : 80 }}>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? 20 : 28, letterSpacing: '-0.5px', fontWeight: 600 }}>Dashboard</div>
            <div style={{ fontSize: 12, color: '#8b7a65' }}>Suas escalas</div>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, paddingLeft: isMobile ? 12 : 24, paddingRight: isMobile ? 12 : 24,
              paddingTop: 10, paddingBottom: 10, background: '#1f1810', color: 'white', borderRadius: 16,
              fontSize: isMobile ? 12 : 14, fontWeight: 600, border: 'none', cursor: 'pointer',
              transition: 'background 200ms',
            }}
            onMouseEnter={(e) => isMobile ? null : (e.currentTarget.style.background = 'black')}
            onMouseLeave={(e) => isMobile ? null : (e.currentTarget.style.background = '#1f1810')}
          >
            <Plus className="w-4 h-4" /> {!isMobile && 'Nova escala'}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '2rem 1rem' : '3rem 2rem' }}>
        {escalas.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: isMobile ? 40 : 80, paddingBottom: isMobile ? 40 : 80 }}>
            <div style={{ fontSize: 56, marginBottom: 24 }}>📋</div>
            <div style={{ fontSize: isMobile ? 20 : 28, letterSpacing: '-0.5px', marginBottom: 12, fontFamily: 'Georgia, serif' }}>Nenhuma escala ainda</div>
            <p style={{ color: '#6b5c4a', marginBottom: 32 }}>Crie sua primeira escala e comece a organizar sua rotina.</p>
            <button 
              onClick={() => setShowModal(true)}
              style={{
                paddingLeft: 32, paddingRight: 32, paddingTop: 12, paddingBottom: 12,
                background: '#1f1810', color: 'white', borderRadius: 16, fontSize: isMobile ? 12 : 14,
                letterSpacing: '1px', border: 'none', cursor: 'pointer', fontWeight: 600,
              }}
            >
              CRIAR PRIMEIRA ESCALA
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {escalas.map((escala) => {
              const tema = getTemaInfo(escala.tema);
              return (
                <div 
                  key={escala.id}
                  style={{
                    background: 'white', border: '1px solid #e8dcc6', borderRadius: 24, padding: 28,
                    cursor: 'pointer', transition: 'all 300ms ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                      e.currentTarget.style.transform = '';
                    }
                  }}
                  onClick={() => navigate(`/escala/${escala.id}`)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div 
                      style={{
                        width: 12, height: 12, borderRadius: '50%', marginTop: 6,
                        backgroundColor: tema.cor,
                      }}
                    />
                    <div style={{ position: 'relative' }}>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuAberto(menuAberto === escala.id ? null : escala.id);
                        }}
                        style={{
                          padding: 8, color: '#8b7a65', border: 'none', background: 'transparent',
                          cursor: 'pointer', borderRadius: 8, transition: 'all 200ms',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#1f1810'; e.currentTarget.style.background = '#f0e9d9'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#8b7a65'; e.currentTarget.style.background = 'transparent'; }}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {menuAberto === escala.id && (
                        <div style={{
                          position: 'absolute', right: 0, marginTop: 4, width: 176,
                          background: 'white', border: '1px solid #e8dcc6', borderRadius: 16,
                          boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 50,
                        }}>
                          <button 
                            onClick={(e) => { e.stopPropagation(); duplicarEscala(escala); }}
                            style={{
                              display: 'flex', alignItems: 'center', gap: 12, width: '100%', paddingLeft: 16, paddingRight: 16,
                              paddingTop: 10, paddingBottom: 10, fontSize: 14, border: 'none', background: 'transparent',
                              cursor: 'pointer', color: '#1f1810', transition: 'background 200ms',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#f8f5f0'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            <Copy className="w-4 h-4" /> Duplicar
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); excluirEscala(escala.id); }}
                            style={{
                              display: 'flex', alignItems: 'center', gap: 12, width: '100%', paddingLeft: 16, paddingRight: 16,
                              paddingTop: 10, paddingBottom: 10, fontSize: 14, border: 'none', background: 'transparent',
                              cursor: 'pointer', color: '#dc2626', transition: 'background 200ms',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#fee2e2'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            <Trash2 className="w-4 h-4" /> Excluir
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600, letterSpacing: '-0.5px', marginBottom: 16, paddingRight: 32 }}>{escala.nome}</div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#8b7a65', marginBottom: 24 }}>
                    <Calendar className="w-4 h-4" />
                    {escala.dias.join(' • ')}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14, color: '#6b5c4a' }}>
                    <div>
                      <span style={{ fontWeight: 600 }}>{escala.totalAtividades}</span>
                      <span style={{ color: '#8b7a65' }}> atividades</span>
                    </div>
                    <div style={{ color: '#8b7a65' }}>{escala.ultimaAtualizacao}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Criar Escala */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 24,
        }}>
          <div style={{
            background: 'white', borderRadius: 24, width: '100%', maxWidth: 400,
            padding: 32,
          }}>
            <div style={{ fontWeight: 600, fontSize: 24, letterSpacing: '-0.5px', marginBottom: 32 }}>Nova escala</div>
            
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 14, color: '#8b7a65', marginBottom: 8 }}>Nome da escala</div>
              <input 
                type="text" 
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                placeholder="Ex: Rotina da Semana"
                style={{
                  width: '100%', border: '1px solid #e8dcc6', borderRadius: 16, paddingLeft: 20, paddingRight: 20,
                  paddingTop: 14, paddingBottom: 14, fontSize: 16, boxSizing: 'border-box',
                  outline: 'none', transition: 'border 200ms',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#1f1810'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#e8dcc6'}
                autoFocus
              />
            </div>

            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 14, color: '#8b7a65', marginBottom: 12 }}>Tema visual</div>
              <div style={{ display: 'flex', gap: 12 }}>
                {TEMAS.map(tema => (
                  <button
                    key={tema.id}
                    onClick={() => setTemaSelecionado(tema.id)}
                    style={{
                      flex: 1, paddingTop: 12, paddingBottom: 12, borderRadius: 16, fontSize: 14,
                      border: temaSelecionado === tema.id ? '2px solid #1f1810' : '1px solid #e8dcc6',
                      background: temaSelecionado === tema.id ? '#1f1810' : 'white',
                      color: temaSelecionado === tema.id ? 'white' : '#1f1810',
                      cursor: 'pointer', fontWeight: 600, transition: 'all 200ms',
                    }}
                  >
                    {tema.nome}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button 
                onClick={() => setShowModal(false)}
                style={{
                  flex: 1, paddingTop: 14, paddingBottom: 14, borderRadius: 16, border: '1px solid #e8dcc6',
                  background: 'white', color: '#1f1810', fontSize: 14, letterSpacing: '1px', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 200ms',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#f8f5f0'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; }}
              >
                CANCELAR
              </button>
              <button 
                onClick={criarEscala}
                disabled={!novoNome.trim()}
                style={{
                  flex: 1, paddingTop: 14, paddingBottom: 14, borderRadius: 16, background: '#1f1810',
                  color: 'white', fontSize: 14, letterSpacing: '1px', fontWeight: 600, border: 'none',
                  cursor: novoNome.trim() ? 'pointer' : 'not-allowed', opacity: novoNome.trim() ? 1 : 0.5,
                  transition: 'all 200ms',
                }}
                onMouseEnter={(e) => novoNome.trim() && (e.currentTarget.style.background = 'black')}
                onMouseLeave={(e) => novoNome.trim() && (e.currentTarget.style.background = '#1f1810')}
              >
                CRIAR ESCALA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
