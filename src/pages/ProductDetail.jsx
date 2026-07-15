import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import RecentlyViewed from '../components/RecentlyViewed';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";// 👑 URL du serveur backend

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BACKEND_URL}/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Impossible de charger les détails de ce produit');
        }
        
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error("❌ Erreur API Détail :", err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  useEffect(() => {
    if (id && product) {
      let currentViews = JSON.parse(localStorage.getItem('recent_views')) || [];
      currentViews = currentViews.filter(viewId => viewId !== id.toString());
      currentViews.unshift(id.toString());
      localStorage.setItem('recent_views', JSON.stringify(currentViews.slice(0, 6)));
    }
  }, [id, product]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'XOF', 
      minimumFractionDigits: 0 
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  // Gestion de l'affichage dynamique de l'image
  const getProductImage = (imagePath) => {
    if (!imagePath) return '';
    return imagePath.startsWith('http') ? imagePath : `${BACKEND_URL}${imagePath}`;
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500 dark:text-slate-400">
        <div className="animate-pulse font-medium">Chargement des spécifications de votre article...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">❌ Article introuvable</h2>
        <Link to="/shop" className="mt-4 inline-block text-blue-600 font-semibold hover:underline dark:text-blue-400">
          Retourner à la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 mb-8 transition-colors">
        <ArrowLeft size={16} />
        Retour à la boutique
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Colonne Gauche : Image grand format */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm aspect-square relative transition-colors">
          {product.badge && (
            <span className="absolute top-6 left-6 z-10 bg-slate-900 text-white text-xs font-semibold px-3 py-1 rounded-full dark:bg-slate-800">
              {product.badge}
            </span>
          )}
          <img 
            src={getProductImage(product.image)} 
            alt={product.name} 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Colonne Droite : Informations & Achat */}
        <div className="space-y-6">
          <div>
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase dark:text-blue-400">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white mt-2 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={`text-amber-400 ${i < Math.floor(product.rating || 5) ? 'fill-amber-400' : 'stroke-1'}`} 
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{product.rating || 5}</span>
              <span className="text-sm text-slate-400 dark:text-slate-500">(42 avis clients)</span>
            </div>
          </div>

          <div className="text-3xl font-black text-slate-950 dark:text-white pt-4 border-t border-slate-100 dark:border-slate-800">
            {formatPrice(product.price)}
          </div>

          <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Description</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center border border-slate-200 dark:border-slate-750 rounded-xl bg-white dark:bg-slate-900 h-14 justify-between px-4 sm:w-36">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 font-bold text-xl p-1 cursor-pointer">-</button>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 font-bold text-xl p-1 cursor-pointer">+</button>
            </div>

            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <ShoppingCart size={20} />
              Ajouter au panier
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 rounded-xl">
              <Truck size={20} className="text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Livraison rapide à domicile</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 rounded-xl">
              <ShieldCheck size={20} className="text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Paiement 100% sécurisé</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 rounded-xl">
              <RotateCcw size={20} className="text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Garantie retour 14 jours</span>
            </div>
          </div>

        </div>
      </div>

      <RecentlyViewed currentProductId={id} />
    </div>
  );
}