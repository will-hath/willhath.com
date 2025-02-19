"use client"
import { useEffect } from 'react';
import { getTidbitsContent } from './getContent';

interface MathJaxConfig {
  tex: {
    inlineMath: string[][];
    displayMath: string[][];
    processEscapes: boolean;
    processEnvironments: boolean;
  };
  svg: {
    fontCache: string;
  };
}

declare global {
  interface Window {
    MathJax: MathJaxConfig;
  }
}

export default function Tidbits() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
    script.async = true;

    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true,
        processEnvironments: true
      },
      svg: {
        fontCache: 'global'
      }
    };

    document.head.appendChild(script);
  }, []);

  return (
    <main className="page-border">
      <h1>Tidbits</h1>
      <div dangerouslySetInnerHTML={{ __html: getTidbitsContent() }} />
    </main>
  );
}