// App.js o tu componente principal
import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar'; // Asegúrate de que este es el camino correcto
import MapComponent from './Components/MapComponent';
import IncidentModal from './Components/IncidentModal';
import { fetchVessels } from './Services/VesselService';

const App = () => {
  const [markers, setMarkers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [vessels, setVessels] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchVessels(-35, -55, 10);
        setVessels(data);
      } catch (error) {
        console.error('Error loading vessels:', error);
      }
    };

    loadData();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCreateMarker = () => {
    const newMarker = { lat: parseFloat(lat), lng: parseFloat(lng) };
    setMarkers([...markers, newMarker]);
    handleCloseModal();
  };

  return (
    <div style={{ display: 'flex' }}>
        <Sidebar onOpenModal={() => setModalOpen(true)} />
      <MapComponent markers={markers} vessels={vessels} />
      <IncidentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAccept={handleCreateMarker}
        lat={lat}
        setLat={setLat}
        lng={lng}
        setLng={setLng}
      />
    </div>
  );
};

export default App;
