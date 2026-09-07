import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Pause, Play, CaretDown, Rocket, Coins, Atom, Handshake, Globe, Shield, ChatCircle, Storefront } from '@phosphor-icons/react';
import { Reveal } from './components/Reveal';
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
  ru: { tagline: 'Одна галактика. Тысячи решений.', about: 'Об игре', download: 'Скачать альфу', note: 'Android · Тестовый режим с ботами.', story: 'Война начинается задолго до первого выстрела.', detail: 'Развивайте колонии. Меняйте баланс сил.' },
  en: { tagline: 'One galaxy. A thousand decisions.', about: 'About the game', download: 'Download alpha', note: 'Android · Test mode against bots.', story: 'War begins long before the first shot.', detail: 'Develop colonies. Shift the balance of power.' },
  zh: { tagline: '一座银河。无数种选择。', about: '了解游戏', download: '下载试玩版', note: 'Android · 对战机器人测试模式', story: '战争早在第一声炮响前就已开始。', detail: '发展殖民地。改变力量的平衡。' },
};

function Hero({ t, locale }: { t: SiteContent; locale: Locale }) {
  const copy = HORIZON[locale];
  const scene = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
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
      element.dataset.motion = active ? 'running' : 'paused';
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
    ru: paused ? 'Включить движение фона' : 'Остановить движение фона',
    en: paused ? 'Resume background motion' : 'Pause background motion',
    zh: paused ? '恢复背景动画' : '暂停背景动画',
  }[locale];
  return (
    <>
      <section className="hero" id="top" ref={scene} data-motion="running">
        <div className="hero-parallax" aria-hidden="true">
          <img className="hero-art" src={asset('brand/hero-horizon-v2.webp')} alt="" fetchPriority="high" />
        </div>
        <div className="hero-motion" aria-hidden="true">
          <div className="hero-motion__surface">
            <img src={asset('brand/hero-horizon-v2.webp')} alt="" />
          </div>
          <span className="hero-motion__atmosphere" />
          <span className="hero-motion__flare" />
        </div>
        <button className="motion-toggle" type="button" onClick={() => setPaused(value => !value)} aria-label={motionLabel} title={motionLabel} aria-pressed={paused}>
          {paused ? <Play size={18} aria-hidden /> : <Pause size={18} aria-hidden />}
        </button>
        <div className="hero-inner">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 className="hero-title">VOID DOMINION</h1>
          <p className="hero-tagline">{copy.tagline}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={GAME.apkUrl}>{copy.download}<ArrowDown size={22} aria-hidden /></a>
            <a className="btn btn-ghost" href={GAME.browserUrl} target="_blank" rel="noopener noreferrer">{t.hero.browser}<Globe size={22} aria-hidden /></a>
          </div>
          <p className="hero-note">{copy.note}</p>
        </div>
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
