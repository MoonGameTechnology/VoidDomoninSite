import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowDown, Pause, Play, CaretDown, Rocket, Coins, Atom, Handshake, Globe, Shield, ChatCircle, Storefront } from '@phosphor-icons/react';
import { Reveal } from './components/Reveal';
import { StarFlight } from './components/StarFlight';
import { GAME, CONTENT, type Locale, type SiteContent } from './data';
import {
  LOCALES,
  LOCALE_LABEL,
  LOCALE_NAME,
  detectLocale,
  persistLocale,
  applyLocaleToDocument,
} from './i18n';

const asset = (path: string) => import.meta.env.BASE_URL + path;

function LangMenu({ locale, onSelect }: { locale: Locale; onSelect: (l: Locale) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="lang-menu" ref={ref}>
      <button
        className="lang-btn"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        onClick={() => setOpen((o) => !o)}
      >
        {LOCALE_LABEL[locale]} <CaretDown size={12} aria-hidden />
      </button>
      {open && (
        <ul className="lang-list" role="listbox" aria-label="Language">
          {LOCALES.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                className={l === locale ? 'active' : undefined}
                onClick={() => {
                  onSelect(l);
                  setOpen(false);
                }}
              >
                {LOCALE_NAME[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Nav({ t, locale, onLocale }: { t: SiteContent; locale: Locale; onLocale: (l: Locale) => void }) {
  return (
    <header className="nav">
      <a className="brand" href="#top">
        <img src={asset('brand/icon-small.png')} alt="" width={34} height={34} />
        <span>VOID <b>DOMINION</b></span>
      </a>
      <nav className="nav-links">
        <a href="#features">{HORIZON[locale].about}</a>
        <a href="#factions">{t.nav.factions}</a>
        <LangMenu locale={locale} onSelect={onLocale} />
      </nav>
    </header>
  );
}

const HORIZON = {
  ru: { tagline: ['Одна галактика.', 'Тысячи решений.'], about: 'Об игре', download: 'Скачать альфу', note: 'Android · Тестовый режим с ботами.', story: 'Война начинается задолго до первого выстрела.', detail: 'Развивайте колонии. Меняйте баланс сил.' },
  en: { tagline: ['One galaxy.', 'A thousand decisions.'], about: 'About the game', download: 'Download alpha', note: 'Android · Test mode against bots.', story: 'War begins long before the first shot.', detail: 'Develop colonies. Shift the balance of power.' },
  zh: { tagline: ['一座银河。', '无数种选择。'], about: '了解游戏', download: '下载试玩版', note: 'Android · 对战机器人测试模式', story: '战争早在第一声炮响前就已开始。', detail: '发展殖民地。改变力量的平衡。' },
};

const BRIDGE = {
  ru: { station: 'Командный мостик', alpha: 'Альфа-версия', briefing: 'Открыть брифинг', motion: 'Анимация' },
  en: { station: 'Command bridge', alpha: 'Alpha version', briefing: 'Open briefing', motion: 'Animation' },
  zh: { station: '指挥舰桥', alpha: 'Alpha 测试版', briefing: '查看简报', motion: '动画' },
};

// These instruments are part of the decorative bridge, not live game telemetry.
function BridgeInstruments() {
  return (
    <div className="bridge-instruments" aria-hidden="true">
      <div className="instrument instrument--radar">
        <div className="instrument-heading"><span>ORBITAL SCAN</span><span className="instrument-code">01</span></div>
        <div className="radar">
          <svg className="radar-grid" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="94" strokeDasharray="1 8" />
            <circle cx="100" cy="100" r="80" />
            <circle cx="100" cy="100" r="53" />
            <circle cx="100" cy="100" r="26" />
            <path d="M100 12v176M12 100h176M38 38l124 124M38 162 162 38" />
            <path className="radar-route" d="m44 125 30-58 65 53 16-70" strokeDasharray="3 5" />
          </svg>
          <span className="radar-sweep" />
          <span className="radar-orbit"><i /></span>
          <i className="radar-contact radar-contact--one" />
          <i className="radar-contact radar-contact--two" />
          <i className="radar-contact radar-contact--three" />
          <span className="radar-center" />
        </div>
        <div className="instrument-footer"><span>SECTOR / 07</span><span>18.4 AU</span></div>
      </div>
      <div className="instrument instrument--signal">
        <div className="instrument-heading"><span>DEEP SPACE</span><span className="instrument-code">02</span></div>
        <div className="signal-coordinate"><small>VECTOR</small><span>03<span>·</span>19<span>·</span>07</span></div>
        <div className="signal-wave">
          <svg viewBox="0 0 240 60" fill="none">
            <path className="signal-grid" d="M0 15h240M0 30h240M0 45h240M40 0v60M80 0v60M120 0v60M160 0v60M200 0v60" />
            <path className="signal-path" d="M0 30h20l5-4 5 8 6-16 7 27 7-20 6 5h24l6-10 6 20 8-35 9 49 8-29 6 5h27l6-6 7 11 7-17 8 24 7-16 6 4h49" />
            <path className="signal-trace" pathLength="100" d="M0 30h20l5-4 5 8 6-16 7 27 7-20 6 5h24l6-10 6 20 8-35 9 49 8-29 6 5h27l6-6 7 11 7-17 8 24 7-16 6 4h49" />
          </svg>
        </div>
        <div className="signal-bars">{[28, 46, 65, 42, 80, 58, 92, 74, 48, 66, 36, 52].map((height, index) => <i key={index} style={{ '--bar-height': `${height}%`, '--bar-index': index } as CSSProperties} />)}</div>
        <div className="instrument-footer"><span>FREQUENCY / ∞</span><span className="signal-status">SYNC</span></div>
      </div>
    </div>
  );
}

function Hero({ t, locale }: { t: SiteContent; locale: Locale }) {
  const copy = HORIZON[locale];
  const bridge = BRIDGE[locale];
  const scene = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [motionActive, setMotionActive] = useState(false);
  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mouse = window.matchMedia('(hover: hover) and (pointer: fine)');
    let visible = true;
    const reset = () => {
      element.style.setProperty('--parallax-x', '0px');
      element.style.setProperty('--parallax-y', '0px');
    };
    const sync = () => {
      const active = !paused && !reduced.matches && visible && !document.hidden;
      setMotionActive(active);
      if (!active || !mouse.matches) reset();
    };
    const move = (event: PointerEvent) => {
      if (element.dataset.motion !== 'running' || !mouse.matches || event.pointerType !== 'mouse') return;
      const bounds = element.getBoundingClientRect();
      element.style.setProperty('--parallax-x', `${(event.clientX - bounds.left - bounds.width / 2) / bounds.width * -12}px`);
      element.style.setProperty('--parallax-y', `${(event.clientY - bounds.top - bounds.height / 2) / bounds.height * -8}px`);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    element.addEventListener('pointermove', move, { passive: true });
    element.addEventListener('pointerleave', reset);
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', sync);
    mouse.addEventListener('change', sync);
    sync();
    return () => {
      observer.disconnect();
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', reset);
      document.removeEventListener('visibilitychange', sync);
      reduced.removeEventListener('change', sync);
      mouse.removeEventListener('change', sync);
      reset();
    };
  }, [paused]);
  const motionLabel = {
    ru: paused ? 'Включить анимацию' : 'Остановить анимацию',
    en: paused ? 'Resume animation' : 'Pause animation',
    zh: paused ? '恢复动画' : '暂停动画',
  }[locale];
  return (
    <>
      <section className="hero" id="top" ref={scene} data-motion={motionActive ? 'running' : 'paused'}>
        <div className="hero-parallax" aria-hidden="true">
          <img
            className="hero-art"
            src={asset('brand/hero-starfield.webp')}
            srcSet={`${asset('brand/hero-starfield.webp')} 1672w, ${asset('brand/hero-starfield-4k.webp')} 3840w`}
            sizes="100vw"
            alt=""
            width={1672}
            height={941}
            fetchPriority="high"
          />
        </div>
        <div className="hero-motion" aria-hidden="true">
          <div className="hero-motion__veil" />
          <StarFlight running={motionActive} />
          <div className="bridge-reticle bridge-reticle--left"><span>− 07</span><i /><span>+ 19</span></div>
          <div className="bridge-reticle bridge-reticle--right"><span>03 +</span><i /><span>07 −</span></div>
        </div>
        <div className="hero-inner">
          <div className="bridge-topline"><span className="bridge-station"><i aria-hidden="true" />{bridge.station}</span><span>VD — 001</span></div>
          <div className="bridge-glass" aria-hidden="true"><i /><i /><i /><i /></div>
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <div className="hero-title-wrap">
            <h1 className="hero-title" aria-label="VOID DOMINION">
              <span className="hero-title__letters" aria-hidden="true">
                {['VOID', 'DOMINION'].map((word, wordIndex) => (
                  <span className="hero-word" key={word}>
                    {word.split('').map((letter, index) => (
                      <span className="hero-letter" data-letter={letter} style={{ '--letter-index': index + wordIndex * 4 } as CSSProperties} key={`${letter}-${index}`}>{letter}</span>
                    ))}
                  </span>
                ))}
              </span>
            </h1>
          </div>
          <p className="hero-tagline">{copy.tagline.map(line => <span key={line}>{line}</span>)}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={GAME.apkUrl}>{copy.download}<ArrowDown size={20} aria-hidden /></a>
            <a className="btn btn-ghost" href={GAME.browserUrl} target="_blank" rel="noopener noreferrer">{t.hero.browser}<Globe size={22} aria-hidden /></a>
          </div>
          <p className="hero-note">{copy.note}</p>
          <div className="bridge-bottomline"><span className="bridge-alpha">{bridge.alpha}</span><span className="bridge-mark" aria-hidden="true">///</span><span aria-hidden="true">MMO / RTS</span></div>
        </div>
        <BridgeInstruments />
        <div className="bridge-projector" aria-hidden="true"><span className="projection-beam" /><span className="projection-ring" /><span className="projection-core" /></div>
        <div className="bridge-lower">
          <a className="briefing-link" href="#features"><span>{bridge.briefing}</span><ArrowDown size={18} aria-hidden /></a>
          <span className="bridge-caption" aria-hidden="true">VOID DOMINION / COMMAND INTERFACE</span>
        </div>
        <button className="motion-toggle" type="button" onClick={() => setPaused(value => !value)} aria-label={motionLabel} title={motionLabel} aria-pressed={paused}>
          {paused ? <Play size={15} aria-hidden /> : <Pause size={15} aria-hidden />}<span>{bridge.motion}</span>
        </button>
      </section>
      <div className="story-strip"><p>{copy.story}</p><span>{copy.detail}</span></div>
    </>
  );
}

function Stats({ t }: { t: SiteContent }) {
  return (
    <section className="stats">
      {t.stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08} className="stat">
          <div className="stat-value">{s.value}</div>
          <div className="stat-label">{s.label}</div>
        </Reveal>
      ))}
    </section>
  );
}

function SectionHeader({ head }: { head: SiteContent['features']['head'] }) {
  return (
    <Reveal className="section-head">
      <p className="kicker">{head.kicker}</p>
      <h2>{head.h2}</h2>
      {head.sub && <p className="section-sub">{head.sub}</p>}
    </Reveal>
  );
}

const featureIcons = [Rocket, Coins, Atom, Handshake, Globe, Shield];
function Features({ t }: { t: SiteContent }) {
  return (
    <section className="section" id="features">
      <SectionHeader head={t.features.head} />
      <div className="feature-grid">
        {t.features.items.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 0.08} className="card">
            <div className="card-icon" aria-hidden>{(() => { const Icon = featureIcons[i]; return <Icon size={26} weight="light" />; })()}</div>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Factions({ t }: { t: SiteContent }) {
  return (
    <section className="section" id="factions">
      <SectionHeader head={t.factions.head} />
      <div className="faction-grid">
        {t.factions.items.map((f, i) => (
          <Reveal key={f.name} delay={i * 0.07} className="faction">
            <span className="faction-index" style={{ color: f.color }}>{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>{f.name}</h3>
              <p style={{ color: f.color }}>{f.passive}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CTA({ t }: { t: SiteContent }) {
  return (
    <section className="cta" id="play">
      <Reveal className="cta-inner">
        <h2>{t.cta.h2}</h2>
        <p>{t.cta.text}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={GAME.apkUrl}>{t.cta.download}</a>
          <a
            className="btn btn-ghost"
            href={GAME.browserUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.hero.browser}
          </a>
        </div>
        <p className="hero-note">{t.hero.apkNote}</p>
        <div className="soon-grid">
          {t.upcoming.map((u, i) => {
            const Icon = [Globe, ChatCircle, Storefront][i];
            const inner = (
              <>
                <span className="soon-icon" aria-hidden><Icon size={24} weight="light" /></span>
                {!u.href && <span className="soon-badge">{t.soonBadge}</span>}
                <h3>{u.title}</h3>
                <p>{u.text}</p>
              </>
            );
            return u.href ? (
              <a key={u.title} className="soon" href={u.href}>{inner}</a>
            ) : (
              <div key={u.title} className="soon">{inner}</div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

function Footer({ t }: { t: SiteContent }) {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img src={asset('brand/icon-small.png')} alt="" width={26} height={26} />
        <span>VOID DOMINION</span>
      </div>
      <p>{t.footer.copyright}</p>
      <span className="footer-soon">{t.footer.soon}</span>
    </footer>
  );
}

export default function App() {
  const [locale, setLocale] = useState<Locale>(detectLocale);
  const t = CONTENT[locale];

  useEffect(() => {
    applyLocaleToDocument(locale);
  }, [locale]);

  const selectLocale = (next: Locale) => {
    persistLocale(next);
    setLocale(next);
  };

  return (
    <>
      <Nav t={t} locale={locale} onLocale={selectLocale} />
      <main>
        <Hero t={t} locale={locale} />
        <Stats t={t} />
        <Features t={t} />
        <Factions t={t} />
        <CTA t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
