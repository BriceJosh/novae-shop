import React, { useState } from 'react';
import { ShoppingCart, Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const BACKEND_URL = "http://localhost:5000"; 

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
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative">
      
      {product.badge && (
        <span className={`absolute top-4 left-4 z-10 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md shadow-sm ${getBadgeStyle(product.badge)}`}>
          {product.badge}
        </span>
      )}

      <Link to={`/product/${product._id}`} className="aspect-square w-full bg-slate-50 dark:bg-slate-800 overflow-hidden relative block">
        <img 
          src={product.image.startsWith('http') ? product.image : `${BACKEND_URL}${product.image}`} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        
        {/* BOUTON DESKTOP (Or sur fond bleu nuit) */}
        <div className="absolute inset-x-4 bottom-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">
          <button 
            onClick={handleAddClick} 
            className={`w-full font-semibold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border ${
              isAdded 
                ? 'bg-emerald-600 text-white border-emerald-600' 
                : 'bg-novae-blue text-novae-gold border-novae-blue hover:bg-novae-blue-light'
            }`}
          >
            {isAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
            <span>{isAdded ? 'Ajouté !' : 'Ajouter au panier'}</span>
          </button>
        </div>
      </Link>

      <div className="p-5 flex-grow flex flex-col justify-between dark:bg-novae-blue dark:border-slate-800 transition-colors">
        <div className="p-4">
          <span className="text-xs font-semibold text-novae-gold tracking-wider uppercase">{product.category}</span>
          <Link to={`/product/${product._id}`}>
            <h3 className="font-heading text-base font-bold text-slate-900 mt-1 group-hover:text-novae-gold transition-colors line-clamp-2 dark:text-white">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 mt-2">
            <Star size={16} className="fill-novae-gold text-novae-gold" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{product.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/50">
          <span className="text-lg font-extrabold text-slate-950 dark:text-slate-100 mt-2">{formatPrice(product.price)}</span>
          
          {/* BOUTON MOBILE */}
          <button 
            onClick={handleAddClick} 
            className={`md:hidden p-2.5 rounded-xl transition-colors cursor-pointer text-white shadow-md ${
              isAdded ? 'bg-emerald-600' : 'bg-novae-gold text-novae-blue hover:bg-novae-gold-hover'
            }`}
          >
            {isAdded ? <Check size={18} /> : <ShoppingCart size={18} className="text-novae-blue" />}
          </button>
        </div>
      </div>
    </div>
  );
}