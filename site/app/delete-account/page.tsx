import type { Metadata } from 'next';

import { DeletePage } from '@/components/DeletePage';
import { en } from '@/content/copy';

export const metadata: Metadata = {
  title: en.meta.deleteTitle,
  description: en.meta.deleteDescription,
  alternates: { canonical: '/delete-account', languages: { hi: '/hi/delete-account' } },
};

export default function Page() {
  return <DeletePage lang="en" />;
}
