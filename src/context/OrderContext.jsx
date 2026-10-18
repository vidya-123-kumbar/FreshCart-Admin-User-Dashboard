import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext(null);

const DEFAULT_ORDERS = [
  {
    id: 'FC-892411',
    customer: {
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '9876543210',
    },
    date: '18 Sep 2026, 10:30 AM',
    itemsCount: 3,
    total: 429,
    status: 'Confirmed', // Pending | Confirmed | Delivered | Cancelled
    paymentMethod: 'UPI (Google Pay)',
    address: {
      tag: 'Home',
      name: 'Rahul Sharma',
      phone: '9876543210',
      addressLine: 'Flat 402, Green Glen Layout, Koramangala',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560034',
    },
    items: [
      {
        id: 'fv-1',
        name: 'Fresh Royal Gala Apples',
        quantity: 1,
        price: 149,
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'dairy-1',
        name: 'Amul Taaza Homogenised Toned Milk',
        quantity: 2,
        price: 74,
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'fv-4',
        name: 'Fresh Hybrid Tomatoes',
        quantity: 1,
        price: 38,
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'FC-781932',
    customer: {
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '9876543210',
    },
    date: '14 Sep 2026, 04:15 PM',
    itemsCount: 2,
    total: 310,
    status: 'Delivered',
    paymentMethod: 'Cash on Delivery',
    address: {
      tag: 'Home',
      name: 'Rahul Sharma',
      phone: '9876543210',
      addressLine: 'Flat 402, Green Glen Layout, Koramangala',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560034',
    },
    items: [
      {
        id: 'staples-1',
        name: 'Fortune Sunlite Refined Sunflower Oil',
        quantity: 1,
        price: 165,
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'fv-5',
        name: 'Fresh Red Onions',
        quantity: 2,
        price: 45,
        image: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'FC-652840',
    customer: {
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '9876543210',
    },
    date: '02 Sep 2026, 11:20 AM',
    itemsCount: 4,
    total: 890,
    status: 'Delivered',
    paymentMethod: 'Credit Card',
    address: {
      tag: 'Home',
      name: 'Rahul Sharma',
      phone: '9876543210',
      addressLine: 'Flat 402, Green Glen Layout, Koramangala',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560034',
    },
    items: [
      {
        id: 'staples-2',
        name: 'Aashirvaad Shudh Chakki Atta',
        quantity: 1,
        price: 245,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'snacks-1',
        name: 'Haldiram Nagpur Aloo Bhujia',
        quantity: 2,
        price: 98,
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'FC-541902',
    customer: {
      name: 'Priya Patel',
      email: 'priya.patel@gmail.com',
      phone: '9811223344',
    },
    date: '17 Sep 2026, 02:45 PM',
    itemsCount: 2,
    total: 540,
    status: 'Pending',
    paymentMethod: 'UPI',
    address: {
      tag: 'Home',
      name: 'Priya Patel',
      phone: '9811223344',
      addressLine: 'B-201, Shanti Niketan, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
    },
    items: [
      {
        id: 'fv-3',
        name: 'Fresh Alphonso Mangoes',
        quantity: 1,
        price: 499,
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'FC-439281',
    customer: {
      name: 'Amit Verma',
      email: 'amit.verma@yahoo.com',
      phone: '9822334455',
    },
    date: '16 Sep 2026, 06:10 PM',
    itemsCount: 5,
    total: 1240,
    status: 'Delivered',
    paymentMethod: 'Net Banking',
    address: {
      tag: 'Work',
      name: 'Amit Verma',
      phone: '9822334455',
      addressLine: 'Tower 4, Embassy Tech Village',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103',
    },
    items: [
      {
        id: 'dairy-3',
        name: 'Epigamia Greek Yogurt Natural',
        quantity: 4,
        price: 70,
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
];

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('freshcart_orders');
      return saved ? JSON.parse(saved) : DEFAULT_ORDERS;
    } catch {
      return DEFAULT_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('freshcart_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to sync freshcart_orders to localStorage', e);
    }
  }, [orders]);

  const addOrder = (orderData) => {
    const newOrder = {
      id: orderData.id || `FC-${Math.floor(100000 + Math.random() * 900000)}`,
      customer: orderData.customer || {
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        phone: '9876543210',
      },
      date:
        orderData.date ||
        new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      itemsCount: orderData.items?.length || 1,
      total: orderData.total || 0,
      status: orderData.status || 'Pending',
      paymentMethod: orderData.paymentMethod || 'Cash on Delivery',
      address: orderData.address || {
        tag: 'Home',
        name: 'Rahul Sharma',
        phone: '9876543210',
        addressLine: 'Flat 402, Koramangala 4th Block',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560034',
      },
      items: orderData.items || [],
      savings: orderData.savings || 0,
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
  };

  const getOrderById = (orderId) => {
    return orders.find((o) => o.id === orderId || o.id === `FC-${orderId}`);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
