"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./TV.css";
import { TVProps } from "@/types/types";

// Create array of 31 images in /assets/gallery/0.jpg to /assets/gallery/30.jpg
const images = Array.from({ length: 31 }, (_, index) => `/assets/gallery/${index}.jpg`);

const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash;
};

const TV: React.FC<TVProps | null> = (props) => {
  // Has the reversed gif played already?
  const [hasPlayedReversed, setHasPlayedReversed] = useState(false);
  const rotation = props?.name ? Math.abs(hashString(props.name) % 360) : 45;

  // Current random image index (if not using props.imageSource)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Whether we're in the middle of showing "tv_static.gif"
  const [isStatic, setIsStatic] = useState<boolean>(false);

  // A reference to our interval for random switching
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Preload all gallery images on mount
   */
  useEffect(() => {
    // Preload the gallery images
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Also preload static and reversed GIFs
    const staticImg = new Image();
    staticImg.src = "/assets/tv_static.gif";
    const reversedImg = new Image();
    reversedImg.src = "/assets/tv_reversed.gif";
  }, []);

  /**
   * 1) Always show tv_reversed.gif for 2.5 seconds.
   * 2) After that, if there's NO imageSource prop, start random switching.
   */
  useEffect(() => {
    // Show reversed GIF for 2.5 seconds
    const reversedTimeout = setTimeout(() => {
      setHasPlayedReversed(true);

      // If no image prop is provided, begin random switching
      if (!props?.imageSource) {
        // Pick initial random image
        const initialRandomIndex = Math.floor(Math.random() * images.length);
        setCurrentImageIndex(initialRandomIndex);

        // Start the random image switching interval
        intervalRef.current = setInterval(() => {
          // Trigger static for ~300ms
          setIsStatic(true);
          setTimeout(() => {
            setIsStatic(false);
          }, 300);

          setCurrentImageIndex((prevIndex) => {
            let newIndex = Math.floor(Math.random() * images.length);
            while (images.length > 1 && newIndex === prevIndex) {
              newIndex = Math.floor(Math.random() * images.length);
            }
            return newIndex;
          });
        }, Math.floor(Math.random() * 7000 + 3000)); // between 3–10 seconds
      }
    }, 1700);

    // Cleanup on unmount
    return () => {
      clearTimeout(reversedTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [props]);

  /**
   * Decide which image/gif should be displayed at the moment.
   */
  const displayedImage = !hasPlayedReversed
    ? "/assets/tv_reversed.gif"   // Always start with reversed until 2.5s passes
    : isStatic
    ? "/assets/tv_static.gif"     // Show static if we are in a “static” glitch
    : props?.imageSource || images[currentImageIndex];

  return (
    <div className="tv-container">
      <div className="tv-frame">
        <div className="tv-screen">
          <img
            src={displayedImage}
            alt="TV content"
            className="tv-image"
          />
          {props?.href && (
            <Link href={props.href} className="tv-link">
              {/* The link will wrap the screen area if desired */}
            </Link>
          )}
          {props?.name && (
            <div className="tv-name-overlay">{props.name}</div>
          )}
        </div>
      </div>
      <div className="instrument-panel">
        <div className="dial-container">
          <div className="dial" style={{ '--rotation': `${rotation}deg` } as React.CSSProperties}></div>
        </div>
        <div className="slot-container">
          <div className="slot" />
        </div>
        <div className="vent" />
      </div>
    </div>
  );
};

export default TV;
