import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, useMap, ScaleControl  } from 'react-leaflet';
import GridComponent from './GridComponent';
import './MapComponent.css';
import L from 'leaflet';
import drowningMarker from '../Assets/drowningMarker.png'; 
import boatIconUrl from '../Assets/ship.png'; 
import WindDataModal from './WindDataModal';
import AutoGraticule from "leaflet-auto-graticule";

const MapComponent = ({ markers, vessels }) => {
  const [interval, setInterval] = useState(10); // Intervalo inicial
  const [mousePosition, setMousePosition] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [windData, setWindData] = useState({ force: '', direction: '' });
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef(null);

const handleMarkerClick = (marker) => {
  setSelectedMarker(marker);
  setIsModalOpen(true);
};

  const handleWindDataChange = (e) => {
    setWindData({ ...windData, [e.target.name]: e.target.value });
  };
  
  const ZoomHandler = ({ onZoomChange }) => {
    useMapEvents({
      zoomend: (e) => {
        onZoomChange(e.target.getZoom());
      }
    });
    return null;
  };

  const handleSubmit = () => {
    // ... tu código existente para manejar los datos del viento
    if (!selectedMarker || !mapRef.current) return; 

  const markerPosition = [selectedMarker.lat, selectedMarker.lng];
    // Suponiendo que tienes la posición del marcador actual
    // Calcular la posición final de la flecha
    const arrowEndPoint = calculateArrowEndPoint(selectedMarker.lat, selectedMarker.lng, windData.direction, windData.force);
  
    // Dibujar la flecha en el mapa
    drawArrow(mapRef.current, markerPosition, arrowEndPoint); // Asegúrate de tener una referencia al objeto mapa de Leaflet
  
    setIsModalOpen(false); // Cierra el modal después de enviar
  };

  const customIcon = L.icon({
    iconUrl: drowningMarker,
    iconSize: [70, 95], // Tamaño del ícono
    iconAnchor: [22, 94], // Punto del ícono que corresponderá a la ubicación del marcador
    popupAnchor: [-3, -76] // Punto desde donde se abrirá el popup en relación al iconAnchor
});

const boatIcon = L.icon({
  iconUrl: boatIconUrl,
  iconSize: [20, 20], 
  iconAnchor: [25, 50], 
  popupAnchor: [0, -50] 
});

const drawArrow = (map, startPoint, endPoint) => {
  // Crear un objeto Polyline para la flecha
  debugger
  const arrow = L.polyline([startPoint, endPoint], {
    color: 'red', // Elige el color que prefieras
    weight: 3,
    opacity: 0.5,
    smoothFactor: 1
  });

  arrow.addTo(map); // Agregar la flecha al mapa

  // Opcionalmente, podrías agregar una marca al final para representar la punta de la flecha
};

const MapEventsHandler = ({ setMousePosition }) => {
  const map = useMap();

  useEffect(() => {
    mapRef.current = map;
  }, [map]);

  useMapEvents({
    mousemove: (e) => {
      setMousePosition(e.latlng);
    },
    zoomend: () => {
      updateInterval(map.getZoom());
    }
  });

  return null;
};

  const calculateArrowEndPoint = (lat, lng, direction, length) => {
    // Convertir la dirección a radianes
    const directionRadians = (direction - 90) * (Math.PI / 180);
  
    // Calcular la nueva posición
    const earthRadiusKm = 6371;
    const distanceKm = length / 1000; // Convertir longitud a kilómetros
  
    const newLat = Math.asin(Math.sin(lat * Math.PI / 180) * Math.cos(distanceKm / earthRadiusKm) +
                  Math.cos(lat * Math.PI / 180) * Math.sin(distanceKm / earthRadiusKm) * Math.cos(directionRadians));
    const newLng = lng * Math.PI / 180 + Math.atan2(Math.sin(directionRadians) * Math.sin(distanceKm / earthRadiusKm) * Math.cos(lat * Math.PI / 180),
                  Math.cos(distanceKm / earthRadiusKm) - Math.sin(lat * Math.PI / 180) * Math.sin(newLat));
  
    return [newLat * 180 / Math.PI, newLng * 180 / Math.PI];
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
        <MapContainer center={[0, 0]} zoom={2} style={{ height: '900px' }} >
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <TileLayer
          url="https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors'
        />
        <ScaleControl position="bottomleft" maxWidth={100} metric={true} imperial={true}/>
          <MapEventsHandler setMousePosition={setMousePosition} />
          <ZoomHandler onZoomChange={updateInterval} />
          {markers.map((marker, index) => (
  <Marker key={index} position={[marker.lat, marker.lng]} icon={customIcon}>
    <Popup>
      Lat: {marker.lat}, Lng: {marker.lng} <br />
      <button onClick={() => handleMarkerClick(marker)}>Agregar Datos de Viento</button>
    </Popup>
  </Marker>
))}

<WindDataModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSubmit={handleSubmit}
  onChange={handleWindDataChange}
  windData={windData}
/>
           {vessels.map((vessel, index) => (
            <Marker key={`vessel-${index}`} position={[vessel.latitude, vessel.longitude]} icon={boatIcon}>
              <Popup>
                Name: {vessel.name} <br />
                MMSI: {vessel.mmsi} <br />
                Señal de llamada: {vessel.callSign} <br />
                Aproamiento: {vessel.heading} <br />
                COG: {vessel.COG} <br />
                SOG: {vessel.SOG} <br />
                Lat: {vessel.latitude}, Lng: {vessel.longitude}
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
