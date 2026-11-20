import type { Metadata } from 'next';

import { HomePage } from '@/components/HomePage';
import { hi } from '@/content/copy';

export const metadata: Metadata = {
  title: hi.meta.title,
  description: hi.meta.description,
  alternates: { canonical: '/hi', languages: { en: '/' } },
  openGraph: { title: hi.meta.title, description: hi.meta.description, url: '/hi', locale: 'hi_IN' },
};

export default function Page() {
  return <HomePage lang="hi" />;
}
