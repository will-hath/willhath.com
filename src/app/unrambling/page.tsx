"use client"
import { useEffect } from 'react';
import { blogPosts } from './blogPosts';
import Link from 'next/link';

export default function Blog() {
  return (
    <main className="page-border">
      <h1>Blog Posts</h1>
      <div className="blog-list">
        {blogPosts.map((post, index) => (
          <article key={index} className="blog-preview">
            <h2>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <div className="blog-meta">
              <time dateTime={post.date}>{post.date}</time>
            </div>
            <p>{post.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  );
} 