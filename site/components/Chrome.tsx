import Image from 'next/image';
import Link from 'next/link';

import type { Copy, Lang } from '@/content/copy';

/** Links within the site, prefixed for Hindi. */
export const href = (lang: Lang, path: string) =>
  lang === 'hi' ? (path === '/' ? '/hi' : `/hi${path}`) : path;

export function Header({
  copy,
  lang,
  path,
  tone,
  sections = true,
}: {
  copy: Copy;
  lang: Lang;
  /** This page's path without the language prefix, so the switch lands on the same page. */
  path: string;
  tone: 'night' | 'light';
  sections?: boolean;
}) {
  const other: Lang = lang === 'hi' ? 'en' : 'hi';
  return (
    <header className={`top ${tone === 'light' ? 'light' : ''}`}>
      <div className="wrap">
        <Link className="brand" href={href(lang, '/')} aria-label="Dhun">
          <Image src="/logo.svg" alt="" width={32} height={32} priority />
          dhun
        </Link>
        <nav className="nav" aria-label="Main">
          {sections ? (
            <>
              <Link className="nav-link" href={`${href(lang, '/')}#hosts`}>
                {copy.nav.hosts}
              </Link>
              <Link className="nav-link" href={`${href(lang, '/')}#safety`}>
                {copy.nav.safety}
              </Link>
            </>
          ) : null}
          <Link className="nav-link" href={`${href(lang, '/')}#contact`}>
            {copy.nav.contact}
          </Link>
          <Link
            className="lang-switch"
            href={href(other, path)}
            hrefLang={other}
            lang={other}
            aria-label={copy.nav.switchLabel}
          >
            {copy.nav.switchTo}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer({ copy, lang, home = false }: { copy: Copy; lang: Lang; home?: boolean }) {
  return (
    <footer className="foot">
      <div className="wrap">
        <p>© 2026 Dhunlive</p>
        <ul>
          {home ? (
            <li>
              <Link href={href(lang, '/delete-account')}>{copy.foot.delete}</Link>
            </li>
          ) : (
            <li>
              <Link href={href(lang, '/')}>{copy.foot.home}</Link>
            </li>
          )}
          <li>
            <Link href={href(lang, '/privacy')}>{copy.foot.privacy}</Link>
          </li>
          <li className="soon">{copy.foot.terms}</li>
        </ul>
      </div>
    </footer>
  );
}
