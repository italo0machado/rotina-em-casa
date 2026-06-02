import { 
  Users, Target, CheckCircle, ArrowRight, 
  Home, Heart, Award, Shield, TrendingUp 
} from 'lucide-react';

const Landing = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const problems = [
    {
      icon: Heart,
      title: "Peso mental constante",
      description: "Ficar lembrando quem faz o quê toda hora cansa e gera estresse desnecessário."
    },
    {
      icon: Users,
      title: "Dificuldade para dividir tarefas",
      description: "Sempre sobra mais para uma pessoa e ninguém percebe a desigualdade."
    },
    {
      icon: Target,
      title: "Falta de visibilidade",
      description: "Ninguém sabe o que está pendente ou quem está sobrecarregado."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Crie sua escala",
      description: "Monte sua rotina visual em minutos. Defina tarefas, dias e responsáveis de forma simples e clara."
    },
    {
      number: "02",
      title: "Compartilhe com a família",
      description: "Envie o link ou QR code. Todos visualizam a mesma escala em tempo real, sem confusão."
    },
    {
      number: "03",
      title: "Acompanhe e ajuste",
      description: "Veja o progresso, troque tarefas e mantenha tudo organizado com facilidade."
    }
  ];

  const benefits = [
    {
      icon: Award,
      title: "Menos estresse",
      description: "Acabe com discussões sobre quem faz o quê. Todo mundo sabe exatamente sua responsabilidade."
    },
    {
      icon: Shield,
      title: "Equilíbrio real",
      description: "Distribuição justa e transparente de responsabilidades entre todos os membros da família."
    },
    {
      icon: TrendingUp,
      title: "Rotina que funciona",
      description: "Método testado que realmente traz organização duradoura para o dia a dia da casa."
    },
    {
      icon: Heart,
      title: "Mais tempo juntos",
      description: "Menos tempo brigando por tarefas = mais tempo de qualidade com quem você ama."
    }
  ];

  const features = [
    "Escalas visuais e fáceis de entender",
    "Atualizações em tempo real",
    "Histórico de tarefas concluídas",
    "Lembretes automáticos por WhatsApp",
    "Modo família (múltiplos usuários)",
    "Funciona no celular e computador"
  ];

  const testimonials = [
    {
      name: "Mariana Silva",
      role: "Mãe de 2 filhos",
      text: "Finalmente paramos de brigar sobre quem lava a louça. Todo mundo sabe exatamente o que fazer. Mudou nossa dinâmica em casa."
    },
    {
      name: "Carlos Mendes",
      role: "Pai solo",
      text: "Minha filha de 12 anos agora ajuda nas tarefas porque consegue ver tudo de forma clara. Nunca mais tive que ficar cobrando."
    },
    {
      name: "Juliana e Rafael",
      role: "Casal sem filhos",
      text: "A gente achava que não precisava, mas depois de testar, nunca mais voltamos atrás. É impressionante como traz paz."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f9f5f0] text-[#2c2118] font-light">
      {/* Premium Navigation */}
      <nav className="border-b border-[#e8dcc6] bg-[#f9f5f0]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#2c2118] rounded-full flex items-center justify-center">
              <Home className="w-5 h-5 text-[#f9f5f0]" />
            </div>
            <div>
              <div className="font-serif text-2xl tracking-[-1.5px]">ROTINA EM CASA</div>
              <div className="text-[9px] text-[#8b5e3c] -mt-1 tracking-[3px]">EST. 2025</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <button 
              onClick={() => scrollToSection('como-funciona')}
              className="text-[#6f5e4f] hover:text-[#2c2118] transition px-5 py-2 tracking-[1px]"
            >
              COMO FUNCIONA
            </button>
            <button 
              onClick={() => scrollToSection('beneficios')}
              className="text-[#6f5e4f] hover:text-[#2c2118] transition px-5 py-2 tracking-[1px]"
            >
              BENEFÍCIOS
            </button>
            <button 
              onClick={() => window.location.href = '/login'}
              className="px-6 py-2.5 border border-[#e8dcc6] rounded-full text-xs tracking-[2px] hover:bg-white transition"
            >
              ENTRAR
            </button>
            <button 
              onClick={() => window.location.href = '/cadastro'}
              className="px-8 py-2.5 bg-[#2c2118] text-white rounded-full text-xs tracking-[2.5px] hover:bg-[#3f2a1d] transition"
            >
              COMEÇAR GRÁTIS
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Premium Style */}
      <section className="relative h-[92vh] flex items-center justify-center overflow-hidden bg-[#2c2118]">
        <div className="absolute inset-0 bg-[radial-gradient(#3f2a1d_0.5px,transparent_1px)] bg-[length:4px_4px] opacity-40"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
          <div className="inline-block mb-6 px-5 py-1 border border-[#b89a6f]/40 rounded-full">
            <span className="text-[#b89a6f] text-xs tracking-[4px] uppercase font-medium">Para famílias que querem paz</span>
          </div>
          
          <h1 className="font-serif text-[92px] leading-[0.92] tracking-[-6.5px] text-white mb-6">
            SUA CASA.<br />EM ORDEM.
          </h1>
          
          <p className="text-[#d4c3a3] text-2xl tracking-[-0.5px] max-w-lg mx-auto mb-10 font-light">
            Escalas visuais que realmente funcionam.<br />Menos estresse. Mais equilíbrio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/cadastro'}
              className="group inline-flex items-center justify-center gap-4 border border-[#b89a6f] text-[#b89a6f] px-10 py-4 rounded-full text-sm tracking-[3px] hover:bg-[#b89a6f] hover:text-[#2c2118] transition-all duration-300"
            >
              CRIAR MINHA PRIMEIRA ESCALA
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </button>
            <button 
              onClick={() => scrollToSection('como-funciona')}
              className="inline-flex items-center justify-center gap-4 border border-white/30 text-white/80 px-10 py-4 rounded-full text-sm tracking-[3px] hover:bg-white/5 transition-all"
            >
              VER COMO FUNCIONA
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#b89a6f]/60 text-[10px] tracking-[4px]">SCROLL TO DISCOVER</div>
      </section>

      {/* Storytelling Intro */}
      <section className="max-w-4xl mx-auto px-8 py-20 text-center border-b border-[#e8dcc6]">
        <div className="max-w-2xl mx-auto">
          <div className="text-[#8b5e3c] text-xs tracking-[4px] mb-4">NOSSA FILOSOFIA</div>
          <h2 className="font-serif text-6xl tracking-[-2px] leading-none mb-8">A rotina não precisa ser caótica.</h2>
          <p className="text-[#6f5e4f] text-[17px] leading-relaxed tracking-[-0.1px]">
            Criamos uma forma simples e elegante de organizar tarefas em casa. 
            Sem apps complicados. Sem brigas. Apenas clareza e equilíbrio para quem mora junto.
          </p>
        </div>
      </section>

      {/* Problemas Section */}
      <section className="max-w-7xl mx-auto px-8 pt-16 pb-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-[#8b5e3c] text-xs tracking-[3px] mb-2">O QUE NINGUÉM FALA</div>
            <h3 className="font-serif text-6xl tracking-[-2.5px]">O peso que ninguém vê</h3>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="group border border-[#e8dcc6] bg-white rounded-3xl p-10 hover:shadow-xl transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#f9f5f0] flex items-center justify-center mb-8">
                <problem.icon className="w-6 h-6 text-[#b89a6f]" />
              </div>
              <h4 className="font-serif text-[28px] tracking-[-1px] leading-none mb-4">{problem.title}</h4>
              <p className="text-[#5c4033] text-[15px] leading-relaxed tracking-[-0.1px]">{problem.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="bg-[#2c2118] py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#b89a6f] text-xs tracking-[4px] mb-3">SIMPLE E EFICIENTE</div>
            <h2 className="font-serif text-white text-6xl tracking-[-2px]">Três passos para transformar sua casa</h2>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex flex-col md:flex-row gap-10 md:gap-16 items-start p-12 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group"
              >
                <div className="font-serif text-[92px] text-[#b89a6f]/90 tabular-nums tracking-[-8px] leading-none">
                  {step.number}
                </div>
                <div className="flex-1 pt-4">
                  <h3 className="font-serif text-white text-5xl tracking-[-1.5px] mb-5 group-hover:text-[#b89a6f] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[#d4c3a3] text-[17px] max-w-2xl leading-relaxed tracking-[-0.1px]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section id="beneficios" className="max-w-7xl mx-auto px-8 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-[#8b5e3c] text-xs tracking-[3px] mb-2">POR QUE FUNCIONA</div>
            <h3 className="font-serif text-6xl tracking-[-2.5px]">Resultados reais para sua família</h3>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group border border-[#e8dcc6] bg-white rounded-3xl p-10 flex gap-8 hover:shadow-xl transition-all duration-500"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-[#f9f5f0] flex items-center justify-center">
                  <benefit.icon className="w-7 h-7 text-[#b89a6f]" />
                </div>
              </div>
              <div>
                <h4 className="font-serif text-[28px] tracking-[-1px] mb-4 leading-none">{benefit.title}</h4>
                <p className="text-[#5c4033] text-[15px] leading-relaxed tracking-[-0.1px]">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="border-y border-[#e8dcc6] py-20 px-8 bg-[#f9f5f0]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-12 gap-x-16 gap-y-16 items-center">
            <div className="md:col-span-5">
              <div className="sticky top-24">
                <div className="text-[#8b5e3c] text-xs tracking-[3px] mb-4">FEITO PARA FAMÍLIAS REAIS</div>
                <h2 className="font-serif text-7xl tracking-[-2.5px] leading-none mb-6">
                  Tudo o que você precisa.<br />Nada que você não usa.
                </h2>
                <p className="text-[#6f5e4f] text-[17px]">
                  Ferramentas simples que realmente resolvem o dia a dia da casa.
                </p>
              </div>
            </div>
            <div className="md:col-span-7">
              <div className="grid gap-3">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-5 p-7 rounded-2xl border border-[#e8dcc6] bg-white text-[15px] tracking-[-0.1px]"
                  >
                    <CheckCircle className="w-5 h-5 text-[#b89a6f] flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-14">
          <div className="text-[#8b5e3c] text-xs tracking-[3px] mb-3">DEPOIMENTOS</div>
          <h3 className="font-serif text-6xl tracking-[-2px]">Histórias reais de famílias organizadas</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="border border-[#e8dcc6] bg-white rounded-3xl p-10 flex flex-col hover:shadow-xl transition-all duration-500"
            >
              <div className="flex-1">
                <p className="text-[#5c4033] text-[15px] leading-relaxed tracking-[-0.1px]">"{testimonial.text}"</p>
              </div>
              <div className="pt-8 border-t border-[#e8dcc6] mt-auto">
                <div className="font-medium tracking-[-0.3px]">{testimonial.name}</div>
                <div className="text-xs text-[#8b5e3c] tracking-[1.5px] mt-1">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-[#2c2118] py-24 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-white text-7xl tracking-[-2.5px] mb-6 leading-none">
            Sua casa mais<br />organizada começa hoje.
          </h2>
          <p className="text-[#d4c3a3] text-xl mb-10 tracking-[-0.3px]">
            Experimente grátis por 14 dias. Sem compromisso.
          </p>

          <button 
            onClick={() => window.location.href = '/cadastro'}
            className="group inline-flex items-center justify-center gap-4 border border-[#b89a6f] text-[#b89a6f] px-14 py-5 rounded-full text-sm tracking-[3px] hover:bg-[#b89a6f] hover:text-[#2c2118] transition-all duration-300"
          >
            CRIAR MINHA PRIMEIRA ESCALA
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </button>

          <p className="text-[#b89a6f]/60 text-xs tracking-[3px] mt-8">100% GRATUITO PARA COMEÇAR • CANCELE QUANDO QUISER</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8dcc6] py-9 text-center">
        <div className="text-[#8b5e3c] text-xs tracking-[4px]">ROTINA EM CASA — PAZ COMECE EM CASA</div>
        <div className="text-[10px] text-[#6f5e4f] mt-1 tracking-widest">FEITO COM RESPEITO ÀS FAMÍLIAS</div>
      </footer>
    </div>
  );
};

export default Landing;