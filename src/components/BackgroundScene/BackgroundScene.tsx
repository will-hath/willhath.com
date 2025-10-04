import React from 'react';
import TVGrid from '@/components/TVGrid/TVGrid';
import Bookshelf from '@/components/Bookshelf/Bookshelf';
import './BackgroundScene.css';
import { TVProps } from "@/types/types";
import { quotes } from '@/app/quotes/quotesArray';
import { tidbits } from '@/app/tidbits/tidbitsArray';

const Tidbits: TVProps = {
  textSources: tidbits.map(tidbit => tidbit.text),
  name: "tidbits",
  href: "/tidbits/"
}

const Substack: TVProps = {
  imageSources: ["/assets/substack.png"],
  name: "substack",
  href: "https://willhath.substack.com"
}

const Quotes: TVProps = {
  imageSources: ["/assets/comingsoon.png"],
  textSources: quotes,
  name: "quotes",
  href: "/quotes/"
}

const BackgroundScene = () => {
  const tvContents: (TVProps | null)[] = [
    null, null, Substack, null,
    null, Tidbits, null, Quotes,
    null, null, null, null
  ];

  return (
    <div className="background-scene">
      <div className="grid-container">
        <TVGrid 
          rows={3} 
          columns={4}
          tvContents={tvContents} />
      </div>
      <Bookshelf />
    </div>
  );
};

export default BackgroundScene;
