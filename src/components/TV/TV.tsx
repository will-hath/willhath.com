"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import "./TV.css";
import { TVProps } from "@/types/types";
import AntennaBalls from "./AntennaBalls";
import ReactMarkdown from 'react-markdown';
import { photoGallery } from '@/constants/photoGallery';

// Original arrays, can keep them as is
const turnOnGif = "/assets/tv_turn_on_HD.gif";
const staticGif = "/assets/tv_static.gif";
const testImage = "/assets/gallery/0.jpg";

const TV: React.FC<TVProps | null> = (props) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [currentContent, setCurrentContent] = useState<string>(testImage);
  const [isVisible, setIsVisible] = useState(true);
  const [dialRotation, setDialRotation] = useState(45);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    setCurrentIndex(randomIndex);
    setDialRotation(Math.floor(Math.random() * 90) - 45);
  }, [contents]);

  // Rotation effect
  useEffect(() => {
    if (!isInitialLoad && contents.length > 1) {
      const interval = setInterval(() => {
        setDialRotation(Math.floor(Math.random() * 90) - 45);
        setIsVisible(false);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => {
            let nextIndex;
            do {
              nextIndex = Math.floor(Math.random() * contents.length);
            } while (
              nextIndex === prevIndex && 
              contents.length > 1
            );
            setCurrentContent(contents[nextIndex]);
            return nextIndex;
          });
          setIsVisible(true);
        }, 300);
      }, Math.floor(Math.random() * 8000 + 3000));

      return () => clearInterval(interval);
    }
  }, [isInitialLoad, contents]);

  const handleClick = () => {
    if (hasText && props?.href === "/quotes/") {
      window.location.href = `/quotes/?quote=${currentIndex}`;
    } else if (hasText && props?.href === "/tidbits/") {
      window.location.href = `/tidbits/?tidbit=${currentIndex}`;
    }
  };

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
                <ReactMarkdown components={{
                  p: ({children}) => <span className="tv-text">{children}</span>
                }}>
                  {currentContent}
                </ReactMarkdown>
              </div>
            )}

            <div 
              className="tv-link"
              onClick={handleClick}
              style={{ cursor: 'pointer' }}
            />
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
