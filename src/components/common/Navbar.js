import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  Menu,
  MenuItem,
  Avatar,
  Chip,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  LocalHospital,
  ShoppingCart,
  AccountCircle,
  Dashboard,
  ExitToApp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from '../../contexts/LocationContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import LocationDisplay from './LocationDisplay';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const navigate = useNavigate();
  const { selectedLocation } = useLocation();
  const { user, logout, setIsLoginModalOpen, setIsSignupModalOpen } = useAuth();
  const { getCartItemsCount, setIsCartOpen } = useCart();

  const menuItems = [
    { text: 'Doctors', path: '/doctors' },
    { text: 'Pharmacy', path: '/pharmacy' },
    { text: 'Lab Tests', path: '/lab-tests' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogin = () => {
    setIsLoginModalOpen(true);
  };

  const handleSignup = () => {
    setIsSignupModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate('/');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
    handleUserMenuClose();
  };

  return (
    <>
      <AppBar position="sticky" className="navbar">
        <Container maxWidth="xl" className="navbar-container">
          <Toolbar className="navbar-toolbar">
            {/* Logo */}
            <Box className="navbar-logo" onClick={() => navigate('/')}>
              <LocalHospital className="navbar-logo-icon" />
              <Typography variant="h6" className="navbar-logo-text">
                Local Health
              </Typography>
            </Box>

            {/* Location Display - Desktop */}
            <Box className="navbar-location mobile-hidden">
              <LocationDisplay />
            </Box>

            {/* Desktop Menu */}
            <Box className="navbar-menu mobile-hidden">
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  className="navbar-menu-button"
                  onClick={() => navigate(item.path)}
                >
                  {item.text}
                </Button>
              ))}
              
              {user ? (
                <>
                  <Chip
                    avatar={<Avatar src={user.avatar} alt={user.name} />}
                    label={user.name}
                    onClick={handleUserMenuOpen}
                    className="navbar-user-chip"
                  />
                  <IconButton 
                    className="navbar-cart-icon"
                    onClick={() => setIsCartOpen(true)}
                  >
                    <Badge badgeContent={getCartItemsCount()} color="secondary">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                  <Menu
                    anchorEl={userMenuAnchor}
                    open={Boolean(userMenuAnchor)}
                    onClose={handleUserMenuClose}
                    className="navbar-user-menu"
                  >
                    <MenuItem onClick={handleDashboard}>
                      <Dashboard sx={{ mr: 1 }} />
                      Dashboard
                    </MenuItem>
                    <MenuItem onClick={handleUserMenuClose}>
                      <AccountCircle sx={{ mr: 1 }} />
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ExitToApp sx={{ mr: 1 }} />
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    onClick={handleLogin}
                    className="btn btn-outline"
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSignup}
                    className="btn btn-primary"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className="navbar-mobile-button"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>

          {/* Location Display - Mobile */}
          <Box className="navbar-mobile-location tablet-hidden">
            <LocationDisplay />
          </Box>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        className="navbar-drawer"
      >
        <List className="navbar-drawer-list">
          {/* Location in Mobile Drawer */}
          <ListItem>
            <LocationDisplay />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={`Current: ${selectedLocation ? `${selectedLocation.name}, ${selectedLocation.state}` : 'Not set'}`}
            />
          </ListItem>
          
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                navigate(item.path);
                handleDrawerToggle();
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          
          {user ? (
            <>
              <ListItem button onClick={handleDashboard}>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button onClick={() => setIsCartOpen(true)}>
                <ListItemText 
                  primary={`Cart (${getCartItemsCount()})`} 
                />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button onClick={handleLogin}>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button onClick={handleSignup}>
                <ListItemText primary="Sign Up" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;