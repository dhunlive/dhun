import Link from 'next/link';
import type { ReactNode } from 'react';

import { Footer, Header, href } from '@/components/Chrome';
import { Phone } from '@/components/Phone';
import { copyFor, type Lang } from '@/content/copy';

// Each name the way its own speakers write it, the same in both languages.
const LANGUAGES: { code: string; name: string; rtl?: boolean }[] = [
  { code: 'hi', name: 'हिन्दी' },
  { code: 'en', name: 'English' },
  { code: 'bho', name: 'भोजपुरी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'mr', name: 'मराठी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'অসমীয়া' },
  { code: 'ur', name: 'اردو', rtl: true },
];

const icon = (d: ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {d}
  </svg>
);

const FACT_ICONS = [
  icon(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>,
  ),
  icon(
    <>
      <path d="M20 12v8H4V8h16v4Z" />
      <path d="M4 8l12-4v4" />
      <circle cx="16" cy="14" r="1.5" />
    </>,
  ),
  icon(
    <>
      <path d="M3 10l9-6 9 6" />
      <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />
    </>,
  ),
  icon(
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6" />
    </>,
  ),
  icon(
    <>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6l8-3Z" />
      <path d="M9 12l2 2 4-4" />
    </>,
  ),
];

export function HomePage({ lang }: { lang: Lang }) {
  const c = copyFor(lang);
  return (
    <div lang={lang} className={`lang-${lang}`}>
      <a className="skip" href="#main">
        {c.skip}
      </a>
      <Header copy={c} lang={lang} path="/" tone="night" />

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap">
            <div>
              <h1 id="hero-title">{c.hero.title}</h1>
              <p className="lede">{c.hero.lede}</p>
              <div className="actions">
                <a className="button" href="#hosts">
                  {c.hero.cta}
                </a>
                <span className="status">
                  <span className="dot" aria-hidden="true" />
                  <span>{c.hero.status}</span>
                </span>
              </div>
            </div>
            <Phone label={c.hero.phone} />
          </div>
        </section>

        <section className="languages" aria-labelledby="lang-title">
          <div className="wrap">
            <div>
              <p className="eyebrow">{c.lang.eyebrow}</p>
              <h2 id="lang-title">{c.lang.title}</h2>
              <p className="note">{c.lang.note}</p>
            </div>
            <ul className="lang-list">
              {LANGUAGES.map((l) => (
                <li key={l.code} lang={l.code} dir={l.rtl ? 'rtl' : undefined}>
                  {l.name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="how" aria-labelledby="how-title">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">{c.how.eyebrow}</p>
              <h2 id="how-title">{c.how.title}</h2>
            </div>
            <ol className="steps">
              {c.how.steps.map((s, i) => (
                <li key={s.title}>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="hosts" id="hosts" aria-labelledby="hosts-title">
          <div className="wrap">
            <div>
              <p className="eyebrow">{c.hosts.eyebrow}</p>
              <h2 id="hosts-title">{c.hosts.title}</h2>
              <p className="lede">{c.hosts.lede}</p>
              <div className="actions">
                <a className="button" href="mailto:hosts@dhunlive.com?subject=Host%20application">
                  {c.hosts.cta}
                </a>
              </div>
              <p className="small">{c.hosts.agency}</p>
            </div>
            <ul className="facts">
              {c.hosts.facts.map((f, i) => (
                <li key={f.title}>
                  {FACT_ICONS[i]}
                  <div>
                    <strong>{f.title}</strong>
                    <span>{f.body}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="safety" id="safety" aria-labelledby="safety-title">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">{c.safety.eyebrow}</p>
              <h2 id="safety-title">{c.safety.title}</h2>
            </div>
            <div className="safety-grid">
              <div className="safety-item wide">
                <h3>{c.safety.chance.title}</h3>
                <p>{c.safety.chance.body}</p>
              </div>
              {c.safety.items.map((item) => (
                <div className="safety-item" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">{c.contact.eyebrow}</p>
              <h2 id="contact-title">{c.contact.title}</h2>
            </div>
            <div className="contact-grid">
              <div>
                <h3>{c.contact.supportTitle}</h3>
                <p>
                  <a href="mailto:support@dhunlive.com">support@dhunlive.com</a>
                </p>
                <p>{c.contact.supportBody}</p>
              </div>
              <div>
                <h3>{c.contact.grievanceTitle}</h3>
                <p>{c.contact.grievanceName}</p>
                <p>
                  <a href="mailto:grievance@dhunlive.com">grievance@dhunlive.com</a>
                </p>
                <p>{c.contact.grievanceBody}</p>
              </div>
              <div>
                <h3>{c.contact.deleteTitle}</h3>
                <p>
                  {c.contact.deleteBody}{' '}
                  <Link href={href(lang, '/delete-account')}>{c.contact.deleteLink}</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer copy={c} lang={lang} home />
    </div>
  );
}
