import type { Metadata } from 'next';

import { HomePage } from '@/components/HomePage';
import { en } from '@/content/copy';

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
  alternates: { canonical: '/', languages: { hi: '/hi' } },
  openGraph: { title: en.meta.title, description: en.meta.description, url: '/' },
};

export default function Page() {
  return <HomePage lang="en" />;
}
