import React from 'react';
import './TV.css';

/**
 * A simple component rendering two antennas, each with a small
 * ball at the end. We'll style them in TV.css.
 */
const AntennaBalls: React.FC = () => {
  return (
    <>
      {/* Left Antenna Div */}
      <div className="antenna-line left-antenna">
        <div className="antenna-ball" />
      </div>

      {/* Right Antenna Div */}
      <div className="antenna-line right-antenna">
        <div className="antenna-ball" />
      </div>
    </>
  );
};

export default AntennaBalls;