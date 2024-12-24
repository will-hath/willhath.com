import React from 'react';
import TV from '../TV/TV';
import './TVGrid.css';
import { TVGridProps, TVProps } from '../../types/types';

const TVGrid: React.FC<TVGridProps> = ({ 
  rows, 
  columns, 
  tvContents
}) => {
  const tvs = Array.from({ length: rows * columns }, (_, index) => (
    <div key={index} className="grid-item">
      <TV {...tvContents[index] as TVProps} />
    </div>
  ));

  return ( 
    <div className="tv-grid-wrapper">
      <div 
        className="tv-grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, auto)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`
        }}
      >
        {tvs}
      </div>
    </div>
  );
};

export default TVGrid;