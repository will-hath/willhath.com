"use client"
import { useEffect, useRef, Suspense } from 'react';
import { quotes } from './quotesArray';
import { useSearchParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

function QuotesContent() {
    const searchParams = useSearchParams();
    const quoteRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    useEffect(() => {
      const quoteId = searchParams.get('quote');
      if (quoteId !== null) {
        const index = parseInt(quoteId);
        const quoteElement = quoteRefs.current[index];
        if (quoteElement) {
          quoteElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add a highlight effect
          quoteElement.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          setTimeout(() => {
            quoteElement.style.backgroundColor = '';
          }, 2000);
        }
      }
    }, [searchParams]);

    return (
      <main className="page-border">
        <h1>Quotes</h1>
        <div>
          {quotes.map((quote, i) => (
            <div
              key={i}
              ref={el => { quoteRefs.current[i] = el; }}
              style={{ marginBottom: '2rem' }}
            >
              <ReactMarkdown>{quote}</ReactMarkdown>
            </div>
          ))}
        </div>
      </main>
    );
}

export default function Quotes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuotesContent />
    </Suspense>
  );
}
