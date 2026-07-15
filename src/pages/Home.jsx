import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import Hero from '../components/Hero'; 

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setIsLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('http://localhost:5000/api/products'),
          fetch('http://localhost:5000/api/categories')
        ]);
        
        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error('Impossible de charger les données de la page d\'accueil');
        }
        
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        
        // On cherche d'abord tous les produits qui ont un badge
        const badgedProducts = productsData.filter(p => p.badge && p.badge !== "");

       // S'il y a des produits avec badges, on prend les 4 premiers. Sinon, on prend juste les 4 premiers du catalogue normal.
        const displayProducts = badgedProducts.length > 0 ? badgedProducts.slice(0, 1000000) : productsData.slice(0, 1000000);

        setFeaturedProducts(displayProducts);
        setCategories(categoriesData);
        
      } catch (err) {
        console.error("❌ Erreur Home API :", err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

return (
    // Espace global réduit de 16 à 12 pour remonter le contenu
    <div className="space-y-12 pb-12 bg-slate-50/50 dark:bg-slate-950 transition-colors">
      <Hero />

      {/* 🌟 SECTION : CATÉGORIES - Marges réduites pour la compacité */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col items-center sm:items-start text-center sm:text-left">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">Parcourir par univers</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Accédez directement aux équipements de votre choix.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link 
              key={cat._id} 
              to={`/shop?category=${encodeURIComponent(cat.name)}`} 
              className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-2xl flex flex-col items-center text-center gap-2 transition-all hover:shadow-sm hover:border-blue-200 dark:hover:border-blue-800 no-underline"
            >
              <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800 overflow-hidden flex items-center justify-center border border-slate-100 dark:border-slate-700">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 tracking-tight group-hover:text-blue-600 transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* SECTION PRODUITS VEDETTES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">Les Tendances du Moment</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Notre sélection exclusive d'articles disponibles maintenant.</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => <ProductSkeleton key={index} />)}
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500 font-medium">Impossible de charger la sélection.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}