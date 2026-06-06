import { ArrowRight, Clock } from 'lucide-react';

// Atualizado: 06/06 04:30
const Landing = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-[#1f1810]">
      {/* Navigation */}
      <nav className="border-b border-[#e8dcc6] bg-[#f8f5f0]/95 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1f1810] rounded-2xl flex items-center justify-center">
              <span className="text-[#f8f5f0] text-xl font-serif tracking-[-1px]">R</span>
            </div>
            <div className="font-serif text-2xl tracking-[-1.5px]">Rotina em Casa</div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-sm">
            <button onClick={() => scrollToSection('como-funciona')} className="px-6 py-2.5 text-[#6b5c4a] hover:text-[#1f1810] transition">
              Como funciona
            </button>
            <button onClick={() => window.location.href = '/escala-spiral'} className="px-6 py-2.5 text-[#6b5c4a] hover:text-[#1f1810] transition">
              Ver demo
            </button>
            <button onClick={() => window.location.href = '/login'} className="px-8 py-2.5 border border-[#d4c3a3] rounded-2xl hover:bg-white transition ml-2">
              Entrar
            </button>
            <button onClick={() => window.location.href = '/cadastro'} className="px-8 py-2.5 bg-[#1f1810] text-white rounded-2xl hover:bg-black transition">
              Começar grátis
            </button>
          </div>

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

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-8 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#e8dcc6] mb-8 text-xs tracking-[1.5px]">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          MAIS DE 2.400 FAMÍLIAS JÁ ORGANIZARAM SUA ROTINA
        </div>

        <h1 className="font-serif text-[64px] md:text-[92px] leading-[0.92] tracking-[-5px] md:tracking-[-6.5px] mb-8">
          A rotina da sua<br />casa, finalmente<br />em ordem.
        </h1>

        <p className="text-2xl text-[#6b5c4a] max-w-lg mx-auto mb-12 tracking-[-0.3px]">
          Uma forma bonita e simples de organizar tarefas em família.<br className="hidden md:block" /> Sem brigas. Sem esquecimento.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.location.href = '/cadastro'}
            className="group inline-flex items-center justify-center gap-3 bg-[#1f1810] text-white px-12 py-4 rounded-2xl text-sm tracking-[2px] hover:bg-black transition-all"
          >
            CRIAR MINHA ESCALA AGORA
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </button>
          <button 
            onClick={() => window.location.href = '/escala-spiral'}
            className="inline-flex items-center justify-center gap-3 border border-[#d4c3a3] px-10 py-4 rounded-2xl text-sm tracking-[2px] hover:bg-white transition-all"
          >
            EXPERIMENTAR A DEMO
          </button>
        </div>
      </section>

      {/* Visual Preview */}
      <section className="max-w-6xl mx-auto px-8 pb-24">
        <div className="text-center mb-10">
          <div className="text-sm tracking-[2px] text-[#8b7a65] mb-3">COMO FUNCIONA</div>
          <h2 className="font-serif text-6xl tracking-[-2px]">Dois carousels.<br />Zero complexidade.</h2>
        </div>

        <div className="bg-white border border-[#e8dcc6] rounded-3xl p-8 md:p-14 shadow-xl">
          <div className="grid md:grid-cols-12 gap-10">
            {/* Categorias */}
            <div className="md:col-span-5">
              <div className="text-sm text-[#8b7a65] mb-4 px-2 tracking-[0.5px]">CATEGORIAS</div>
              <div className="space-y-3">
                {['Saúde', 'Estudos', 'Fé', 'Casa', 'Lazer', 'Trabalho'].map((cat, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center gap-4 px-6 py-5 rounded-3xl border transition-all ${i === 0 ? 'bg-[#1f1810] text-white border-[#1f1810]' : 'bg-white border-[#e8dcc6]'}`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-current opacity-60" />
                    <div className="font-medium text-xl tracking-[-0.3px]">{cat}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Atividades */}
            <div className="md:col-span-7">
              <div className="text-sm text-[#8b7a65] mb-4 px-2 tracking-[0.5px]">ATIVIDADES DE SAÚDE</div>
              <div className="space-y-4">
                {[
                  { nome: 'Alongamento matinal', tempo: '15 min' },
                  { nome: 'Academia', tempo: '60 min' },
                  { nome: 'Caminhada leve', tempo: '30 min' },
                  { nome: 'Meditação guiada', tempo: '20 min' }
                ].map((act, i) => (
                  <div key={i} className="flex items-center justify-between px-7 py-6 bg-white border border-[#e8dcc6] rounded-3xl group">
                    <div>
                      <div className="font-medium text-2xl tracking-[-0.4px]">{act.nome}</div>
                      <div className="text-sm text-[#8b7a65] mt-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {act.tempo}
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-2xl border border-[#d4c9b3] group-hover:border-[#1f1810] transition" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="max-w-5xl mx-auto px-8 pb-24">
        <div className="text-center mb-16">
          <div className="text-sm tracking-[2px] text-[#8b7a65] mb-3">SIMPLE E EFICAZ</div>
          <h2 className="font-serif text-6xl tracking-[-2px]">Três passos.<br />Zero dor de cabeça.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { num: "01", title: "Escolha as categorias", desc: "Saúde, Estudos, Fé, Casa, Lazer, Trabalho, Amigos ou Família. Escolha o que importa para você." },
            { num: "02", title: "Selecione as atividades", desc: "Cada categoria tem dezenas de atividades prontas. Escolha as que fazem sentido para sua família." },
            { num: "03", title: "Defina os dias", desc: "Marque em quais dias da semana cada atividade deve acontecer. Simples assim." }
          ].map((step, i) => (
            <div key={i} className="bg-white border border-[#e8dcc6] rounded-3xl p-9">
              <div className="text-6xl font-serif tracking-[-2px] text-[#d4c3a3] mb-8">{step.num}</div>
              <div className="font-medium text-2xl tracking-[-0.5px] mb-4">{step.title}</div>
              <p className="text-[#6b5c4a] leading-relaxed text-[15px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="border-t border-[#e8dcc6] bg-white py-20">
        <div className="max-w-2xl mx-auto text-center px-8">
          <h2 className="font-serif text-6xl tracking-[-2px] mb-6">Pronto para organizar<br />sua casa?</h2>
          <p className="text-xl text-[#6b5c4a] mb-10">Comece grátis. Sem cartão de crédito.</p>
          <button 
            onClick={() => window.location.href = '/cadastro'}
            className="inline-flex items-center justify-center gap-3 bg-[#1f1810] text-white px-14 py-4 rounded-2xl text-sm tracking-[2px] hover:bg-black transition-all"
          >
            CRIAR MINHA CONTA AGORA
          </button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
