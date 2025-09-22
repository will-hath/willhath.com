import React from 'react';
import Desk from '@/components/Desk/Desk';
import Bookshelf from '@/components/Bookshelf/Bookshelf';
import TV from '@/components/TV/TV';
import Image from 'next/image';
import './ForegroundScene.css';
import { TVProps } from "@/types/types";


const LeftGroundTV: TVProps = {
  imageSources: ["/assets/spruce.gif"],
  name: "Spruce",
  href: "https://spruce.world/",
  hasAntennas: true
}

const RightGroundTV: TVProps = {
  imageSources: ["/assets/atticus.gif"],
  name: "Atticus",
  href: "https://chry-santhemum.github.io/website/",
  hasAntennas: true
}

const ForegroundScene = () => {
  return (
    <div className="foreground-scene">
          <Desk></Desk>
          <Bookshelf></Bookshelf>
          <div className="ground-tvs">
            <div className="ground-tv">
              <TV {...LeftGroundTV} />
            </div>
            <div className="ground-tv">
              <TV {...RightGroundTV} />
            </div>
          </div>
          <Image 
            src="/assets/man_from_behind.png"
            alt="Viewer"
            className="viewer-image"
            width={500}
            height={800}
            priority
          />
            <div className="nameplate-container">
              <a href="/about/">
                <Image
                  src="/assets/nameplate.png"
                  alt="Nameplate"
                  className="nameplate"
                  width={300}
                  height={60}
                  priority
                />
              </a>
            </div>

        </div>
  );
};

export default ForegroundScene;
