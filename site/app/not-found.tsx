import Link from 'next/link';

import { Header } from '@/components/Chrome';
import { en } from '@/content/copy';

export default function NotFound() {
  return (
    <>
      <Header copy={en} lang="en" path="/" tone="light" sections={false} />
      <main className="doc">
        <div className="wrap">
          <p className="eyebrow">404</p>
          <h1>{en.notFound.title}</h1>
          <p className="lede">{en.notFound.body}</p>
          <p className="actions">
            <Link className="button" href="/">
              {en.notFound.home}
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
