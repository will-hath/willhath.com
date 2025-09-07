"use client"
import { useEffect, useRef, Suspense} from 'react';
import { useSearchParams } from 'next/navigation';
import { tidbits } from './tidbitsArray';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

function TidbitsContent() {
  const searchParams = useSearchParams();
  const tidbitRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tidbitId = searchParams.get('tidbit');
    if (tidbitId != null) {
      const index = parseInt(tidbitId);
      const tidbitElement = tidbitRefs.current[index]
      if (tidbitElement) {
        tidbitElement.scrollIntoView({ behavior: 'instant', block: 'center' });
        // Add a highlight effect
        tidbitElement.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        setTimeout(() => {
          tidbitElement.style.backgroundColor = '';
        }, 2000);
      }
    }
  }, [searchParams]);

  return (
    <main className="page-border">
      <h1>Tidbits</h1>
      <div className="tidbits-content">
        {tidbits.map((tidbit, i) => (
            <div
              key={i}
              ref={el => { tidbitRefs.current[i] = el; }}
              style={{ marginBottom: '2rem' }}
            >
              <h4>{tidbit.date}</h4>
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {tidbit.text}
              </ReactMarkdown>
            </div>
          ))}
        </div>
    </main>
  );
}

export default function Tidbits() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TidbitsContent />
    </Suspense>
  );
}