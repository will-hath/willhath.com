"use client"
import React from 'react';
import { useEffect, useRef } from 'react';
import TVGrid from '@/components/TVGrid/TVGrid';
import './home.css';
import { TVProps } from "@/types/types";
import TV from '@/components/TV/TV';
import Desk from '@/components/Desk/Desk';
import Image from 'next/image';
import { quotes } from '@/app/quotes/quotesArray';
import { tidbits } from '@/app/tidbits/tidbitsArray';

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
 
// const Projects: TVProps = {
//   imageSources: ["/assets/comingsoon.png"],
//   name: "projects",
//   href: "/projects/"
// }

// const Bookshelf: TVProps = {
//   imageSources: ["/assets/comingsoon.png"],
//   name: "bookshelf",
//   href: "/bookshelf/"
// }

const Quotes: TVProps = {
  imageSources: ["/assets/comingsoon.png"],
  textSources: quotes,
  name: "quotes",
  href: "/quotes/"
}

const LeftGroundTV: TVProps = {
  imageSources: ["/assets/spruce.gif"],
  name: "Spruce",
  href: "https://spruce.world/",
  hasAntennas: true
}

const RightGroundTV: TVProps = {
  imageSources: ["/assets/atticus.gif"],
  name: "Atticus",
  href: "https://chry-santhemum.github.io/website/",
  hasAntennas: true
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
        <div className="foreground">
          <Desk></Desk>
          <div className="ground-tvs">
            <div className="ground-tv">
              <TV {...LeftGroundTV} />
            </div>
            <div className="ground-tv">
              <TV {...RightGroundTV} />
            </div>
          </div>
          <Image 
            src="/assets/man_from_behind.png"
            alt="Viewer"
            className="viewer-image"
            width={500}
            height={800}
            priority
          />
            <div className="nameplate-container">
              <a href="/about/">
                <Image
                  src="/assets/nameplate.png"
                  alt="Nameplate"
                  className="nameplate"
                  width={300}
                  height={60}
                  priority
                />
              </a>
            </div>
        </div>
      </div>
    </main>
  );
}
