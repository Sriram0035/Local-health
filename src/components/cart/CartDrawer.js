import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Button,
  Divider,
  TextField,
  Badge,
  Chip,
} from '@mui/material';
import {
  Close,
  Add,
  Remove,
  Delete,
  ShoppingCartCheckout,
} from '@mui/icons-material';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();
  
  const { user, setIsLoginModalOpen } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      setIsCartOpen(false);
      return;
    }
    
    // Navigate to checkout page
    navigate('/checkout');
    setIsCartOpen(false);
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const getDiscountedPrice = (price, discount) => {
    const numericPrice = parseInt(price.replace('₹', ''));
    const discountPercent = parseInt(discount);
    return numericPrice - (numericPrice * discountPercent / 100);
  };

  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } }
      }}
    >
      <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Shopping Cart 
            <Badge 
              badgeContent={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
              color="primary" 
              sx={{ ml: 1 }}
            />
          </Typography>
          <IconButton onClick={() => setIsCartOpen(false)}>
            <Close />
          </IconButton>
        </Box>

        <Divider />

        {/* Cart Items */}
        <Box sx={{ flexGrow: 1, overflow: 'auto', my: 2 }}>
          {cartItems.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <ShoppingCartCheckout sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Your cart is empty
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add some medicines to get started
              </Typography>
            </Box>
          ) : (
            <List>
              {cartItems.map((item) => {
                const actualPrice = item.discount 
                  ? getDiscountedPrice(item.price, item.discount)
                  : parseInt(item.price.replace('₹', ''));
                
                return (
                  <ListItem key={item.id} sx={{ px: 0, py: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.name}
                        sx={{ width: 60, height: 60, borderRadius: 1, mr: 2 }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.brand}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <Typography variant="body2" color="primary.main" sx={{ fontWeight: 'bold' }}>
                            ₹{actualPrice}
                          </Typography>
                          {item.discount && (
                            <>
                              <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                {item.price}
                              </Typography>
                              <Chip label={item.discount} color="secondary" size="small" />
                            </>
                          )}
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        >
                          <Remove />
                        </IconButton>
                        <TextField
                          value={item.quantity}
                          size="small"
                          sx={{ width: 60, mx: 1 }}
                          inputProps={{ 
                            style: { textAlign: 'center' },
                            min: 1,
                          }}
                          onChange={(e) => handleQuantityChange(item, parseInt(e.target.value) || 1)}
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        >
                          <Add />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => removeFromCart(item.id)}
                          sx={{ ml: 1, color: 'error.main' }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          )}
        </Box>

        {/* Checkout Section */}
        {cartItems.length > 0 && (
          <>
            <Divider />
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Subtotal:</Typography>
                <Typography variant="body2">₹{getCartTotal()}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Delivery:</Typography>
                <Typography variant="body2" color="success.main">
                  Free
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                  ₹{getCartTotal()}
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                startIcon={<ShoppingCartCheckout />}
                onClick={handleCheckout}
                sx={{ borderRadius: 2, py: 1.5 }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;