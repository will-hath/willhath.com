"use client"
import React from 'react';
import { useEffect, useRef } from 'react';
import TVGrid from '@/components/TVGrid/TVGrid';
import './home.css';
import { TVProps } from "@/types/types";
import { quotes } from '@/app/quotes/quotesArray';
import { tidbits } from '@/app/tidbits/tidbitsArray';
import ForegroundScene from '@/components/ForegroundScene/ForegroundScene';

const Tidbits: TVProps = {
  textSources: tidbits.map(tidbit => tidbit.text),
  name: "tidbits",
  href: "/tidbits/"
}

const Substack: TVProps = {
  imageSources: ["/assets/substack.png"],
  name: "substack",
  href: "https://willhath.substack.com"
}

const Quotes: TVProps = {
  imageSources: ["/assets/comingsoon.png"],
  textSources: quotes,
  name: "quotes",
  href: "/quotes/"
}


export default function Home() {
  const mainContainerRef = useRef<HTMLElement>(null);

  const tvContents: (TVProps | null)[] = [
    null, null, Substack, null, null,
    null, Tidbits, null, Quotes, null,
    null, null, null, null, null
  ];

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
    <main className="main-container" ref={mainContainerRef}>
      <div className="content-wrapper">
        <div className="grid-container">
          <TVGrid 
            rows={3} 
            columns={5}
            tvContents={tvContents} />
        </div>
        <ForegroundScene></ForegroundScene>
      </div>
    </main>
  );
}
