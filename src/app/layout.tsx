import React from 'react';
import { Geist } from "next/font/google";
// app/layout.js
import './globals.css';

const geist = Geist({ subsets: ['latin'] });

export const metadata = {
  title: 'My Personal Website',
  description: 'Built with Next.js 13 App Router',
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
