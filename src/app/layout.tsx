import React from 'react';
import { Geist } from "next/font/google";
// app/layout.js
import './globals.css';

const geist = Geist({ subsets: ['latin'] });

export const metadata = {
  title: 'Finding Out',
  description: 'Property of William Owen Hathaway. If found, please contact me for a reward.',
  openGraph: {
    type: 'website',
    url: 'https://example.com', // Replace with your actual website URL
    title: 'Finding Out',
    description: 'Property of William Owen Hathaway. If found, please contact me for a reward.',
    images: [
      {
        url: '/assets/tv_static.gif', // Path to your GIF
        alt: 'Static on a TV screen', // Add a short description for accessibility
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finding Out',
    description: 'Property of William Owen Hathaway. If found, please contact me for a reward.',
    images: ['/assets/tv_static.gif'], // Path to your GIF
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
