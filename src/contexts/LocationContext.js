import React, { createContext, useState, useContext } from 'react';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const popularLocations = [
    { id: 1, name: 'New Delhi', state: 'Delhi', pincode: '110001' },
    { id: 2, name: 'Mumbai', state: 'Maharashtra', pincode: '400001' },
    { id: 3, name: 'Bangalore', state: 'Karnataka', pincode: '560001' },
    { id: 4, name: 'Chennai', state: 'Tamil Nadu', pincode: '600001' },
    { id: 5, name: 'Kolkata', state: 'West Bengal', pincode: '700001' },
    { id: 6, name: 'Hyderabad', state: 'Telangana', pincode: '500001' },
  ];

  const selectLocation = (location) => {
    setSelectedLocation(location);
    setIsLocationModalOpen(false);
    // Save to localStorage for persistence
    localStorage.setItem('localHealthLocation', JSON.stringify(location));
  };

  const detectLocation = () => {
    // Simulate location detection
    const detectedLocation = popularLocations[0]; // Default to first location
    setSelectedLocation(detectedLocation);
    localStorage.setItem('localHealthLocation', JSON.stringify(detectedLocation));
    setIsLocationModalOpen(false);
  };

  // Load location from localStorage on initial render
  React.useEffect(() => {
    const savedLocation = localStorage.getItem('localHealthLocation');
    if (savedLocation) {
      setSelectedLocation(JSON.parse(savedLocation));
    } else {
      setIsLocationModalOpen(true); // Show modal if no location is set
    }
  }, []);

  const value = {
    selectedLocation,
    selectLocation,
    detectLocation,
    isLocationModalOpen,
    setIsLocationModalOpen,
    popularLocations,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};