import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem('localHealthToken');
        const userData = localStorage.getItem('localHealthUser');
        
        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        localStorage.removeItem('localHealthToken');
        localStorage.removeItem('localHealthUser');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call
      setLoading(true);
      
      // Mock authentication - In real app, this would be an API call
      if (email && password) {
        const mockUser = {
          id: 1,
          name: 'John Doe',
          email: email,
          phone: '+91 9876543210',
          avatar: '/api/placeholder/100/100',
          joinedDate: new Date().toISOString(),
        };
        
        const mockToken = 'mock_jwt_token_' + Date.now();
        
        localStorage.setItem('localHealthToken', mockToken);
        localStorage.setItem('localHealthUser', JSON.stringify(mockUser));
        setUser(mockUser);
        setIsLoginModalOpen(false);
        
        return { success: true, user: mockUser };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      
      // Mock signup
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        avatar: '/api/placeholder/100/100',
        joinedDate: new Date().toISOString(),
      };
      
      const mockToken = 'mock_jwt_token_' + Date.now();
      
      localStorage.setItem('localHealthToken', mockToken);
      localStorage.setItem('localHealthUser', JSON.stringify(newUser));
      setUser(newUser);
      setIsSignupModalOpen(false);
      
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('localHealthToken');
    localStorage.removeItem('localHealthUser');
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('localHealthUser', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    isLoginModalOpen,
    setIsLoginModalOpen,
    isSignupModalOpen,
    setIsSignupModalOpen,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};