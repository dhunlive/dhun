import { Footer, Header } from '@/components/Chrome';
import { copyFor, type Lang } from '@/content/copy';

// The public deletion page Google Play requires (Play Console > App content >
// Data safety). Every statement matches deleteAccount in
// backend/src/modules/auth/account.service.ts. Change one, change the other.
export function DeletePage({ lang }: { lang: Lang }) {
  const c = copyFor(lang);
  const d = c.del;
  return (
    <div lang={lang} className={`lang-${lang}`}>
      <a className="skip" href="#main">
        {c.skip}
      </a>
      <Header copy={c} lang={lang} path="/delete-account" tone="light" sections={false} />

      <main id="main" className="doc">
        <div className="wrap">
          <p className="eyebrow">{d.eyebrow}</p>
          <h1>{d.title}</h1>
          <p className="lede">{d.lede}</p>

          <h2>{d.appTitle}</h2>
          <ol>
            {d.appSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          <h2>{d.emailTitle}</h2>
          <p>{d.emailBody}</p>

          <div className="callout">
            <strong>{d.beforeTitle}</strong>
            <span>{d.beforeBody}</span>
          </div>

          <h2>{d.whatTitle}</h2>
          <div className="two-col">
            <div>
              <h3>{d.deletedTitle}</h3>
              <ul>
                {d.deleted.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{d.keptTitle}</h3>
              <ul>
                {d.kept.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
          <p>{d.why}</p>

          <h2>{d.againTitle}</h2>
          <p>{d.againBody}</p>
        </div>
      </main>

      <Footer copy={c} lang={lang} />
    </div>
  );
}
