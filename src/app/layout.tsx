import React from 'react';
import { Geist } from "next/font/google";
// app/layout.js
import './globals.css';

const geist = Geist({ subsets: ['latin'] });

export const metadata = {
  title: 'Finding out',
  description: 'Property of William Owen Hathaway. If found, please contact me for a reward.',
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
