"use client"
import React from 'react';
import { useEffect, useRef } from 'react';
import TVGrid from '@/components/TVGrid/TVGrid';
import './home.css';
import { TVProps } from "@/types/types";
import TV from '@/components/TV/TV';
import Desk from '@/components/Desk/Desk';

const Tidbits: TVProps = {
  imageSource: "/assets/chalkboard.jpg",
  name: "Tidbits",
  href: "/tidbits/"
}
// ssdfa
const Substack: TVProps = {
  imageSource: "/assets/substack.png",
  name: "Substack",
  href: "https://willhath.substack.com"
}

const Projects: TVProps = {
  imageSource: "/assets/comingsoon.png",
  name: "Projects",
  href: "/projects/"
}

const Bookshelf: TVProps = {
  imageSource: "/assets/comingsoon.png",
  name: "Bookshelf",
  href: "/bookshelf/"
}

const Quotes: TVProps = {
  imageSource: "/assets/comingsoon.png",
  name: "Quotes",
  href: "/quotes/"
}

const LeftGroundTV: TVProps = {
  imageSource: "/assets/spruce.gif",
  name: "Spruce",
  href: "https://spruce.world/"
}

const RightGroundTV: TVProps = {
  imageSource: "/assets/atticus.gif",
  name: "Atticus",
  href: "https://chry-santhemum.github.io/website/",
}

export default function Home() {
  const mainContainerRef = useRef<HTMLElement>(null);

  const tvContents: (TVProps | null)[] = [
    null, null, Bookshelf, Substack, Quotes, null, null,
    null, null, null, Tidbits, null, null, null,
    null, null, Projects, null, null, null, null
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
            columns={7}
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
          <img 
            src="/assets/man_from_behind.png"
            alt="Viewer"
            className="viewer-image"
          />
            <div className="nameplate-container">
              <a href="/about/">
                <img
                  src="/assets/nameplate.png"
                  alt="Nameplate"
                  className="nameplate"
                />
              </a>
            </div>
        </div>
      </div>
    </main>
  );
}
