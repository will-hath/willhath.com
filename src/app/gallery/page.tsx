"use client";
import React from "react";
import "./gallery.css";
import { photoGallery } from "../page";
export default function GalleryPage() {
  // Create an array of image paths

  return (
    <main className="gallery-container">
      <h1>Gallery</h1>
      <div className="gallery-grid">
        {photoGallery.map((src, i) => (
          <div key={i} className="gallery-item">
            <img src={src} alt={`Gallery item ${i}`} />
          </div>
        ))}
      </div>
    </main>
  );
}
