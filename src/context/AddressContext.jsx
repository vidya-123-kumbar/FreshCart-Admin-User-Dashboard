import React, { createContext, useContext, useState, useEffect } from 'react';

const AddressContext = createContext(null);

const DEFAULT_ADDRESSES = [
  {
    id: 'addr-1',
    tag: 'Home',
    name: 'Rahul Sharma',
    phone: '9876543210',
    addressLine: 'Flat 402, Green Glen Layout, Koramangala',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
    isDefault: true,
  },
  {
    id: 'addr-2',
    tag: 'Work',
    name: 'Rahul Sharma',
    phone: '9876543210',
    addressLine: '4th Floor, Prestige Tech Park, Marathahalli Ring Rd',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560103',
    isDefault: false,
  },
];

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('freshcart_addresses');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return DEFAULT_ADDRESSES;
    } catch {
      return DEFAULT_ADDRESSES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('freshcart_addresses', JSON.stringify(addresses));
    } catch (e) {
      console.error('Failed to sync freshcart_addresses to localStorage', e);
    }
  }, [addresses]);

  const addAddress = (addr) => {
    const newAddress = {
      ...addr,
      id: addr.id || `addr-${Date.now()}`,
      isDefault: addresses.length === 0 ? true : !!addr.isDefault,
    };
    if (newAddress.isDefault) {
      setAddresses((prev) => [
        newAddress,
        ...prev.map((a) => ({ ...a, isDefault: false })),
      ]);
    } else {
      setAddresses((prev) => [newAddress, ...prev]);
    }
    return newAddress;
  };

  const updateAddress = (id, updated) => {
    setAddresses((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          return { ...a, ...updated };
        }
        if (updated.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      })
    );
  };

  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const setDefaultAddress = (id) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddresses = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddresses must be used within an AddressProvider');
  }
  return context;
};
