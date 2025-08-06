"use client"
import { useEffect } from 'react';
import { getAboutContent } from './getContent';


export default function About() {
    useEffect(() => {
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
      script.async = true;
  
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).MathJax = {
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
        <h1>About</h1>
        <div dangerouslySetInnerHTML={{ __html: getAboutContent() }} />
      </main>
    );
  }
