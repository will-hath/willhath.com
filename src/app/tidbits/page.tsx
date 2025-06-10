"use client"
import { useEffect, useRef} from 'react';
import { useSearchParams } from 'next/navigation';
import { tidbits } from './tidbitsArray';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';

export default function Tidbits() {
  const searchParams = useSearchParams();
  const tidbitRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tidbitId = searchParams.get('tidbit');
    if (tidbitId != null) {
      const index = parseInt(tidbitId);
      const tidbitElement = tidbitRefs.current[index]
      if (tidbitElement) {
        tidbitElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
      <div>
        {tidbits.map((tidbit, i) => (
            <div
              key={i}
              ref={el => { tidbitRefs.current[i] = el; }}
              style={{ marginBottom: '2rem' }}
            >
              <h4>{tidbit.date}</h4>
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeMathjax]}
              >
                {tidbit.text}
              </ReactMarkdown>
            </div>
          ))}
        </div>
    </main>
  );
}