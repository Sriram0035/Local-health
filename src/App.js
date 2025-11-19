import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Import CSS files
import './styles/global.css';
import './styles/Navbar.css';
import './styles/Footer.css';
import './styles/Home.css';
import './styles/Doctors.css';
import './styles/Pharmacy.css';
import './styles/LabTests.css';
import './styles/Dashboard.css';
import './styles/Checkout.css';
import './styles/Auth.css';
import './styles/Location.css';
import './styles/Cart.css';
import './styles/Booking.css';
import './styles/Chat.css';
import './styles/HealthRecords.css';

// Context
import { LocationProvider } from './contexts/LocationContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { BookingProvider } from './contexts/BookingContext';
import { ChatProvider } from './contexts/ChatContext';
import { HealthRecordsProvider } from './contexts/HealthRecordsContext';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LocationSelector from './components/common/LocationSelector';
import LoginModal from './components/auth/LoginModal';
import SignupModal from './components/auth/SignupModal';
import CartDrawer from './components/cart/CartDrawer';
import DoctorBookingModal from './components/booking/DoctorBookingModal';
import ChatWidget from './components/chat/ChatWidget';
import HealthRecordsManager from './components/health/HealthRecordsManager';

// Pages
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Pharmacy from './pages/Pharmacy';
import LabTests from './pages/LabTests';
import Dashboard from './pages/Dashboard';
import Checkout from './pages/Checkout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#FF7043',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <LocationProvider>
          <AuthProvider>
            <CartProvider>
              <BookingProvider>
                <ChatProvider>
                  <HealthRecordsProvider>
                    <Router>
                      <div className="App">
                        <Navbar />
                        <main>
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/doctors" element={<Doctors />} />
                            <Route path="/pharmacy" element={<Pharmacy />} />
                            <Route path="/lab-tests" element={<LabTests />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/checkout" element={<Checkout />} />
                          </Routes>
                        </main>
                        <Footer />
                        <LocationSelector />
                        <LoginModal />
                        <SignupModal />
                        <CartDrawer />
                        <DoctorBookingModal />
                        <ChatWidget />
                        <HealthRecordsManager />
                      </div>
                    </Router>
                  </HealthRecordsProvider>
                </ChatProvider>
              </BookingProvider>
            </CartProvider>
          </AuthProvider>
        </LocationProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;