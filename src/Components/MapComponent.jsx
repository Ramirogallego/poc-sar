import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import GridComponent from './GridComponent';
import './MapComponent.css';
import L from 'leaflet';
import drowningMarker from '../Assets/drowningMarker.png'; // Asegúrate de que esta es la ruta correcta


const MapComponent = ({ markers }) => {
  const [interval, setInterval] = useState(10); // Intervalo inicial
  const [mousePosition, setMousePosition] = useState(null);

  const ZoomHandler = ({ onZoomChange }) => {
    useMapEvents({
      zoomend: (e) => {
        onZoomChange(e.target.getZoom());
      }
    });
    return null;
  };

  const customIcon = L.icon({
    iconUrl: drowningMarker,
    iconSize: [70, 95], // Tamaño del ícono
    iconAnchor: [22, 94], // Punto del ícono que corresponderá a la ubicación del marcador
    popupAnchor: [-3, -76] // Punto desde donde se abrirá el popup en relación al iconAnchor
});

  const MapEventsHandler = ({ setMousePosition }) => {
    useMapEvents({
      mousemove: (e) => {
        setMousePosition(e.latlng);
      }
    });
    return null;
  };

  const updateInterval = (zoomLevel) => {
    if (zoomLevel > 13) {
      setInterval(0.5); // Intervalo muy pequeño para zoom muy cercano
    } else if (zoomLevel > 10) {
      setInterval(1); // Intervalo pequeño para zoom cercano
    } else {
      setInterval(10); // Intervalo grande para zoom lejano
    }
  };

  return (
    <>
      <div id="map-container">
        <MapContainer center={[0, 0]} zoom={2} style={{ height: '900px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <TileLayer
          url="https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors'
        />
          <MapEventsHandler setMousePosition={setMousePosition} />
          <ZoomHandler onZoomChange={updateInterval} />
          <GridComponent interval={interval} />
          {markers.map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.lng] } icon={customIcon}>
          <Popup>
            Lat: {marker.lat}, Lng: {marker.lng}
          </Popup>
        </Marker>
      ))}
        </MapContainer>
      </div>
      {mousePosition && (
        <div className="coordinates-container">
          <p>Latitud: {mousePosition.lat.toFixed(4)}, Longitud: {mousePosition.lng.toFixed(4)}</p>
        </div>
      )}
    </>
  );
};

export default MapComponent;
