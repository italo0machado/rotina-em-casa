import { ArrowRight, Users, Clock, Heart, Star } from 'lucide-react';

const Landing = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1f1810] font-light">
      {/* Navigation - Mobile friendly */}
      <nav className="border-b border-[#e8dcc6] bg-[#faf7f2]/95 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1f1810] rounded-2xl flex items-center justify-center">
              <span className="text-[#faf7f2] text-xl font-serif tracking-[-1px]">R</span>
            </div>
            <div className="font-serif text-2xl tracking-[-1.5px]">Rotina em Casa</div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3 text-sm">
            <button onClick={() => scrollToSection('como-funciona')} className="px-6 py-2.5 text-[#6b5c4a] hover:text-[#1f1810] transition">
              Como funciona
            </button>
            <button onClick={() => window.location.href = '/escala-spiral'} className="px-6 py-2.5 text-[#6b5c4a] hover:text-[#1f1810] transition">
              Ver a Espiral
            </button>
            <button onClick={() => window.location.href = '/login'} className="px-8 py-2.5 border border-[#d4c3a3] rounded-2xl hover:bg-white transition">
              Entrar
            </button>
            <button onClick={() => window.location.href = '/cadastro'} className="px-8 py-2.5 bg-[#1f1810] text-white rounded-2xl hover:bg-black transition">
              Começar grátis
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => window.location.href = '/login'} className="px-5 py-2 text-sm border border-[#d4c3a3] rounded-2xl">
              Entrar
            </button>
            <button onClick={() => window.location.href = '/cadastro'} className="px-5 py-2 text-sm bg-[#1f1810] text-white rounded-2xl">
              Criar conta
            </button>
          </div>
        </div>
      </nav>

      {/* Hero - Mobile optimized */}
      <section className="max-w-5xl mx-auto px-5 md:px-8 pt-16 md:pt-20 pb-20 md:pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#e8dcc6] mb-6 text-xs tracking-[1.5px]">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          MAIS DE 2.400 FAMÍLIAS
        </div>

        <h1 className="font-serif text-[56px] md:text-[92px] leading-[0.92] tracking-[-4px] md:tracking-[-6.5px] mb-6">
          A rotina da sua<br />casa, finalmente<br />em ordem.
        </h1>

        <p className="text-xl md:text-2xl text-[#6b5c4a] max-w-lg mx-auto mb-10 tracking-[-0.3px]">
          Uma forma bonita e simples de organizar tarefas em família.<br className="hidden md:block" /> Sem brigas. Sem esquecimento.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.location.href = '/cadastro'}
            className="group inline-flex items-center justify-center gap-3 bg-[#1f1810] text-white px-10 md:px-12 py-4 rounded-2xl text-sm tracking-[2px] hover:bg-black transition-all"
          >
            CRIAR MINHA ESCALA AGORA
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </button>
          <button 
            onClick={() => window.location.href = '/escala-spiral'}
            className="inline-flex items-center justify-center gap-3 border border-[#d4c3a3] px-10 py-4 rounded-2xl text-sm tracking-[2px] hover:bg-white transition-all"
          >
            EXPERIMENTAR A ESPIRAL
          </button>
        </div>

        <div className="mt-8 text-xs tracking-[3px] text-[#8b7a65]">14 DIAS GRÁTIS • SEM CARTÃO</div>
      </section>

      {/* Espiral destaque */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 pb-16 md:pb-20">
        <div className="bg-[#1f1810] rounded-3xl p-10 md:p-16 text-center text-white">
          <div className="max-w-md mx-auto">
            <div className="text-[#d4c3a3] text-xs tracking-[4px] mb-4">NOVIDADE</div>
            <h2 className="font-serif text-5xl md:text-6xl tracking-[-2px] leading-none mb-6">
              A Espiral.<br />Uma nova forma<br />de ver sua rotina.
            </h2>
            <p className="text-[#d4c3a3] text-lg mb-8">
              Arraste, gire e monte sua escala com 350 atividades reais.
            </p>
            <button 
              onClick={() => window.location.href = '/escala-spiral'}
              className="inline-flex items-center gap-3 border border-[#d4c3a3] text-[#d4c3a3] px-10 py-3.5 rounded-2xl text-sm tracking-[2px] hover:bg-white hover:text-[#1f1810] transition"
            >
              EXPERIMENTAR AGORA <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Problema */}
      <section id="como-funciona" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20 border-t border-[#e8dcc6]">
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 items-center">
          <div>
            <div className="text-[#8b7a65] text-xs tracking-[3px] mb-4">O PROBLEMA</div>
            <h2 className="font-serif text-5xl md:text-7xl tracking-[-3px] leading-none">
              Quem nunca<br />discutiu sobre<br />quem faz o quê?
            </h2>
          </div>
          <div className="space-y-6 text-lg text-[#5c4d3a]">
            <p>A maioria das famílias vive no caos silencioso: uma pessoa lembra de tudo, outra nunca sabe o que fazer.</p>
            <p>Não é falta de boa vontade. É falta de um sistema claro.</p>
          </div>
        </div>
      </section>

      {/* Como funciona - Mobile friendly */}
      <section className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <div className="text-[#8b7a65] text-xs tracking-[3px] mb-3">3 PASSOS SIMPLES</div>
          <h3 className="font-serif text-5xl md:text-6xl tracking-[-2px]">Funciona assim</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { num: "01", title: "Monte sua escala", desc: "Escolha as tarefas e defina quem faz o quê. Leva menos de 5 minutos." },
            { num: "02", title: "Compartilhe com a família", desc: "Todos veem a mesma escala em tempo real no celular ou computador." },
            { num: "03", title: "Acompanhe o progresso", desc: "Marque tarefas concluídas e mantenha tudo organizado sem esforço." }
          ].map((step, i) => (
            <div key={i} className="border border-[#e8dcc6] bg-white rounded-3xl p-8 md:p-10">
              <div className="font-serif text-6xl md:text-7xl text-[#d4c3a3] tracking-[-4px] mb-8">{step.num}</div>
              <h4 className="font-serif text-3xl tracking-[-1px] mb-4">{step.title}</h4>
              <p className="text-[#6b5c4a] text-[15px] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-[#1f1810] py-16 md:py-20 px-5 md:px-8 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-14">
            <div className="text-[#d4c3a3] text-xs tracking-[3px] mb-3">POR QUE FUNCIONA</div>
            <h3 className="font-serif text-white text-5xl md:text-6xl tracking-[-2px]">Paz em casa começa com clareza</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Menos estresse", desc: "Ninguém mais fica sobrecarregado sem perceber." },
              { icon: Users, title: "Equilíbrio real", desc: "Todo mundo sabe exatamente qual é sua responsabilidade." },
              { icon: Clock, title: "Mais tempo livre", desc: "Menos tempo resolvendo tarefas = mais tempo juntos." },
              { icon: Star, title: "Rotina que dura", desc: "Um sistema simples que as crianças também conseguem seguir." }
            ].map((item, i) => (
              <div key={i} className="border border-white/10 rounded-3xl p-8 md:p-9">
                <item.icon className="w-8 h-8 text-[#d4c3a3] mb-8" />
                <h4 className="font-serif text-3xl tracking-[-1px] mb-4">{item.title}</h4>
                <p className="text-[#d4c3a3] text-[15px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-14">
          <div className="text-[#8b7a65] text-xs tracking-[3px] mb-3">DEPOIMENTOS</div>
          <h3 className="font-serif text-5xl md:text-6xl tracking-[-2px]">Famílias que mudaram</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Mariana S.", role: "Mãe de 3", text: "Pela primeira vez em anos, meu marido sabe exatamente o que fazer sem eu precisar cobrar." },
            { name: "João e Ana", role: "Casal com 2 filhos", text: "As crianças agora ajudam porque conseguem ver tudo de forma clara." },
            { name: "Carla Mendes", role: "Mãe solo", text: "Eu não aguentava mais ser a única que lembrava de tudo. Hoje a gente tem paz de verdade." }
          ].map((t, i) => (
            <div key={i} className="border border-[#e8dcc6] bg-white rounded-3xl p-8 md:p-10 flex flex-col">
              <p className="text-[#5c4d3a] text-[15px] leading-relaxed flex-1">"{t.text}"</p>
              <div className="pt-8 mt-auto border-t border-[#e8dcc6]">
                <div className="font-medium">{t.name}</div>
                <div className="text-xs text-[#8b7a65] mt-1 tracking-widest">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="border-t border-[#e8dcc6] py-16 md:py-20 px-5 md:px-8 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="font-serif text-6xl md:text-7xl tracking-[-3px] leading-none mb-6">Sua casa merece<br />essa organização.</h2>
          <p className="text-xl text-[#6b5c4a] mb-10">Comece hoje. É grátis.</p>
          
          <button 
            onClick={() => window.location.href = '/cadastro'}
            className="inline-flex items-center justify-center gap-3 bg-[#1f1810] text-white px-14 py-4 rounded-2xl text-sm tracking-[2.5px] hover:bg-black transition-all"
          >
            CRIAR MINHA PRIMEIRA ESCALA <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8dcc6] py-8 text-center text-xs tracking-[3px] text-[#8b7a65]">
        ROTINA EM CASA — FEITO COM CARINHO PARA FAMÍLIAS DE VERDADE
      </footer>
    </div>
  );
};

export default Landing;