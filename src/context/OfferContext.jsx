import React, { createContext, useContext, useState, useEffect } from 'react';

const OfferContext = createContext(null);

const DEFAULT_OFFERS = [
  {
    id: 'off-1',
    code: 'FRESH50',
    title: 'Flat ₹50 OFF',
    discountType: 'flat',
    discountValue: 50,
    minOrder: 399,
    description: 'Flat ₹50 OFF on your everyday essentials (Min. order ₹399)',
    isActive: true,
  },
  {
    id: 'off-2',
    code: 'WELCOME10',
    title: '10% OFF',
    discountType: 'percentage',
    discountValue: 10,
    maxDiscount: 100,
    minOrder: 299,
    description: '10% Instant Discount on first order up to ₹100',
    isActive: true,
  },
  {
    id: 'off-3',
    code: 'GROCERY20',
    title: '20% OFF',
    discountType: 'percentage',
    discountValue: 20,
    maxDiscount: 150,
    minOrder: 799,
    description: '20% OFF on pantry & monthly staples above ₹799',
    isActive: true,
  },
  {
    id: 'off-4',
    code: 'FREEDEL',
    title: 'Free Delivery',
    discountType: 'flat',
    discountValue: 40,
    minOrder: 249,
    description: 'Free delivery voucher on mid-week grocery orders above ₹249',
    isActive: false,
  },
];

export const OfferProvider = ({ children }) => {
  const [offers, setOffers] = useState(() => {
    try {
      const saved = localStorage.getItem('freshcart_offers');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return DEFAULT_OFFERS;
    } catch {
      return DEFAULT_OFFERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('freshcart_offers', JSON.stringify(offers));
    } catch (e) {
      console.error('Failed to sync freshcart_offers to localStorage', e);
    }
  }, [offers]);

  const addOffer = (offerData) => {
    const newOffer = {
      id: `off-${Date.now()}`,
      code: offerData.code.toUpperCase().trim(),
      title: offerData.title || `${offerData.discountValue}${offerData.discountType === 'percentage' ? '%' : '₹'} OFF`,
      discountType: offerData.discountType || 'flat',
      discountValue: Number(offerData.discountValue) || 50,
      minOrder: Number(offerData.minOrder) || 199,
      description: offerData.description || `Special discount on minimum order of ₹${offerData.minOrder || 199}`,
      isActive: true,
    };
    setOffers((prev) => [newOffer, ...prev]);
    return newOffer;
  };

  const deleteOffer = (idOrCode) => {
    setOffers((prev) => prev.filter((o) => o.id !== idOrCode && o.code !== idOrCode));
  };

  const toggleOfferStatus = (idOrCode) => {
    setOffers((prev) =>
      prev.map((o) =>
        o.id === idOrCode || o.code === idOrCode ? { ...o, isActive: !o.isActive } : o
      )
    );
  };

  return (
    <OfferContext.Provider
      value={{
        offers,
        addOffer,
        deleteOffer,
        toggleOfferStatus,
      }}
    >
      {children}
    </OfferContext.Provider>
  );
};

export const useOffers = () => {
  const context = useContext(OfferContext);
  if (!context) {
    throw new Error('useOffers must be used within an OfferProvider');
  }
  return context;
};
