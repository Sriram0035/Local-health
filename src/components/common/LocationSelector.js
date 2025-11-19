import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Box,
  Typography,
  IconButton,
  Divider,
  Chip,
} from '@mui/material';
import {
  Close,
  LocationOn,
  MyLocation,
  Search,
} from '@mui/icons-material';
import { useLocation } from '../../contexts/LocationContext';

const LocationSelector = () => {
  const {
    selectLocation,
    detectLocation,
    isLocationModalOpen,
    setIsLocationModalOpen,
    popularLocations,
  } = useLocation();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = popularLocations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.pincode.includes(searchTerm)
  );

  const handleClose = () => {
    setIsLocationModalOpen(false);
  };

  const handleLocationSelect = (location) => {
    selectLocation(location);
  };

  return (
    <Dialog
      open={isLocationModalOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 }
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Select Your Location
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Current Location Button */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<MyLocation />}
          onClick={detectLocation}
          sx={{
            mb: 3,
            py: 1.5,
            borderRadius: 2,
            borderColor: 'primary.main',
            color: 'primary.main',
          }}
        >
          Use Current Location
        </Button>

        <Divider sx={{ mb: 3 }}>
          <Chip label="OR" size="small" />
        </Divider>

        {/* Search Box */}
        <TextField
          fullWidth
          placeholder="Search for your city, state, or pincode"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
          }}
          sx={{ mb: 3 }}
        />

        {/* Popular Locations List */}
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          Popular Cities
        </Typography>
        
        <List sx={{ maxHeight: 300, overflow: 'auto' }}>
          {filteredLocations.map((location) => (
            <ListItem
              key={location.id}
              button
              onClick={() => handleLocationSelect(location)}
              sx={{
                borderRadius: 2,
                mb: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemIcon>
                <LocationOn color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={location.name}
                secondary={`${location.state} - ${location.pincode}`}
              />
            </ListItem>
          ))}
        </List>

        {filteredLocations.length === 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ py: 4 }}
          >
            No locations found. Try a different search term.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LocationSelector;