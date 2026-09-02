import type { Metadata } from 'next';
import SymbolSprint from './SymbolSprint';
import './symbol-sprint.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://willhath.com'),
  title: 'Daily Symbol Sprint',
  description: 'A 90-second symbol–digit test with a new daily key, private score history, and learning-rate tracking.',
  alternates: {
    canonical: '/symbol-sprint',
  },
  openGraph: {
    type: 'website',
    url: '/symbol-sprint',
    siteName: 'Finding Out',
    title: 'Daily Symbol Sprint',
    description:
      'A 90-second symbol–digit test with a new daily key, private score history, and learning-rate tracking.',
    images: [
      {
        url: '/symbol-sprint-og.png',
        width: 1731,
        height: 909,
        alt: 'Daily Symbol Sprint: a 90-second symbol–digit test with nine symbols paired to the numbers 1 through 9.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Symbol Sprint',
    description: 'Test your symbol-matching speed in 90 seconds and track how your pace changes during each run.',
    images: ['/symbol-sprint-og.png'],
  },
};

export default function SymbolSprintPage() {
  return <SymbolSprint />;
}
