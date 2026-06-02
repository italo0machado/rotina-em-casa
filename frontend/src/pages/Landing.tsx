import { 
  Calendar, Users, Clock, Target, CheckCircle, ArrowRight, 
  Home, Heart, Zap 
} from 'lucide-react';

const Landing = () => {
  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4" />
            </div>
            <span className="font-semibold text-lg">Rotina em Casa</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={scrollToCTA}
              className="px-4 py-2 text-sm font-medium hover:text-emerald-400 transition-colors"
            >
              Entrar
            </button>
            <button 
              onClick={scrollToCTA}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-medium transition-colors"
            >
              Começar grátis
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-white/70">Plataforma #1 de rotinas domésticas</span>
          </div>
          
          <h1 className="text-7xl font-semibold tracking-tighter leading-none mb-6">
            Organize sua casa.<br />Sem estresse.
          </h1>
          
          <p className="text-2xl text-white/60 max-w-2xl mx-auto mb-10">
            Crie escalas visuais de tarefas domésticas de forma simples e moderna. 
            Divida responsabilidades com clareza.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={scrollToCTA}
              className="group px-8 py-4 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-lg font-medium flex items-center gap-3 transition-all active:scale-[0.985]"
            >
              Começar gratuitamente
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition" />
            </button>
            <button 
              onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
              className="px-8 py-4 border border-white/20 hover:bg-white/5 rounded-xl text-lg font-medium transition-colors"
            >
              Ver como funciona
            </button>
          </div>
          <p className="text-white/40 text-sm mt-4">Sem cartão de crédito • 14 dias grátis</p>
        </div>
      </section>

      {/* Problema Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="text-emerald-400 text-sm font-medium tracking-[3px] mb-3">O PROBLEMA</div>
          <h2 className="text-5xl font-semibold tracking-tight">A rotina em casa não precisa ser caótica</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Target, title: "Peso mental", desc: "Lembrar de todas as tarefas da casa é exaustivo e gera ansiedade." },
            { icon: Users, title: "Divisão injusta", desc: "Uma pessoa acaba carregando quase tudo. Isso gera frustração e conflitos." },
            { icon: Clock, title: "Rotina bagunçada", desc: "Sem estrutura visual, as tarefas se acumulam e viram bagunça." },
            { icon: Calendar, title: "Falta de visibilidade", desc: "Ninguém sabe quem faz o quê e quando. Comunicação falha." },
          ].map((item, index) => (
            <div key={index} className="card-hover bg-zinc-900 border border-white/10 rounded-2xl p-8">
              <div className="w-12 h-12 bg-emerald-950 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 tracking-tight">{item.title}</h3>
              <p className="text-white/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Como Funciona */}
      <section className="bg-zinc-900 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-emerald-400 text-sm font-medium tracking-[3px] mb-3">COMO FUNCIONA</div>
            <h2 className="text-5xl font-semibold tracking-tight">Três passos simples</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: "01", title: "Crie sua casa", desc: "Cadastre os membros da família e defina os cômodos." },
              { number: "02", title: "Monte a escala", desc: "Arraste e solte tarefas nos dias da semana de forma visual." },
              { number: "03", title: "Acompanhe tudo", desc: "Todos veem o que precisam fazer. Notificações automáticas." },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-[120px] font-bold text-white/5 absolute -top-8 -left-2 select-none">{step.number}</div>
                <div className="relative">
                  <h3 className="text-3xl font-semibold tracking-tight mb-4">{step.title}</h3>
                  <p className="text-xl text-white/60 leading-tight">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="text-emerald-400 text-sm font-medium tracking-[3px] mb-3">BENEFÍCIOS</div>
          <h2 className="text-5xl font-semibold tracking-tight">Resultados reais</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Heart, title: "Menos estresse", desc: "Todo mundo sabe exatamente o que fazer. Acabou a sobrecarga mental." },
            { icon: Users, title: "Mais equilíbrio", desc: "Divisão justa e transparente das tarefas entre todos os membros." },
            { icon: CheckCircle, title: "Mais organização", desc: "Visualização clara da rotina semanal. Tudo no lugar." },
          ].map((b, i) => (
            <div key={i} className="bg-zinc-900 border border-white/10 rounded-3xl p-10">
              <b.icon className="w-9 h-9 text-emerald-400 mb-8" />
              <h3 className="text-3xl font-semibold tracking-tight mb-4">{b.title}</h3>
              <p className="text-xl text-white/60">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="bg-zinc-900 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-emerald-400 text-sm font-medium tracking-[3px] mb-3">FUNCIONALIDADES</div>
          <h2 className="text-5xl font-semibold tracking-tight mb-4">Tudo que você precisa</h2>
          <p className="text-xl text-white/60 max-w-md mx-auto mb-12">Uma plataforma completa para gerenciar a rotina da sua casa.</p>

          <div className="grid md:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
            {[
              "Escalas visuais por semana",
              "Atribuição automática de tarefas",
              "Notificações por WhatsApp",
              "Histórico de tarefas realizadas",
              "Múltiplos membros da família",
              "Relatórios semanais",
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-zinc-950 border border-white/10 rounded-2xl px-6 py-5 text-lg">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="text-emerald-400 text-sm font-medium tracking-[3px] mb-3">DEPOIMENTOS</div>
          <h2 className="text-5xl font-semibold tracking-tight">Quem já usa ama</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Mariana Silva", role: "Mãe de 3 filhos • São Paulo", text: "Finalmente conseguimos dividir as tarefas de casa de forma justa. Meu marido agora faz a parte dele sem eu precisar lembrar." },
            { name: "Carlos Mendes", role: "Casal sem filhos • Rio de Janeiro", text: "A visualização semanal mudou tudo. Antes era bagunça, agora todo mundo sabe o que fazer. Recomendo muito." },
            { name: "Juliana Costa", role: "Família com 4 pessoas • Belo Horizonte", text: "O app é simples e bonito. Meu filho de 14 anos até participa das tarefas agora porque consegue ver o que ele precisa fazer." },
          ].map((t, i) => (
            <div key={i} className="bg-zinc-900 border border-white/10 rounded-3xl p-8">
              <p className="text-xl leading-tight mb-8">"{t.text}"</p>
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-white/50">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section id="cta" className="bg-emerald-950 py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-6xl font-semibold tracking-tighter mb-6">Pronto para organizar sua casa?</h2>
          <p className="text-2xl text-emerald-200/80 mb-10">Comece gratuitamente hoje mesmo.</p>
          
          <button 
            onClick={() => alert('Em breve: redirecionamento para cadastro')}
            className="px-10 py-5 bg-white text-emerald-950 hover:bg-white/90 rounded-2xl text-xl font-semibold transition-all active:scale-[0.985]"
          >
            Criar minha conta grátis
          </button>
          <p className="text-emerald-300/60 text-sm mt-6">14 dias grátis • Cancele quando quiser</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-white/10 py-10 px-6 text-center text-sm text-white/40">
        © {new Date().getFullYear()} Rotina em Casa — Feito com carinho para famílias organizadas.
      </footer>
    </div>
  );
};

export default Landing;