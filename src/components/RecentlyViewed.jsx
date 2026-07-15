import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

export default function RecentlyViewed({ currentProductId = null }) {
  const [recentProducts, setRecentProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const BACKEND_URL = "http://localhost:5000"; // 👑 CORRIGÉ : Remplacement de window.location.origin qui cherchait sur le port 5173

  useEffect(() => {
    const fetchRecentProducts = async () => {
      const savedIds = JSON.parse(localStorage.getItem('recent_views')) || [];
      const filteredIds = savedIds.filter(id => id !== currentProductId?.toString()).slice(0, 4);

      if (filteredIds.length === 0) {
        setRecentProducts([]);
        return;
      }

      try {
        setIsLoading(true);
        const requests = filteredIds.map(id =>
          fetch(`${BACKEND_URL}/api/products/${id}`).then(res => res.ok ? res.json() : null)
        );
        
        const results = await Promise.all(requests);
        setRecentProducts(results.filter(Boolean));
      } catch (error) {
        console.error("❌ Erreur lors du chargement de l'historique :", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentProducts();
  }, [currentProductId]);

  if (isLoading || recentProducts.length === 0) return null;

  return (
    <div className="mt-16 border-t border-slate-100 dark:border-slate-800 pt-10">
      <div className="flex items-center gap-2 mb-6">
        <Eye size={20} className="text-blue-600" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Récemment consultés
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {recentProducts.map((product) => (
          <Link 
            key={product._id} 
            to={`/product/${product._id}`}
            className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="aspect-square w-full rounded-lg bg-slate-50 dark:bg-slate-800 overflow-hidden mb-3">
                <img 
                  src={product.image.startsWith('http') ? product.image : `${BACKEND_URL}${product.image}`} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-0.5">
                {product.category}
              </span>
              <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h4>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-2">
              {product.price.toLocaleString('fr-FR')} F CFA
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}