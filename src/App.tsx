import { useEffect } from "react";

type HeroVariant = {
  title: string;
  support: string;
  cta: string;
};

const heroVariants: Record<string, HeroVariant> = {
  "/a1": {
    title: "Sua loja vende. Mas você sabe onde o lucro está escapando?",
    support:
      "Em 2 horas ao vivo, aplique o Raio-X L³ para identificar se o principal gargalo da sua operação está no Lucro, no Lead ou na Loja e saia sabendo o que precisa ser corrigido primeiro antes de colocar mais dinheiro em anúncios.",
    cta: "Quero descobrir onde minha loja perde lucro",
  },
  "/a2": {
    title: "Talvez sua loja não precise de mais anúncios.",
    support:
      "Antes de aumentar a verba, descubra se o gargalo está no Lucro, no Lead ou na Loja. Em 2 horas ao vivo, aplique o Raio-X L³ e saia com a primeira prioridade de correção.",
    cta: "Quero descobrir o gargalo antes de investir mais",
  },
  "/a3": {
    title: "Você paga pelo lead. Sua loja transforma essa oportunidade em venda?",
    support:
      "Em 2 horas, use o Raio-X L³ para descobrir se o gargalo está na aquisição, no atendimento ou no lucro que sobra depois da venda.",
    cta: "Quero descobrir onde a oportunidade está se perdendo",
  },
};

const workshopParts = [
  {
    number: "01",
    title: "Os números da sua loja",
    text: "Entenda como os principais números são formados e quais realmente ajudam a tomar decisões melhores.",
  },
  {
    number: "02",
    title: "A armadilha do faturamento",
    text: "Veja por que vender mais não significa, por si só, colocar mais lucro dentro da empresa.",
  },
  {
    number: "03",
    title: "As conexões do Método L³",
    text: "Aprenda como Lucro, Lead e Loja se afetam e por que um pilar pode limitar os outros dois.",
  },
  {
    number: "04",
    title: "Decisões em cenários econômicos",
    text: "Organize critérios para agir com mais clareza quando o mercado muda e a pressão aumenta.",
  },
  {
    number: "05",
    title: "Um olhar externo para a operação",
    text: "Separe percepção, sintoma e causa para não confundir a rotina intensa com um diagnóstico correto.",
  },
];

const faqItems = [
  {
    question: "O workshop é ao vivo?",
    answer:
      "Sim. O encontro será online e ao vivo, com duração aproximada de 2 horas e espaço para perguntas.",
  },
  {
    question: "Preciso expor os números da minha loja?",
    answer:
      "Não. A aplicação acontece de forma coletiva. Você usa seus próprios dados sem precisar torná-los públicos.",
  },
  {
    question: "E se eu não entender de finanças?",
    answer:
      "Os indicadores serão explicados em linguagem simples, com foco no que ajuda o gestor a enxergar e decidir.",
  },
  {
    question: "A aula ficará gravada?",
    answer: "Sim. A gravação ficará disponível por 72 horas após o encontro.",
  },
  {
    question: "Vou receber um diagnóstico individual completo?",
    answer:
      "O workshop entrega um diagnóstico inicial e a primeira prioridade de correção. A análise individual aprofundada faz parte do programa principal.",
  },
  {
    question: "Existe garantia?",
    answer: "Não. O Workshop Raio-X L³ não possui garantia.",
  },
  {
    question: "Quando o encontro acontecerá?",
    answer:
      "A data e o horário ainda precisam ser confirmados. As informações serão comunicadas pelos canais usados na inscrição.",
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`reveal ${className}`} data-reveal>
      {children}
    </div>
  );
}

function useRevealMotion() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const root = document.documentElement;
    let frame = 0;

    const updateProgress = () => {
      const scrollable = root.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
      root.style.setProperty("--scroll-progress", progress.toString());
      frame = 0;
    };

    const requestProgressUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return () => {
        window.removeEventListener("scroll", requestProgressUpdate);
        window.removeEventListener("resize", requestProgressUpdate);
        if (frame) window.cancelAnimationFrame(frame);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#inicio" className="brand" aria-label="LojaADS, voltar ao início">
          <img src="/assets/logo-lojaads.png" alt="LojaADS" width="2172" height="724" />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#diagnostico">Diagnóstico</a>
          <a href="#conteudo">Conteúdo</a>
          <a href="#renata">Renata</a>
          <a className="nav-cta" href="#inscricao">
            Ver inscrição
          </a>
        </nav>
      </div>
    </header>
  );
}

function PrimaryLink({ label }: { label: string }) {
  return (
    <a className="button button-primary" href="#inscricao">
      <span>{label}</span>
      <ArrowIcon />
    </a>
  );
}

function CheckoutButton() {
  const checkoutUrl = import.meta.env.VITE_CHECKOUT_URL?.trim();

  if (checkoutUrl) {
    return (
      <a className="button button-light checkout-button" href={checkoutUrl}>
        <span>Quero participar do workshop</span>
        <ArrowIcon />
      </a>
    );
  }

  return (
    <>
      <button
        className="button button-light checkout-button"
        type="button"
        disabled
        aria-label="Link de inscrição ainda não disponível"
      >
        <span>Quero participar do workshop</span>
        <ArrowIcon />
      </button>
      <p className="checkout-note">Link de inscrição em configuração.</p>
    </>
  );
}

function SalesPage({ hero }: { hero: HeroVariant }) {
  useRevealMotion();

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main>
        <section className="hero" id="inicio">
          <div className="hero-grid" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow hero-stagger hero-stagger-1">Workshop online e ao vivo para donos e gestores</p>
              <h1 className="hero-stagger hero-stagger-2">{hero.title}</h1>
              <p className="hero-support hero-stagger hero-stagger-3">{hero.support}</p>
              <div className="hero-actions hero-stagger hero-stagger-4">
                <PrimaryLink label={hero.cta} />
                <p>
                  Para lojas de móveis, colchões, decoração, cortinas, persianas e eletromóveis.
                </p>
              </div>
            </div>

            <div className="hero-visual hero-stagger hero-stagger-3">
              <div className="portrait-frame">
                <img
                  src="/assets/renata-hero.webp"
                  alt="Renata, especialista do Método L³"
                  width="1024"
                  height="1280"
                  fetchPriority="high"
                />
                <div className="portrait-badge">
                  <strong>Método L³</strong>
                  <span>Lucro. Lead. Loja.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="facts" aria-label="Informações do workshop">
          <div className="container facts-grid">
            <div><strong>2 horas</strong><span>Encontro ao vivo</span></div>
            <div><strong>R$ 97</strong><span>Investimento único</span></div>
            <div><strong>72 horas</strong><span>Acesso à gravação</span></div>
            <div><strong>Aplicação prática</strong><span>Com espaço para perguntas</span></div>
          </div>
        </section>

        <section className="section problem-section">
          <div className="container split-heading">
            <Reveal>
              <p className="eyebrow">O caixa mostra o efeito. O diagnóstico encontra a causa.</p>
              <h2>Faturar bem não significa lucrar bem.</h2>
            </Reveal>
            <Reveal className="section-copy">
              <p>
                A loja vende, paga fornecedores, salários, impostos e anúncios. Mesmo assim, sobra menos do que deveria. Em outros casos, os leads chegam, mas se perdem no atendimento, no acompanhamento ou em propostas sem margem.
              </p>
              <p>
                Sem clareza sobre a origem do problema, é fácil tentar corrigir a operação no lugar errado.
              </p>
            </Reveal>
          </div>
          <div className="container symptom-grid">
            {[
              ["Venda sem sobra", "O movimento existe, mas o lucro não acompanha o esforço da operação."],
              ["Lead sem conversão", "A oportunidade chega e se perde antes de virar uma venda saudável."],
              ["Desconto como saída", "A equipe negocia preço sem saber o impacto real na margem."],
            ].map(([title, text], index) => (
              <Reveal className="symptom-card" key={title}>
                <span className="card-index">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section diagnostic-section" id="diagnostico">
          <div className="container diagnostic-layout">
            <Reveal className="diagnostic-copy">
              <p className="eyebrow eyebrow-light">Um mapa para enxergar a operação inteira</p>
              <h2>O Raio-X L³ mostra onde olhar primeiro.</h2>
              <p>
                O método organiza o diagnóstico em três pilares conectados. Quando um deles perde força, o crescimento deixa de se transformar em lucro previsível.
              </p>
              <ul className="check-list">
                <li><CheckIcon /> Critério para separar sintomas de causas</li>
                <li><CheckIcon /> Prioridade clara para a primeira correção</li>
                <li><CheckIcon /> Indicadores que merecem acompanhamento</li>
              </ul>
            </Reveal>

            <Reveal className="l3-scanner">
              <div className="scanner-head">
                <span>Leitura da operação</span>
                <span className="scanner-status"><i /> Diagnóstico L³</span>
              </div>
              <div className="scanner-body">
                <div className="scan-beam" aria-hidden="true" />
                <article>
                  <span>L1</span>
                  <div><h3>Lucro</h3><p>Margem, custos, despesas, ofertas, descontos e o que realmente sobra.</p></div>
                </article>
                <article>
                  <span>L2</span>
                  <div><h3>Lead</h3><p>Origem, qualidade, oportunidades e a eficiência do investimento em campanhas.</p></div>
                </article>
                <article>
                  <span>L3</span>
                  <div><h3>Loja</h3><p>Atendimento, velocidade, acompanhamento, processo, equipe e conversão.</p></div>
                </article>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section attempts-section">
          <div className="container">
            <Reveal className="center-heading">
              <p className="eyebrow">Antes de aumentar a verba</p>
              <h2>Mais esforço no ponto errado pode ampliar o problema.</h2>
              <p>
                Mais anúncios não corrigem atendimento fraco. Promoção não resolve uma estrutura de custos mal entendida. Cobrar mais da equipe não cria um processo que ainda não existe.
              </p>
            </Reveal>
            <Reveal className="decision-line">
              <div><span>Sem diagnóstico</span><strong>Reagir a cada sintoma</strong></div>
              <ArrowIcon />
              <div><span>Com o Raio-X L³</span><strong>Corrigir a prioridade certa</strong></div>
            </Reveal>
          </div>
        </section>

        <section className="section content-section" id="conteudo">
          <div className="container">
            <Reveal className="content-heading">
              <div>
                <p className="eyebrow">O que será trabalhado ao vivo</p>
                <h2>Duas horas para organizar a leitura da sua loja.</h2>
              </div>
              <p>
                Uma sequência prática para entender os números, conectar os três pilares e sair com uma primeira decisão mais segura.
              </p>
            </Reveal>
            <div className="program-list">
              {workshopParts.map((part) => (
                <Reveal className="program-item" key={part.number}>
                  <span>{part.number}</span>
                  <h3>{part.title}</h3>
                  <p>{part.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section outcome-section">
          <div className="container outcome-grid">
            <Reveal className="outcome-card outcome-main">
              <p className="eyebrow eyebrow-light">Seu resultado imediato</p>
              <h2>Clareza para decidir o que corrigir primeiro.</h2>
              <p>
                Ao final do encontro, você terá um critério mais claro para identificar qual pilar exige atenção agora e quais números precisam entrar no seu radar.
              </p>
              <PrimaryLink label="Quero aplicar o Raio-X L³" />
            </Reveal>
            <Reveal className="outcome-card outcome-list">
              {[
                "Identificar o pilar que mais limita a operação",
                "Definir a primeira prioridade de correção",
                "Entender quais indicadores acompanhar",
                "Evitar decisões baseadas apenas em sensação",
              ].map((item) => <div key={item}><CheckIcon /><span>{item}</span></div>)}
            </Reveal>
          </div>
        </section>

        <section className="section fit-section">
          <div className="container fit-grid">
            <Reveal className="fit-card fit-yes">
              <p className="eyebrow">Este workshop é para você se...</p>
              <h2>Sua operação já gira, mas ainda falta clareza.</h2>
              <ul>
                <li><CheckIcon /> Você é dono ou gestor de uma loja do segmento atendido</li>
                <li><CheckIcon /> A operação já funciona e fatura acima de R$ 80 mil por mês</li>
                <li><CheckIcon /> A loja vende, mas você não sabe onde o lucro se perde</li>
                <li><CheckIcon /> Você quer decidir com critérios, números e processos</li>
              </ul>
            </Reveal>
            <Reveal className="fit-card fit-no">
              <p className="eyebrow">Este encontro não foi desenhado para...</p>
              <h3>Quem busca uma promessa fácil sem olhar para a operação.</h3>
              <p>
                O Raio-X L³ não substitui uma análise individual completa e não entrega uma fórmula pronta. Ele organiza o diagnóstico inicial para que a primeira decisão seja mais consciente.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section authority-section" id="renata">
          <div className="container authority-layout">
            <Reveal className="authority-photo">
              <img
                src="/assets/renata-autoridade.webp"
                alt="Renata em ambiente de trabalho"
                width="1024"
                height="1280"
                loading="lazy"
              />
              <div className="authority-fact"><strong>50+</strong><span>empresas acompanhadas</span></div>
            </Reveal>
            <Reveal className="authority-copy">
              <p className="eyebrow">Quem conduz o encontro</p>
              <h2>Renata conecta finanças, gestão, marketing e operação.</h2>
              <p>
                Sua trajetória começou há quase 30 anos, ensinando finanças em cursos de Administração, Ciências Contábeis, Economia e Engenharia. Ao ouvir repetidamente que os problemas financeiros das empresas nasciam em outras áreas, ela passou a construir uma ponte entre o conhecimento acadêmico e a realidade das operações.
              </p>
              <p>
                Com mais de 20 anos de experiência conectando teoria e prática, Renata desenvolveu uma leitura integrada da empresa e já aplicou seu trabalho em mais de 50 organizações.
              </p>
              <div className="authority-tags">
                <span>Finanças</span><span>Gestão</span><span>Marketing</span><span>Operação</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section case-section">
          <div className="container case-layout">
            <Reveal>
              <p className="eyebrow eyebrow-light">Um caso documentado</p>
              <h2>Quando faturamento e lucro passam a ser vistos juntos.</h2>
            </Reveal>
            <Reveal className="case-metrics">
              <div><span>Faturamento aproximado</span><strong>R$ 90 mil</strong><ArrowIcon /><strong>R$ 165 mil</strong></div>
              <div><span>Lucro aproximado</span><strong>R$ 7 mil</strong><ArrowIcon /><strong>R$ 23 mil</strong></div>
              <p>
                Resultado de uma operação acompanhada. Este caso é específico e não representa promessa ou garantia de resultado.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section offer-section" id="inscricao">
          <div className="container offer-layout">
            <Reveal className="offer-copy">
              <p className="eyebrow">Workshop Raio-X L³</p>
              <h2>Descubra onde o lucro está escapando antes de investir mais.</h2>
              <p>
                Participe do encontro ao vivo e saia com um mapa inicial da operação, a prioridade que precisa de atenção e os indicadores que ajudam a acompanhar a correção.
              </p>
            </Reveal>
            <Reveal className="offer-card">
              <p className="offer-label">Sua inscrição inclui</p>
              <ul>
                <li><CheckIcon /> Workshop online e ao vivo de 2 horas</li>
                <li><CheckIcon /> Aplicação do Raio-X L³</li>
                <li><CheckIcon /> Espaço para perguntas</li>
                <li><CheckIcon /> Gravação disponível por 72 horas</li>
                <li><CheckIcon /> Possibilidade de reunião estratégica individual</li>
              </ul>
              <div className="price"><span>Investimento único</span><strong><small>R$</small> 97</strong></div>
              <CheckoutButton />
              <p className="offer-small">A data e o horário do encontro serão confirmados nos canais de inscrição.</p>
            </Reveal>
          </div>
        </section>

        <section className="section faq-section" id="duvidas">
          <div className="container faq-layout">
            <Reveal className="faq-heading">
              <p className="eyebrow">Dúvidas frequentes</p>
              <h2>Informação clara antes da sua decisão.</h2>
            </Reveal>
            <Reveal className="faq-list">
              {faqItems.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary>{item.question}<span aria-hidden="true">+</span></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="closing-section">
          <div className="container closing-inner">
            <Reveal>
              <p className="eyebrow eyebrow-light">Lucro. Lead. Loja.</p>
              <h2>Você não precisa corrigir tudo agora. Precisa começar pelo lugar certo.</h2>
              <PrimaryLink label="Quero descobrir minha primeira prioridade" />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container footer-inner">
        <img src="/assets/logo-lojaads.png" alt="LojaADS" width="2172" height="724" />
        <p>Método L³. Crescimento com lucro para lojas.</p>
      </div>
    </footer>
  );
}

function ThankYouPage() {
  useRevealMotion();

  return (
    <div className="thank-page">
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header thank-header">
        <div className="container header-inner">
          <a href="/a1" className="brand" aria-label="LojaADS, ir para a página principal">
            <img src="/assets/logo-lojaads.png" alt="LojaADS" width="2172" height="724" />
          </a>
        </div>
      </header>
      <main className="thank-main">
        <div className="thank-grid" aria-hidden="true" />
        <div className="container thank-layout">
          <Reveal className="thank-card">
            <span className="thank-check"><CheckIcon /></span>
            <p className="eyebrow">Próximos passos</p>
            <h1>Sua decisão já colocou a clareza em movimento.</h1>
            <p className="thank-lead">
              Se sua inscrição foi concluída, as orientações de acesso serão enviadas aos contatos informados no checkout assim que a operação do encontro estiver confirmada.
            </p>
            <div className="next-steps">
              <article><span>01</span><div><h2>Confira seus contatos</h2><p>Acompanhe o email e o WhatsApp usados na inscrição.</p></div></article>
              <article><span>02</span><div><h2>Receba o acesso</h2><p>O link, a data e o horário serão enviados quando estiverem definidos.</p></div></article>
              <article><span>03</span><div><h2>Prepare seus números</h2><p>Tenha por perto os dados da operação que você já acompanha. Não será necessário expô-los ao grupo.</p></div></article>
            </div>
            <p className="pending-message">
              O link do grupo, a plataforma da aula e os canais de suporte ainda precisam ser informados.
            </p>
            <a className="text-link" href="/a1">Voltar para a página do workshop <ArrowIcon /></a>
          </Reveal>
          <Reveal className="thank-aside">
            <p>Método L³</p>
            <div><span>L1</span><strong>Lucro</strong></div>
            <div><span>L2</span><strong>Lead</strong></div>
            <div><span>L3</span><strong>Loja</strong></div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const normalizedPath = window.location.pathname.replace(/\/$/, "") || "/a1";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [normalizedPath]);

  if (normalizedPath === "/obrigado") {
    return <ThankYouPage />;
  }

  return <SalesPage hero={heroVariants[normalizedPath] ?? heroVariants["/a1"]} />;
}
