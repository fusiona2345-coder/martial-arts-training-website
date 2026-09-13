import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Instagram, X } from 'lucide-react';

const framePath = (index: number) =>
  `/frames/sequence-1/ezgif-frame-${String(Math.max(1, Math.min(300, index))).padStart(3, '0')}.jpg`;

function Brand() {
  return (
    <a href="#top" className="brand" data-testid="link-brand">
      <span className="brand-mark"><span>DOJO</span></span>
      <span>Northline</span>
    </a>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <nav className={`nav ${open ? 'menu-open' : ''}`} data-testid="navigation">
      <div className="container nav-inner">
        <Brand />
        <div className="nav-links">
          <a href="#method" onClick={close} data-testid="link-method">The method</a>
          <a href="#programs" onClick={close} data-testid="link-programs">Programs</a>
          <a href="#voices" onClick={close} data-testid="link-voices">Member voices</a>
        </div>
        <div className="nav-actions">
          <a className="text-link" href="#trial" onClick={close} data-testid="link-nav-trial">Book a trial <ArrowUpRight size={13} /></a>
          <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
            {open ? <X size={17} /> : <><span /><span /><span /></>}
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" data-testid="section-hero">
      <div className="hero-media">
        <video autoPlay muted loop playsInline poster={framePath(1)} aria-label="Athletes training at Northline Dojo">
          <source src="/assets/reference-training.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="container hero-content">
        <div className="hero-kicker eyebrow">Taekwondo / Muay Thai / Jiu-Jitsu</div>
        <h1 className="display hero-title reveal visible">Train with<br /><em>purpose.</em></h1>
        <p className="hero-description reveal visible delay-1">A serious place to get stronger, sharper, and more certain of yourself. Built for first-timers, competitors, and the people who support them.</p>
        <div className="hero-actions reveal visible delay-2">
          <a className="button button-primary" href="#trial" data-testid="button-hero-trial">Book a trial <ArrowUpRight size={15} /></a>
          <a className="button button-outline" href="#method" data-testid="button-hero-method">See the method <ChevronDown size={14} /></a>
        </div>
        <div className="hero-meta reveal visible delay-2">
          <div><strong>06:00</strong><span>First class</span></div>
          <div><strong>01:01</strong><span>Coach / student</span></div>
          <div><strong>2014</strong><span>Founded in Brooklyn</span></div>
        </div>
      </div>
      <div className="hero-scroll">Scroll to train</div>
    </section>
  );
}

function Ticker() {
  const items = ['Focus', 'Strength', 'Composure', 'Respect', 'Progress', 'Focus', 'Strength', 'Composure', 'Respect', 'Progress'];
  return <div className="ticker" aria-label="Northline values" data-testid="ticker"><div className="ticker-track">{items.map((item, index) => <span key={`${item}-${index}`}>{item}</span>).flatMap((node, index) => [node, <b key={`dot-${index}`} />])}</div></div>;
}

function Intro() {
  return (
    <section className="intro" id="about" data-testid="section-about">
      <div className="container intro-grid">
        <div className="reveal">
          <div className="section-label">01 / Why Northline</div>
          <h2 className="display">More than<br /><span className="outline">a workout.</span></h2>
          <p className="intro-copy">Training changes how you carry yourself. We coach the physical skill and the quieter work underneath it: patience, courage, and showing up when it would be easier not to.</p>
        </div>
        <div className="intro-side reveal delay-1">
          <p className="display">The room is demanding. The people in it are on your side.</p>
          <a className="button button-outline" href="#programs" data-testid="button-intro-programs">Find your starting point <ArrowUpRight size={15} /></a>
          <div className="signature"><span className="signature-line" /> <span>Coach Mara Chen, Founder</span></div>
        </div>
      </div>
    </section>
  );
}

function MethodStory() {
  const [frame, setFrame] = useState(36);
  const [active, setActive] = useState(0);
  const storyRef = useRef<HTMLElement>(null);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const node = storyRef.current;
        if (node) {
          const rect = node.getBoundingClientRect();
          const progress = Math.max(0, Math.min(1, (window.innerHeight * .62 - rect.top) / Math.max(1, rect.height - window.innerHeight * .3)));
          setFrame(Math.round(1 + progress * 299));
          setActive(Math.min(3, Math.floor(progress * 4)));
        }
        raf = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  const steps = [
    ['01', 'Arrive', 'You do not need to be fit to begin. You only need to enter the room.'],
    ['02', 'Learn', 'Clear instruction, honest feedback, and the right amount of pressure.'],
    ['03', 'Repeat', 'Skill is built in the unglamorous minutes. We make those minutes count.'],
    ['04', 'Carry it', 'Leave with a steadier breath and take that composure into the rest of your day.'],
  ];
  return (
    <section className="story" id="method" ref={storyRef} data-testid="section-method">
      <div className="container">
        <div className="story-header reveal">
          <div><div className="eyebrow">02 / The method</div><h2 className="display">Built through<br /><span className="accent">the work.</span></h2></div>
          <p className="story-note">No shortcuts. No intimidation theatre. Just excellent coaching, a measured pace, and a room that expects you to grow.</p>
        </div>
        <div className="story-stage">
          <div className="frame-wrap">
            <img src={framePath(frame)} alt="Training sequence at Northline Dojo" data-testid="img-training-sequence" />
            <div className="frame-caption"><strong>Frame {String(frame).padStart(3, '0')} / 300</strong><span>Motion becomes instinct</span></div>
          </div>
          <div className="story-steps">
            {steps.map(([number, title, copy], index) => (
              <div className={`story-step ${active === index ? 'active' : ''}`} key={number} data-testid={`story-step-${number}`}>
                <div className="number">{number}</div><h3>{title}</h3><p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Programs() {
  const items = [
    ['01', 'Foundations', 'A calm, structured first step for adults who want to learn well.'],
    ['02', 'Youth development', 'Ages 7–15. Focus, fitness, and confidence with clear boundaries.'],
    ['03', 'Fighter track', 'Technical sparring and competition preparation for committed athletes.'],
    ['04', 'Private coaching', 'One-on-one attention for a specific goal or a faster path forward.'],
  ];
  return (
    <section className="programs" id="programs" data-testid="section-programs">
      <div className="container">
        <div className="program-head reveal">
          <div><div className="eyebrow">03 / Training paths</div><h2 className="display">Choose your<br />next round.</h2></div>
          <p>Every program starts with the same promise: you will know what you are working on, and why.</p>
        </div>
        <div className="program-list">
          {items.map(([number, title, copy]) => (
            <a className="program reveal" href="#trial" key={number} data-testid={`link-program-${number}`}>
              <span className="program-num">{number}</span><h3>{title}</h3><p>{copy}</p><span className="program-arrow"><ArrowUpRight size={24} strokeWidth={1.2} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Voices() {
  return (
    <section className="proof" id="voices" data-testid="section-voices">
      <div className="container proof-grid">
        <div className="proof-intro reveal"><div className="eyebrow">04 / Member voices</div><h2 className="display">The work<br />speaks.</h2><p>Northline is a room full of different reasons to start. Here are a few from the people who kept going.</p></div>
        <div className="proof-list">
          <figure className="proof-item reveal"><blockquote>“I came in wanting to feel safer. I stayed because I started trusting myself.”</blockquote><cite>Leila R. / Foundations, 18 months</cite></figure>
          <figure className="proof-item reveal delay-1"><blockquote>“My daughter is more focused at school. She has a place where effort is visible.”</blockquote><cite>Jamal T. / Parent of Youth Development student</cite></figure>
          <figure className="proof-item reveal delay-2"><blockquote>“The coaching is precise without ever making you feel small. That is rare.”</blockquote><cite>Tomás K. / Fighter Track</cite></figure>
        </div>
      </div>
    </section>
  );
}

function Trial() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="trial" id="trial" data-testid="section-trial">
      <div className="container trial-grid">
        <div className="reveal"><div className="eyebrow">05 / Your first class</div><h2 className="display">Start<br />where<br /><span className="ink">you are.</span></h2><p>Come see the room, meet a coach, and take a class at your own pace. Your first session includes a tour, a movement assessment, and no pressure to commit.</p></div>
        <form className="trial-form reveal delay-1" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} data-testid="form-trial">
          <h3>Book a trial class</h3>
          {submitted ? <div className="form-message" data-testid="status-trial-success">You are on the list. We will reach out within one business day to find your first session.</div> : <>
            <div className="form-row"><div className="form-field"><label htmlFor="name">Your name</label><input id="name" required placeholder="First and last" data-testid="input-name" /></div><div className="form-field"><label htmlFor="email">Email</label><input id="email" required type="email" placeholder="you@email.com" data-testid="input-email" /></div></div>
            <div className="form-row"><div className="form-field"><label htmlFor="interest">I am interested in</label><select id="interest" defaultValue="foundations" data-testid="select-interest"><option value="foundations">Adult foundations</option><option value="youth">Youth development</option><option value="fighter">Fighter track</option><option value="private">Private coaching</option></select></div><div className="form-field"><label htmlFor="time">Best time</label><select id="time" defaultValue="evenings" data-testid="select-time"><option value="mornings">Mornings</option><option value="evenings">Evenings</option><option value="weekends">Weekends</option></select></div></div>
            <button className="button button-primary" type="submit" data-testid="button-submit-trial">Request your trial <ArrowUpRight size={15} /></button>
          </>}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-top"><Brand /><div className="footer-links"><a href="#about" data-testid="link-footer-about">About</a><a href="#programs" data-testid="link-footer-programs">Programs</a><a href="#trial" data-testid="link-footer-contact">Contact</a><a href="https://instagram.com" target="_blank" rel="noreferrer" data-testid="link-footer-instagram"><Instagram size={14} /> Instagram</a></div></div><div className="footer-bottom"><span>Northline Dojo / Brooklyn, NY</span><span>Train with purpose.</span><span className="socials">© {new Date().getFullYear()} Northline</span></div></div></footer>;
}

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: .12 });
    document.querySelectorAll('.reveal:not(.visible)').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <main className="site-shell"><Navigation /><Hero /><Ticker /><Intro /><MethodStory /><Programs /><Voices /><Trial /><Footer /></main>;
}

export default App;