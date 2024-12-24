import React from 'react';
import TVGrid from './components/TVGrid/TVGrid';
import manFromBehind from './assets/man_from_behind.png';
import './App.css';

import metalTile from './assets/metal_tile.jpg';

const App: React.FC = () => {
  const tvContents: (string | null)[] = [
    null, null, null, null, null, null, null,
    null, null, null, metalTile, null, null, null,
    null, null, null, null, null, null, null
  ];
  
  return (
    <div className="App">
      <div className="content-wrapper">
        <div className="grid-container">
          <TVGrid 
            rows={3} 
            columns={7}
            tvContents={tvContents} />
        </div>
        <div className="viewer-container">
          <img src={manFromBehind} alt="Viewer" className="viewer-image" />
        </div>
      </div>
    </div>
  );
};

export default App;