"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import "./TV.css";
import { TVProps } from "@/types/types";
import AntennaBalls from "./AntennaBalls";

// Create array of 31 images in /assets/gallery/0.jpg to /assets/gallery/30.jpg
const photoGallery = Array.from({ length: 31 }, (_, index) => `/assets/gallery/${index}.jpg`);
const turnOnGif = "/assets/tv_turn_on_HD.gif";
const staticGif = "/assets/tv_static.gif";
const testImage = "/assets/gallery/0.jpg";

const TV: React.FC<TVProps | null> = (props) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [currentImage, setCurrentImage] = useState<string>(testImage);
  const [isVisible, setIsVisible] = useState(true);
  const [dialRotation, setDialRotation] = useState(45);

  const images = useMemo(() => {
    return !props?.imageSources ? photoGallery : props.imageSources;
  }, [props?.imageSources]);

  // Set initial random image
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImage(images[randomIndex]);
    setDialRotation(Math.floor(Math.random() * 90) - 45);
  }, [images]);

  useEffect(() => {
    if (!isInitialLoad && images.length > 1) {
      const interval = setInterval(() => {
        setDialRotation(Math.floor(Math.random() * 90) - 45);
        setIsVisible(false);
        setTimeout(() => {
            setCurrentImage((prevImage) => {
              // Get random index that's different from current
              let nextIndex;
              do {
                nextIndex = Math.floor(Math.random() * images.length);
              } while (nextIndex === images.indexOf(prevImage) && images.length > 1);
              return images[nextIndex];
            });
            setIsVisible(true);
          }, 300);
      
      }, Math.floor(Math.random() * 8000 + 3000)); 
      return () => clearInterval(interval);
    }
  }, [isInitialLoad, images]);

  return (
    <>
      <div className={`tv-container ${props?.hasAntennas ? 'has-antennas' : ''}`}>
        {props?.hasAntennas && <AntennaBalls />}
        <div className="tv-frame">
          <div className="tv-screen">
          <Image
            src={turnOnGif}
            alt="TV turning on"
            className={`tv-image ${!isInitialLoad ? 'hidden' : ''}`}
            fill
            sizes="(max-width: 800px) 100vw, 800px"
            priority={true}
            onLoadingComplete={() => {
              setIsInitialLoad(false);
            }}
          />
          
          {/* Static image - will start loading immediately */}
          <Image
            src={ staticGif }
            alt="TV static"
            className={`tv-image ${isInitialLoad ? 'hidden' : ''}`}
            fill
            sizes="(max-width: 800px) 100vw, 800px"
            priority={true}
          />
          <Image
            src={currentImage}
            alt="Image on TV"
            className={`tv-image ${isInitialLoad || !isVisible ? 'hidden' : ''}`}
            fill
            sizes="(max-width: 800px) 100vw, 800px"
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
            <div className="dial" style={{ '--rotation': `${dialRotation}deg` } as React.CSSProperties} />
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