"use client"
import { useEffect } from 'react';
import { blogPosts } from '../blogPosts';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

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
      <article>
        <h1>{post.title}</h1>
        <div className="blog-meta">
          <time dateTime={post.date}>{post.date}</time>
        </div>
        <div className="blog-content">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
} 