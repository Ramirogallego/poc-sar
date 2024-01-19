// IncidentModal.js
import React from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

const IncidentModal = ({ open, onClose, onAccept, lat, setLat, lng, setLng }) => {
  // Manejador para el botón Aceptar
  const handleAccept = () => {
    onAccept();
    onClose(); // Cerrar el modal después de aceptar
  };

  // Estilos para el modal
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="incident-modal-title"
      aria-describedby="incident-modal-description"
    >
      <Box sx={style}>
        <Typography id="incident-modal-title" variant="h6" component="h2" marginBottom={2}>
          Crear Incidente
        </Typography>
        <TextField
          label="Latitud"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Longitud"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          margin="normal"
          fullWidth
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleAccept}>
            Aceptar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default IncidentModal;
