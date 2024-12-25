 "use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './TV.css';
import { TVProps } from '@/types/types';

const images = Array.from({ length: 31 }, (_, index) => {
  return `/assets/gallery/${index}.jpg`;
});

const TV: React.FC<TVProps | null> = (props) => {
  // Start with a stable initial image index, say 0
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(-1);
  const [isStatic, setIsStatic] = useState<boolean>(false);


  useEffect(() => {
    // Only do this if no props.imageSource was given, meaning we rely on randomness
    if (!props?.imageSource) {
      // Pick a random index after client hydration
      const initialRandomIndex = Math.floor(Math.random() * images.length);
      setCurrentImageIndex(initialRandomIndex);

      // Set up the interval for changing images randomly after the initial pick
      const interval = setInterval(() => {
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
      }, Math.floor(Math.random() * 7000 + 3000));

      return () => clearInterval(interval);
    }
  }, [props, images.length]);


  const displayedImage = isStatic 
    ? '/assets/tv_static.gif'
    // : currentImageIndex === -1 ? 'assets/tv_reversed.gif'
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
              <Link href={props.href} className='tv-link'>
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
            <div className="dial"></div>
          </div>
          <div className="slot-container">
            <div className="slot"></div>
          </div>
          <div className="vent"></div>
        </div>
      </div>
    );
  };
  
  export default TV;
  