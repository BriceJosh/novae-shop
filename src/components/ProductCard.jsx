import React, { useState } from 'react';
import { ShoppingCart, Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(price);
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const getBadgeStyle = (badgeText) => {
    switch (badgeText) {
      case 'Nouveau': return 'bg-novae-blue text-novae-gold';
      case 'Promotion': return 'bg-rose-600 text-white';
      case 'Livraison Gratuite': return 'bg-emerald-600 text-white';
      default: return 'bg-slate-900 text-white';
    }
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col relative">
      
      {product.badge && (
        <span className={`absolute top-2 left-2 z-10 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm ${getBadgeStyle(product.badge)}`}>
          {product.badge}
        </span>
      )}

      <Link to={`/product/${product._id}`} className="aspect-square w-full bg-slate-50 dark:bg-slate-800 overflow-hidden relative block">
        <img 
          src={product.image.startsWith('http') ? product.image : `${BACKEND_URL}${product.image}`} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        
        <div className="absolute inset-x-3 bottom-3 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">
          <button 
            onClick={handleAddClick} 
            className={`w-full font-semibold py-2 px-3 rounded-lg shadow-lg flex items-center justify-center gap-1.5 text-sm ${
              isAdded ? 'bg-emerald-600 text-white' : 'bg-novae-blue text-novae-gold hover:bg-opacity-90'
            }`}
          >
            {isAdded ? <Check size={16} /> : <ShoppingCart size={16} />}
            <span>{isAdded ? 'Ajouté !' : 'Ajouter'}</span>
          </button>
        </div>
      </Link>

      {/* Padding réduit à p-3 et texte compacté */}
      <div className="p-3 flex-grow flex flex-col justify-between dark:bg-novae-blue">
        <div>
          <span className="text-[10px] font-bold text-novae-gold uppercase tracking-wider">{product.category}</span>
          <Link to={`/product/${product._id}`}>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5 leading-tight group-hover:text-novae-blue dark:text-white line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-0.5 mt-1">
            <Star size={13} className="fill-novae-gold text-novae-gold" />
            <span className="text-xs font-medium text-slate-500">{product.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-sm font-black text-slate-950 dark:text-white">{formatPrice(product.price)}</span>
          
          <button 
            onClick={handleAddClick} 
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isAdded ? 'bg-emerald-600 text-white' : 'bg-novae-gold text-novae-blue'
            }`}
          >
            {isAdded ? <Check size={16} /> : <ShoppingCart size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}