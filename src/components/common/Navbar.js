import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import {
  LocalHospital,
  ExpandMore, // Changed from ChevronDown
  ShoppingCart,
  Person,
  Close,
  LocationOn,
  LocalPharmacy,
  Science,
  Dashboard,
  ExitToApp,
  Settings,
} from '@mui/icons-material';
import { useNavigate, useLocation as useRouterLocation } from 'react-router-dom'; // Renamed to avoid conflict
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useLocation } from '../../contexts/LocationContext'; // This is our custom context
import LocationDisplay from './LocationDisplay';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const navigate = useNavigate();
  const currentPath = useRouterLocation().pathname; // Using the renamed import

  const { user, logout } = useAuth();
  const { getCartItemsCount, setIsCartOpen } = useCart();
  const { selectedLocation } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate('/');
  };

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const navItems = [
    { path: '/doctors', label: 'Doctors', icon: <Person /> },
    { path: '/pharmacy', label: 'Pharmacy', icon: <LocalPharmacy /> },
    { path: '/lab-tests', label: 'Lab Tests', icon: <Science /> },
  ];

  const isActive = (path) => currentPath === path;

  return (
    <>
      <header className={`healthcare-navbar ${scrolled ? 'scrolled' : ''}`}>
        <Container maxWidth="xl" className="navbar-container">
          <div className="navbar-main">
            {/* Logo */}
            <a 
              href="/" 
              className="navbar-brand"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
            >
              <div className="logo-container">
                <LocalHospital className="logo-icon" />
                <div className="logo-pulse" />
              </div>
              <div className="logo-text">
                <span className="logo-primary">LocalHealth</span>
                <span className="logo-subtitle">Healthcare</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="navbar-nav">
              {navItems.map((item) => (
                <div key={item.path} className="nav-item">
                  <a
                    href={item.path}
                    className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.path);
                    }}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {item.label}
                  </a>
                </div>
              ))}
            </nav>

            {/* Location */}
            <div className="navbar-location">
              <LocationDisplay />
            </div>

            {/* User Actions */}
            <div className="navbar-actions">
              {/* Cart Button */}
              <button
                className="action-button cart-button"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart />
                {getCartItemsCount() > 0 && (
                  <span className="cart-badge">
                    {getCartItemsCount()}
                  </span>
                )}
              </button>

              {/* User Profile or Auth Buttons */}
              {user ? (
                <>
                  <button
                    className="user-profile"
                    onClick={handleUserMenuOpen}
                  >
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      className="user-avatar"
                    />
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <span className="user-role">Patient</span>
                    </div>
                    <ExpandMore className="chevron-icon" /> {/* Fixed icon */}
                  </button>

                  <Menu
                    anchorEl={userMenuAnchor}
                    open={Boolean(userMenuAnchor)}
                    onClose={handleUserMenuClose}
                    className="user-menu"
                    PaperProps={{
                      style: {
                        marginTop: '8px',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e2e8f0',
                      },
                    }}
                  >
                    <MenuItem onClick={() => { navigate('/dashboard'); handleUserMenuClose(); }}>
                      <ListItemIcon>
                        <Dashboard fontSize="small" />
                      </ListItemIcon>
                      Dashboard
                    </MenuItem>
                    <MenuItem onClick={handleUserMenuClose}>
                      <ListItemIcon>
                        <Person fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleUserMenuClose}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <ExitToApp fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <div className="auth-buttons">
                  <button
                    className="login-button"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </button>
                  <button
                    className="signup-button"
                    onClick={() => navigate('/signup')}
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className={`mobile-menu-button ${mobileOpen ? 'active' : ''}`}
                onClick={handleMobileToggle}
              >
                <span className="menu-line"></span>
                <span className="menu-line"></span>
                <span className="menu-line"></span>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer */}
      <div 
        className={`drawer-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={handleMobileToggle}
      />
      
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="navbar-brand">
            <div className="logo-container">
              <LocalHospital className="logo-icon" />
            </div>
            <div className="logo-text">
              <span className="logo-primary">LocalHealth</span>
              <span className="logo-subtitle">Healthcare</span>
            </div>
          </div>
          <button className="drawer-close" onClick={handleMobileToggle}>
            <Close />
          </button>
        </div>

        <div className="drawer-content">
          {/* Location in Drawer */}
          <div className="drawer-location">
            <LocationDisplay />
          </div>

          {/* Navigation in Drawer */}
          <nav className="drawer-nav">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`drawer-nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.path);
                }}
              >
                <span className="drawer-nav-icon">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>

          {/* User Section in Drawer */}
          <div className="drawer-actions">
            {user ? (
              <>
                <a
                  href="/dashboard"
                  className="drawer-nav-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('/dashboard');
                  }}
                >
                  <span className="drawer-nav-icon">
                    <Dashboard />
                  </span>
                  Dashboard
                </a>
                <button
                  className="drawer-nav-item"
                  onClick={handleLogout}
                  style={{ background: 'none', border: 'none', textAlign: 'left' }}
                >
                  <span className="drawer-nav-icon">
                    <ExitToApp />
                  </span>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="login-button"
                  onClick={() => handleNavClick('/login')}
                  style={{ width: '100%' }}
                >
                  Login
                </button>
                <button
                  className="signup-button"
                  onClick={() => handleNavClick('/signup')}
                  style={{ width: '100%' }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;