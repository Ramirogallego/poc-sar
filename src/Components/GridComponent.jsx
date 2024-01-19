import React, { useState, useEffect } from 'react';
import { useMap, Polyline } from 'react-leaflet';

const GridComponent = ({ interval }) => {
    const map = useMap();
    const [lines, setLines] = useState([]);
  
    useEffect(() => {
      const bounds = map.getBounds();
      const latLines = [];
      const lngLines = [];
  
      for (let lat = Math.ceil(bounds.getSouth()); lat <= Math.floor(bounds.getNorth()); lat += interval) {
        latLines.push([[lat, bounds.getWest()], [lat, bounds.getEast()]]);
      }
  
      for (let lng = Math.ceil(bounds.getWest()); lng <= Math.floor(bounds.getEast()); lng += interval) {
        lngLines.push([[bounds.getSouth(), lng], [bounds.getNorth(), lng]]);
      }
  
      setLines([...latLines, ...lngLines]);
    }, [map, interval]);
  
    return (
      <>
        {lines.map((line, index) => (
          <Polyline key={index} positions={line} color="blue" />
        ))}
      </>
    );
  };

export default GridComponent;