import React from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Box,
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
      <button className="location-trigger" onClick={handleClick}>
        <LocationOn className="location-icon" />
        <div className="location-info">
          <span className="location-label">Location</span>
          <span className="location-value">Select Location</span>
        </div>
      </button>
    );
  }

  return (
    <>
      <button className="location-trigger" onClick={handleClick}>
        <LocationOn className="location-icon" />
        <div className="location-info">
          <span className="location-label">Your Location</span>
          <span className="location-value">
            {selectedLocation.name}, {selectedLocation.state}
          </span>
        </div>
      </button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="location-menu"
        PaperProps={{
          style: {
            marginTop: '8px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
            minWidth: '200px',
          },
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
          <div className="location-quick-title">Quick Select</div>
          <div className="location-quick-chips">
            {popularLocations.slice(0, 3).map((location) => (
              <Chip
                key={location.id}
                label={location.name}
                size="small"
                onClick={() => handleQuickSelect(location)}
                style={{ margin: '2px' }}
                variant={selectedLocation.id === location.id ? 'filled' : 'outlined'}
                color="primary"
              />
            ))}
          </div>
        </Box>
      </Menu>
    </>
  );
};

export default LocationDisplay;