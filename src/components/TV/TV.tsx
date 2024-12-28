"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import "./TV.css";
import { TVProps } from "@/types/types";
import AntennaBalls from "./AntennaBalls";

// Original arrays, can keep them as is
const photoGallery = Array.from({ length: 31 }, (_, index) => `/assets/gallery/${index}.jpg`);
const turnOnGif = "/assets/tv_turn_on_HD.gif";
const staticGif = "/assets/tv_static.gif";
const testImage = "/assets/gallery/0.jpg";

const TV: React.FC<TVProps | null> = (props) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [currentContent, setCurrentContent] = useState<string>(testImage);
  const [isVisible, setIsVisible] = useState(true);
  const [dialRotation, setDialRotation] = useState(45);

  // Decide which array of 'items' to rotate through
  const images = useMemo(() => {
    return props?.imageSources ?? photoGallery;
  }, [props?.imageSources]);

  const texts = props?.textSources ?? [];

  const hasText = texts.length > 0;
  
  // We unify into one "contents" array
  const contents = hasText ? texts : images;

  // On first load, pick a random item from the appropriate array
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * contents.length);
    setCurrentContent(contents[randomIndex]);
    setDialRotation(Math.floor(Math.random() * 90) - 45);
    console.log("content: ", currentContent);
  }, [contents]);

  // Rotation effect
  useEffect(() => {
    if (!isInitialLoad && contents.length > 1) {
      const interval = setInterval(() => {
        console.log("contenst: ", contents.length);
        console.log("content: ", currentContent);
        setDialRotation(Math.floor(Math.random() * 90) - 45);
        setIsVisible(false);
        setTimeout(() => {
          setCurrentContent((prevContent) => {
            let nextIndex;
            do {
              nextIndex = Math.floor(Math.random() * contents.length);
            } while (
              contents[nextIndex] === prevContent && 
              contents.length > 1
            );
            return contents[nextIndex];
          });
          setIsVisible(true);
        }, 300);
      }, Math.floor(Math.random() * 8000 + 3000));

      return () => clearInterval(interval);
    }
  }, [isInitialLoad, contents]);

  return (
    <>
      <div className={`tv-container ${props?.hasAntennas ? 'has-antennas' : ''}`}>
        {props?.hasAntennas && <AntennaBalls />}
        <div className="tv-frame">
          <div className="tv-screen">
            {/* Turn-on animation (runs once) */}
            <Image
              src={turnOnGif}
              alt="TV turning on"
              className={`tv-image ${!isInitialLoad ? 'hidden' : ''}`}
              fill
              sizes="(max-width: 800px) 100vw, 800px"
              priority={true}
              onLoadingComplete={() => {
                setTimeout(() => {
                  setIsInitialLoad(false);
                }, 1500);
              }}
            />

            {/* Static (shown whenever an image or text is not yet shown) */}
            <Image
              src={staticGif}
              alt="TV static"
              className={`tv-image ${isInitialLoad ? 'hidden' : ''}`}
              fill
              sizes="(max-width: 800px) 100vw, 800px"
              priority={true}
            />

            {/* The actual content, whether text or image */}
            {!hasText ? (
              <Image
                src={currentContent}
                alt="Image on TV"
                className={`tv-image ${isInitialLoad || !isVisible ? 'hidden' : ''}`}
                fill
                sizes="(max-width: 800px) 100vw, 800px"
              />
            ) : (
              <div
                className={`tv-text-content ${isInitialLoad || !isVisible ? 'hidden' : ''}`}
              >
                {currentContent}
              </div>
            )}

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
            <div
              className="dial"
              style={{ "--rotation": `${dialRotation}deg` } as React.CSSProperties}
            />
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
