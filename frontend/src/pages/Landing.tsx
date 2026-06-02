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
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500 flex items-center justify-center">
              <Home className="w-5 h-5 text-zinc-950" />
            </div>
            <span className="font-semibold text-2xl tracking-tight">Rotina em Casa</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => scrollToSection('como-funciona')}
              className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors px-5 py-2 rounded-xl hover:bg-zinc-900"
            >
              Como funciona
            </button>
            <button 
              onClick={() => scrollToSection('beneficios')}
              className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors px-5 py-2 rounded-xl hover:bg-zinc-900"
            >
              Benefícios
            </button>
            <button 
              onClick={() => window.location.href = '/login'}
              className="text-sm px-5 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-900 transition-all"
            >
              Entrar
            </button>
            <button 
              onClick={() => window.location.href = '/cadastro'}
              className="text-sm px-6 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-medium hover:bg-emerald-400 transition-all"
            >
              Começar grátis
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 mb-8">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm text-zinc-400">Usado por mais de 2.400 famílias</span>
          </div>

          <h1 className="text-7xl md:text-8xl font-semibold tracking-tighter leading-none mb-6">
            Organize sua casa.<br />Sem estresse.
          </h1>
          
          <p className="text-2xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Crie escalas visuais de tarefas domésticas. Divida responsabilidades com clareza 
            e reduza o peso mental da rotina.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/cadastro'}
              className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-2xl bg-emerald-500 text-xl font-medium text-zinc-950 hover:bg-emerald-400 active:scale-[0.985] transition-all"
            >
              Começar gratuitamente
              <ArrowRight className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scrollToSection('como-funciona')}
              className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-2xl border border-zinc-700 text-xl hover:bg-zinc-900 transition-all"
            >
              Ver como funciona
            </button>
          </div>

          <p className="text-sm text-zinc-500 mt-6">
            Sem cartão de crédito • Cancele quando quiser
          </p>
        </div>
      </section>

      {/* Problema Section */}
      <section className="py-20 px-6 border-t border-zinc-800 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-emerald-500 text-sm font-medium tracking-[3px] mb-4">O PROBLEMA</div>
            <h2 className="text-6xl font-semibold tracking-tighter">A rotina não precisa ser caótica</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {problems.map((problem, index) => (
              <div 
                key={index}
                className="card-hover p-9 rounded-3xl bg-zinc-900 border border-zinc-800"
              >
                <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center mb-8">
                  <problem.icon className="w-7 h-7 text-emerald-500" />
                </div>
                <h3 className="text-4xl font-semibold tracking-tighter mb-4 leading-none">{problem.title}</h3>
                <p className="text-xl text-zinc-400 leading-snug">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-emerald-500 text-sm font-medium tracking-[3px] mb-4">SIMPLE E EFICIENTE</div>
            <h2 className="text-6xl font-semibold tracking-tighter">Três passos para transformar sua casa</h2>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex flex-col md:flex-row gap-10 md:gap-16 items-start p-12 rounded-3xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/70 transition-all group"
              >
                <div className="text-[92px] font-semibold text-emerald-500/90 tabular-nums tracking-[-8px] leading-none">
                  {step.number}
                </div>
                <div className="flex-1 pt-4">
                  <h3 className="text-5xl font-semibold tracking-tighter mb-5 group-hover:text-emerald-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-2xl text-zinc-400 max-w-2xl leading-snug">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios - Seção Escura */}
      <section id="beneficios" className="py-20 px-6 bg-zinc-950 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-emerald-500 text-sm font-medium tracking-[3px] mb-4">POR QUE FUNCIONA</div>
            <h2 className="text-6xl font-semibold tracking-tighter">Resultados reais para sua família</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="card-hover p-10 rounded-3xl bg-zinc-900 border border-zinc-800 flex gap-7"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                    <benefit.icon className="w-8 h-8 text-emerald-500" />
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-4xl font-semibold tracking-tighter mb-4">{benefit.title}</h3>
                  <p className="text-xl text-zinc-400 leading-snug">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-12 gap-x-16 gap-y-16 items-center">
            <div className="md:col-span-5">
              <div className="sticky top-24">
                <div className="text-emerald-500 text-sm font-medium tracking-[3px] mb-4">FEITO PARA FAMÍLIAS REAIS</div>
                <h2 className="text-7xl font-semibold tracking-tighter leading-none mb-6">
                  Tudo o que você precisa.<br />Nada que você não usa.
                </h2>
                <p className="text-2xl text-zinc-400">
                  Ferramentas simples que realmente resolvem o dia a dia da casa.
                </p>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="grid gap-3">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-5 p-7 rounded-2xl border border-zinc-800 bg-zinc-900/40 text-xl"
                  >
                    <CheckCircle className="w-7 h-7 text-emerald-500 flex-shrink-0" />
                    <span className="tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 px-6 bg-zinc-900/50 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-emerald-500 text-sm font-medium tracking-[3px] mb-4">DEPOIMENTOS</div>
            <h2 className="text-6xl font-semibold tracking-tighter">Histórias reais de famílias organizadas</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="card-hover p-10 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col"
              >
                <div className="flex-1">
                  <p className="text-2xl leading-snug text-zinc-300">"{testimonial.text}"</p>
                </div>
                <div className="pt-9 border-t border-zinc-800 mt-9">
                  <div className="font-semibold text-xl tracking-tight">{testimonial.name}</div>
                  <div className="text-sm text-zinc-500 mt-1">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-7xl font-semibold tracking-tighter mb-6 leading-none">
            Sua casa mais organizada<br />começa hoje.
          </h2>
          <p className="text-3xl text-zinc-400 mb-10">
            Experimente grátis por 14 dias. Sem compromisso.
          </p>

          <button 
            onClick={() => window.location.href = '/cadastro'}
            className="inline-flex items-center justify-center gap-4 px-12 py-5 rounded-2xl bg-emerald-500 text-2xl font-medium text-zinc-950 hover:bg-emerald-400 active:scale-[0.985] transition-all"
          >
            Criar minha primeira escala
            <ArrowRight className="w-7 h-7" />
          </button>

          <p className="text-sm text-zinc-500 mt-8">
            100% gratuito para começar • Cancele a qualquer momento
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-10 px-6 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Rotina em Casa. Feito com carinho para famílias que querem mais paz.
      </footer>
    </div>
  );
};

export default Landing;