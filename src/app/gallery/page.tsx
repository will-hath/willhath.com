"use client";
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
    // prevent the click from also triggering closeModal
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
            <img
              src={src}
              alt={`Gallery item ${i}`}
              onClick={() => openModal(i)}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedIndex !== null && (
        <div className="gallery-modal" onClick={closeModal}>
          <button className="nav-button prev-button" onClick={showPrev}>
            &larr;
          </button>
          <img
            className="modal-image"
            src={photoGallery[selectedIndex]}
            alt={`Modal item ${selectedIndex}`}
          />
          <button className="nav-button next-button" onClick={showNext}>
            &rarr;
          </button>
        </div>
      )}
    </main>
  );
}
