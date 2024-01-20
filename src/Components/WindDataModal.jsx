import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function WindDataModal({ isOpen, onClose, onSubmit, onChange, windData }) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography variant="h6" component="h2">
          Agregar Datos de Viento
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="force"
            label="Fuerza"
            name="force"
            autoFocus
            value={windData.force}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="direction"
            label="Dirección"
            type="text"
            id="direction"
            value={windData.direction}
            onChange={onChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
