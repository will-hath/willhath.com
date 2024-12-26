"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import "./TV.css";
import { TVProps } from "@/types/types";
import AntennaBalls from "./AntennaBalls";

// Create array of 31 images in /assets/gallery/0.jpg to /assets/gallery/30.jpg
const galleryImages = Array.from({ length: 31 }, (_, index) => `/assets/gallery/${index}.jpg`);

const TV: React.FC<TVProps | null> = (props) => {
  // Has the reversed gif played already?
  const [hasPlayedReversed, setHasPlayedReversed] = useState(false);

  // Current random image index (if not using props.imageSource)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Whether we're in the middle of showing "tv_static.gif" due to “glitch” intervals
  const [isStatic, setIsStatic] = useState<boolean>(false);

  // Whether the final image (designated or random) has finished loading
  const [isMainImageLoaded, setIsMainImageLoaded] = useState<boolean>(false);

  // A reference to our interval for random switching
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Helper sources
  const staticGif = "/assets/new_static.gif";
  const reversedGif = "/assets/tv_reversed.gif";

  // We’ll store the main (designated or random) image path here
  const finalImage = props?.imageSource || galleryImages[currentImageIndex];

  /**
   * Preload all relevant images and GIFs — including gallery images.
   * This approach uses <Head> to insert <link rel="preload"> for each image.
   * You could also do this differently if you prefer.
   */
  useEffect(() => {
    // Preload all gallery images
    // (For large images, you might not want to eagerly load every single one; this is just an example.)
    galleryImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });

    // Preload tv_static.gif and tv_reversed.gif
    [staticGif, reversedGif].forEach((gif) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = gif;
      document.head.appendChild(link);
    });
  }, []);

  /**
   * 1) Show tv_reversed.gif for 1.7 seconds to block initial rendering of final image.
   * 2) If there's NO imageSource prop, begin random switching once reversed is done.
   */
  useEffect(() => {
    const reversedTimeout = setTimeout(() => {
      setHasPlayedReversed(true);

      // If no prop is provided, begin random switching
      if (!props?.imageSource) {
        // Pick initial random image
        const initialRandomIndex = Math.floor(Math.random() * galleryImages.length);
        setCurrentImageIndex(initialRandomIndex);
        // We want to show static until the random image is loaded
        setIsMainImageLoaded(false);

        // Start random switching
        intervalRef.current = setInterval(() => {
          setIsStatic(true);
          setTimeout(() => {
            setIsStatic(false);
          }, 300);

          setIsMainImageLoaded(false); // We'll wait again for the newly chosen image to load
          setCurrentImageIndex((previousIndex) => {
            let newIndex = Math.floor(Math.random() * galleryImages.length);
            while (galleryImages.length > 1 && newIndex === previousIndex) {
              newIndex = Math.floor(Math.random() * galleryImages.length);
            }
            return newIndex;
          });
        }, Math.floor(Math.random() * 7000 + 3000)); // between 3–10 seconds
      } else {
        // If we do have a designated image, set up the load state for it.
        setIsMainImageLoaded(false);
      }
    }, 1700);

    return () => {
      clearTimeout(reversedTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [props]);

  /**
   * Decide which image/gif to display:
   * 1) If tv_reversed.gif is still playing, show that.
   * 2) Else if isStatic is true (our random glitch timing), or the designated/random image is not yet loaded, show tv_static.gif.
   * 3) Otherwise show the designated or random image.
   */
  const displayedImage = !hasPlayedReversed
    ? reversedGif
    : isStatic || !isMainImageLoaded
    ? staticGif
    : finalImage;

  return (
    <>
      {/* Preload tags inserted here via useEffect, but you could also place them directly in Head if desired */}
      <Head>
        <title>TV Component</title>
      </Head>
      <div className={`tv-container ${props?.hasAntennas ? 'has-antennas' : ''}`}>
        {props?.hasAntennas && <AntennaBalls />}
        <div className="tv-frame">
          <div className="tv-screen">
            <Image
              src={displayedImage}
              alt="TV content"
              className="tv-image"
              fill
              sizes="(max-width: 800px) 100vw, 800px"
              onLoadingComplete={() => {
                // Once the image fully loads, we mark it as loaded
                setIsMainImageLoaded(true);
              }}
            />
            {props?.href && (
              <Link href={props.href} className="tv-link">
                {/* The link will wrap the screen area if desired */}
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
};

export default TV;
