import React from 'react';
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  LocationOn,
  EditLocation,
  MyLocation,
} from '@mui/icons-material';
import { useLocation } from '../../contexts/LocationContext';

const LocationDisplay = () => {
  const {
    selectedLocation,
    setIsLocationModalOpen,
    popularLocations,
    selectLocation,
  } = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLocation = () => {
    setIsLocationModalOpen(true);
    handleClose();
  };

  const handleQuickSelect = (location) => {
    selectLocation(location);
    handleClose();
  };

  if (!selectedLocation) {
    return (
      <Chip
        icon={<LocationOn />}
        label="Select Location"
        onClick={handleClick}
        variant="outlined"
        color="primary"
        clickable
      />
    );
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          p: 1,
          borderRadius: 2,
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
        onClick={handleClick}
      >
        <LocationOn sx={{ color: 'primary.main', mr: 1, fontSize: 20 }} />
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
            Deliver to
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1 }}>
            {selectedLocation.name}, {selectedLocation.state}
          </Typography>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { borderRadius: 2, minWidth: 200 }
        }}
      >
        <MenuItem onClick={handleChangeLocation}>
          <ListItemIcon>
            <EditLocation fontSize="small" />
          </ListItemIcon>
          <ListItemText>Change Location</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleQuickSelect(selectedLocation)}>
          <ListItemIcon>
            <MyLocation fontSize="small" />
          </ListItemIcon>
          <ListItemText>Use Current</ListItemText>
        </MenuItem>

        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Quick Select
          </Typography>
          {popularLocations.slice(0, 3).map((location) => (
            <Chip
              key={location.id}
              label={`${location.name}`}
              size="small"
              onClick={() => handleQuickSelect(location)}
              sx={{ m: 0.5 }}
              variant={selectedLocation.id === location.id ? 'filled' : 'outlined'}
              color="primary"
            />
          ))}
        </Box>
      </Menu>
    </>
  );
};

export default LocationDisplay;