import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// app/layout.js
import './globals.css';

export const metadata = {
  title: 'My Personal Website',
  description: 'Built with Next.js 13 App Router',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* You could also include a <Header /> from /components here */}
        {children}
        {/* And a <Footer /> if desired */}
      </body>
    </html>
  );
}
