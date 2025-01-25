"use client";
import Image from "next/image";
import React, { useState } from "react";
import "./gallery.css";
import { photoGallery } from "@/constants/photoGallery";

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? photoGallery.length - 1 : (prevIndex as number) - 1
      );
    }
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prevIndex) =>
        prevIndex === photoGallery.length - 1 ? 0 : (prevIndex as number) + 1
      );
    }
  };

  return (
    <main className="gallery-container">
      <h1>Gallery</h1>
      <div className="gallery-grid">
        {photoGallery.map((src, i) => (
          <div key={i} className="gallery-item">
            <Image
              src={src}
              alt={`Gallery item ${i}`}
              // width/height can be fixed or dynamic
              width={400}
              height={400}
              // Mark the first few images as priority
              priority={i < 3}
              // In Next.js, "loading" is typically determined automatically
              // but you can still explicitly set it if needed:
              loading={i < 3 ? "eager" : "lazy"}
              onClick={() => openModal(i)}
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="gallery-modal" onClick={closeModal}>
          <button className="nav-button prev-button" onClick={showPrev}>
            &larr;
          </button>
          <Image
            className="modal-image"
            src={photoGallery[selectedIndex]}
            alt={`Modal item ${selectedIndex}`}
            width={800}
            height={600}
          />
          <button className="nav-button next-button" onClick={showNext}>
            &rarr;
          </button>
        </div>
      )}
    </main>
  );
}
