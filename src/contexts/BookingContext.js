import React, { createContext, useState, useContext } from 'react';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const bookAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now(),
      ...appointmentData,
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
    };
    
    setAppointments(prev => [newAppointment, ...prev]);
    return newAppointment;
  };

  const cancelAppointment = (appointmentId) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === appointmentId
          ? { ...apt, status: 'cancelled' }
          : apt
      )
    );
  };

  const getUpcomingAppointments = () => {
    return appointments.filter(apt => 
      apt.status === 'confirmed' || apt.status === 'pending'
    );
  };

  const openBookingModal = (doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedDoctor(null);
  };

  const value = {
    appointments,
    bookAppointment,
    cancelAppointment,
    getUpcomingAppointments,
    isBookingModalOpen,
    openBookingModal,
    closeBookingModal,
    selectedDoctor,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};