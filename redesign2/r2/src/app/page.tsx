"use client"
import Image from "next/image";
import { useEffect, useRef } from 'react';
import TVGrid from '@/components/TVGrid/TVGrid';
import './page.css';
import { TVProps } from "@/types/types";
import Link from 'next/link';

const Tidbits: TVProps = {
  imageSource: "/assets/chalkboard.jpg",
  name: "Tidbits",
  href: "/tidbits/"
}

const Substack: TVProps = {
  imageSource: "/assets/substack.png",
  name: "Substack",
  href: "https://willhath.substack.com"
}

const Projects: TVProps = {
  imageSource: "/assets/tv_static.gif",
  name: "Projects",
  href: "/projects/index.html"
}



export default function Home() {
  const mainContainerRef = useRef<HTMLElement>(null);

  const tvContents: (TVProps | null)[] = [
    null, null, null, Substack, null, null, null,
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
          <img 
            src="/assets/man_from_behind.png"
            alt="Viewer"
            className="viewer-image"
          />
          <img
            src="/assets/nameplate.png"
            alt="Nameplate"
            className="nameplate"
          />
        </div>
      </div>
    </main>
  );
}
