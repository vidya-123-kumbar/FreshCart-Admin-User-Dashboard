import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_CUSTOMER = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '9876543210',
  role: 'customer',
  memberSince: '2026',
};

const DEFAULT_ADMIN = {
  name: 'Store Admin',
  email: 'admin@freshcart.com',
  phone: '9800012345',
  role: 'admin',
  memberSince: '2025',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('freshcart_user');
      return saved ? JSON.parse(saved) : DEFAULT_CUSTOMER;
    } catch {
      return DEFAULT_CUSTOMER;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('freshcart_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('freshcart_user');
      }
    } catch (e) {
      console.error('Failed to sync freshcart_user with localStorage', e);
    }
  }, [user]);

  const loginAs = (role = 'customer', customData = {}) => {
    const base = role === 'admin' ? DEFAULT_ADMIN : DEFAULT_CUSTOMER;
    const updated = { ...base, ...customData, role };
    setUser(updated);
    return updated;
  };

  const updateProfile = (profileData) => {
    setUser((prev) => {
      const updated = { ...(prev || DEFAULT_CUSTOMER), ...profileData };
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'guest',
        isAuthenticated: !!user,
        loginAs,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
