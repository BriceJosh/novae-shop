import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartSidebar({ isOpen, onClose }) {
  const { cart, incrementQuantity, decrementQuantity, removeFromCart, getCartTotal } = useCart();
  const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // 👑 Permet d'unifier l'affichage des images locales

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'XOF', 
      minimumFractionDigits: 0 
    }).format(price);
  };

  // Permet de charger l'image locale ou externe correctement
  const getProductImage = (imagePath) => {
    if (!imagePath) return '';
    return imagePath.startsWith('http') ? imagePath : `${BACKEND_URL}${imagePath}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Arrière-plan sombre */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-950 shadow-2xl flex flex-col transition-colors duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
              <ShoppingBag size={22} className="text-blue-600 dark:text-blue-400" />
              Mon Panier
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 cursor-pointer transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Liste des produits */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {!cart || cart.length === 0 ? (
              <div className="text-center py-20 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                <ShoppingBag size={48} className="stroke-1 mb-4" />
                <p className="text-base font-medium">Votre panier est encore vide.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item._id} className="flex gap-4 pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100 dark:border-slate-800">
                    {/* 👑 CORRIGÉ : Source de l'image dynamique */}
                    <img 
                      src={getProductImage(item.image)} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between gap-2">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">{item.name}</h3>
                        <button onClick={() => removeFromCart(item._id)} className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.category}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-900">
                        <button onClick={() => decrementQuantity(item._id)} className="p-1.5 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-slate-500 cursor-pointer">-</button>
                        <span className="px-2 text-sm font-semibold text-slate-800 dark:text-slate-200 min-w-[20px] text-center">{item.quantity}</span>
                        <button onClick={() => incrementQuantity(item._id)} className="p-1.5 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-slate-500 cursor-pointer">+</button>
                      </div>
                      <span className="text-sm font-extrabold text-slate-950 dark:text-white">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart && cart.length > 0 && (
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Sous-total</span>
                <span className="text-xl font-black text-slate-950 dark:text-white">{formatPrice(getCartTotal())}</span>
              </div>
              <Link 
                to="/checkout" 
                onClick={onClose}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center cursor-pointer text-center"
              >
                Passer à la caisse
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}