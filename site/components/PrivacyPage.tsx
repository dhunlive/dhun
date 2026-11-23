import { Footer, Header } from '@/components/Chrome';
import { copyFor, type Lang } from '@/content/copy';

// The privacy policy (Play Console › App content › Privacy policy links here).
// Every statement is true of the code as of the "updated" date: retention numbers
// come from backend/src/workers/jobs/retention.ts and the event log / analytics
// jobs, deletion from deleteAccount in account.service.ts. Change one, change
// the other — and the date.
export function PrivacyPage({ lang }: { lang: Lang }) {
  const c = copyFor(lang);
  const p = c.privacy;
  return (
    <div lang={lang} className={`lang-${lang}`}>
      <a className="skip" href="#main">
        {c.skip}
      </a>
      <Header copy={c} lang={lang} path="/privacy" tone="light" sections={false} />

      <main id="main" className="doc">
        <div className="wrap">
          <p className="eyebrow">{p.eyebrow}</p>
          <h1>{p.title}</h1>
          <p className="lede">{p.lede}</p>
          <p className="updated">{p.updated}</p>

          {p.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              {s.body?.map((para, i) => <p key={i}>{para}</p>)}
              {s.list && (
                <ul>
                  {s.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </main>

      <Footer copy={c} lang={lang} />
    </div>
  );
}
