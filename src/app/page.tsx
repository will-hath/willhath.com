"use client"
import React from 'react';
import { useEffect, useRef } from 'react';
import './home.css';
import ForegroundScene from '@/components/ForegroundScene/ForegroundScene';
import BackgroundScene from '@/components/BackgroundScene/BackgroundScene';

export default function Home() {
  const mainContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Run this effect after the component mounts in the browser
    if (mainContainerRef.current) {
      const { scrollWidth, clientWidth } = mainContainerRef.current;
      if (scrollWidth > clientWidth) {
        const midpoint = (scrollWidth - clientWidth) / 2;
        mainContainerRef.current.scrollLeft = midpoint;
      }
    }
  }, []);

  return (
    <main className="main-container" ref={mainContainerRef} style={{ outline: '2px solid red' }}>
      <BackgroundScene />
      <ForegroundScene />
    </main>
  );
}
