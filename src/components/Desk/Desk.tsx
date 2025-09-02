import React from 'react';
import './Desk.css'

const Desk = () => {
    return (
      <div className="desk-scene">
        <div className="bookshelf">
          <div className="bookshelf-back"></div>
          <div className="bookshelf-front"></div>
        </div>
        <div className="desk">
          <div className="desk-front"></div>
          <div className="desk-top"></div>
        </div>
      </div>
    )
};

export default Desk;