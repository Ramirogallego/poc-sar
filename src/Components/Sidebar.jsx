import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const drawerWidth = 240; // Puedes ajustar el ancho del menú lateral

const Sidebar = ({ onOpenModal }) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem>
          <Button onClick={onOpenModal} variant="contained" color="primary" fullWidth>
            Crear incidente
          </Button>
        </ListItem>
        <ListItem>
          <Button variant="outlined" color="primary" fullWidth startIcon={<AddIcon />}>
            Medio de búsqueda
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
