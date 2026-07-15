import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem('novae-orders')) || [];
  });

  useEffect(() => {
    localStorage.setItem('novae-orders', JSON.stringify(orders));
  }, [orders]);

  // Fonction pour ajouter une nouvelle commande
  const createOrder = (shippingDetails, items, totalAmount) => {
    const newOrder = {
      id: 'NOV-' + Math.floor(100000 + Math.random() * 900000), // Faux numéro de commande unique
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'En cours de traitement',
      shippingDetails,
      items,
      totalAmount,
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    return newOrder;
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}