import type { Metadata } from 'next';

import { DeletePage } from '@/components/DeletePage';
import { hi } from '@/content/copy';

export const metadata: Metadata = {
  title: hi.meta.deleteTitle,
  description: hi.meta.deleteDescription,
  alternates: { canonical: '/hi/delete-account', languages: { en: '/delete-account' } },
};

export default function Page() {
  return <DeletePage lang="hi" />;
}
