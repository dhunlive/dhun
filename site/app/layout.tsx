import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import './globals.css';

// Self-hosted (OFL, app/fonts): a visit never contacts a third party. Mukta's
// Latin and Devanagari files are separate families stacked in CSS, so a Hindi
// glyph falls through to the Devanagari file. Fraunces has no Devanagari; in
// Hindi, headings use Mukta.
const muktaLatin = localFont({
  src: [
    { path: './fonts/mukta-400-latin.woff2', weight: '400' },
    { path: './fonts/mukta-600-latin.woff2', weight: '600' },
    { path: './fonts/mukta-800-latin.woff2', weight: '800' },
  ],
  variable: '--font-mukta-latin',
  display: 'swap',
});
const muktaDeva = localFont({
  src: [
    { path: './fonts/mukta-400-devanagari.woff2', weight: '400' },
    { path: './fonts/mukta-600-devanagari.woff2', weight: '600' },
    { path: './fonts/mukta-800-devanagari.woff2', weight: '800' },
  ],
  variable: '--font-mukta-deva',
  display: 'swap',
  preload: false,
});
const fraunces = localFont({
  src: './fonts/fraunces-latin-var.woff2',
  weight: '600 800',
  variable: '--font-fraunces',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dhunlive.com'),
  title: 'Dhun: live rooms in your language',
  description:
    'Dhun is a live audio and video app for India. Sing, talk and hang out in party rooms of up to 20 seats, in Hindi, Bhojpuri, Tamil and eleven more languages. 18+ only.',
  openGraph: { type: 'website', siteName: 'Dhun' },
};

export const viewport: Viewport = { themeColor: '#1a1218' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${muktaLatin.variable} ${muktaDeva.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
