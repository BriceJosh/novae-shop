import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Initialiser l'état en récupérant les données du localStorage s'il y en a
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem('novae_cart');
    return localData ? JSON.parse(localData) : [];
  });

  // 2. Sauvegarder automatiquement le panier dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('novae_cart', JSON.stringify(cart));
  }, [cart]);

  // Ajouter un produit au panier
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Augmenter la quantité
  const incrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Diminuer la quantité
  const decrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          // 👑 CORRIGÉ ICI : Remplacement de item.id par item._id
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Supprime l'article si la quantité tombe à 0
    );
  };

  // Supprimer un produit
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  // Vider complètement le panier (après une commande)
  const clearCart = () => {
    setCart([]);
  };

  // Calculer le prix total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Nombre total d'articles dans le panier (pour la pastille de la Navbar)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount, // Injecté ici à la place de getCartCount
        addToCart,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        clearCart,
        getCartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}