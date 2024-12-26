"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { TVProps } from "@/types/types";
import AntennaBalls from "./AntennaBalls";
import "./TV.css";

export default function TV(props: TVProps | null) {
  // Track if we’ve fully mounted in the browser
  const [hasMounted, setHasMounted] = useState(false);

  // Whether the reversed GIF has already played
  const [hasPlayedReversed, setHasPlayedReversed] = useState(false);

  // Keep track of which image from the gallery to display
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Is the TV currently displaying static? (during glitch intervals)
  const [isStatic, setIsStatic] = useState<boolean>(false);

  // Has our main random/designated image loaded yet?
  const [isMainImageLoaded, setIsMainImageLoaded] = useState<boolean>(false);

  // Store reference to a random‐switching interval
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Our static GIF and reversed GIF
  const staticGif = "/assets/new_static.gif";
  const reversedGif = "/assets/tv_reversed.gif";

  // Create array of 31 images in /assets/gallery/0.jpg to /assets/gallery/30.jpg
  const galleryImages = Array.from({ length: 31 }, (_, idx) => `/assets/gallery/${idx}.jpg`);

  // The final image is either provided via props, or chosen from the gallery
  const finalImage = props?.imageSource || galleryImages[currentImageIndex];

  // On first render, mark that we’re mounted (so code only runs client‐side)
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Run after mounting: play reversed GIF once, then do random switching if there's no image prop
  useEffect(() => {
    if (!hasMounted) return;

    // Show reversed for 1.7 seconds
    const reversedTimeout = setTimeout(() => {
      setHasPlayedReversed(true);

      if (!props?.imageSource) {
        // Pick a random index to start
        setCurrentImageIndex(Math.floor(Math.random() * galleryImages.length));
        setIsMainImageLoaded(false);

        // Begin random switching every 3–10 seconds
        intervalRef.current = setInterval(() => {
          setIsStatic(true);
          setTimeout(() => setIsStatic(false), 300);

          setIsMainImageLoaded(false);
          setCurrentImageIndex((prevIndex) => {
            let newIndex = Math.floor(Math.random() * galleryImages.length);
            while (galleryImages.length > 1 && newIndex === prevIndex) {
              newIndex = Math.floor(Math.random() * galleryImages.length);
            }
            return newIndex;
          });
        }, Math.random() * 7000 + 3000);
      }
    }, 1700);

    return () => {
      clearTimeout(reversedTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hasMounted, props?.imageSource, galleryImages]);

  // Decide which image/gif to display
  const displayedImage = !hasPlayedReversed
    ? reversedGif
    : isStatic || !isMainImageLoaded
    ? staticGif
    : finalImage;

  return (
    <>
      <Head>
        <title>TV Component</title>
        <img src={staticGif} style={{ display: 'none' }} alt="" />
      </Head>
      <div className={`tv-container ${props?.hasAntennas ? "has-antennas" : ""}`}>
        {props?.hasAntennas && <AntennaBalls />}
        <div className="tv-frame">
          <div className="tv-screen">
            <Image
              src={displayedImage}
              alt="TV content"
              className="tv-image"
              fill
              sizes="(max-width: 800px) 100vw, 800px"
              onLoadingComplete={() => setIsMainImageLoaded(true)}
            />
            {props?.href && (
              <Link href={props.href} className="tv-link">
                {/* Clickable link over the TV screen */}
              </Link>
            )}
            {props?.name && <div className="tv-name-overlay">{props.name}</div>}
          </div>
        </div>
        <div className="instrument-panel">
          <div className="dial-container">
            <div className="dial" />
          </div>
          <div className="slot-container">
            <div className="slot" />
          </div>
          <div className="vent" />
        </div>
      </div>
    </>
  );
}
