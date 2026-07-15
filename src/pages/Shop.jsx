import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { FlameKindling, X } from 'lucide-react';
import ProductSkeleton from '../components/ProductSkeleton';
import RecentlyViewed from '../components/RecentlyViewed';

export default function Shop() {
  const [products, setProducts] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); 

  const BACKEND_URL = "http://localhost:5000"; // 👑 Centralisé pour éviter les URLs en dur dans le code

  // On récupère les paramètres depuis l'URL
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';

  // Récupération des produits ET des catégories depuis le Backend
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        setIsLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/products`),
          fetch(`${BACKEND_URL}/api/categories`)
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error('Impossible de charger les données du catalogue');
        }
        
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        console.error("❌ Erreur API :", err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBackendData();
  }, []); 

  // Synchronisation de l'état "selectedCategory" avec l'URL
  useEffect(() => {
    if (categoryQuery) {
      setSelectedCategory(categoryQuery);
    } else if (!searchQuery) {
      setSelectedCategory('Tous');
    }
  }, [categoryQuery, searchQuery]);

  // Filtrage des produits selon la catégorie et la recherche
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'Tous' || product.category === selectedCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Fonction pour vider la recherche
  const clearSearchFilter = () => {
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  // Fonction pour gérer le clic sur une catégorie
  const handleCategoryClick = (catName) => {
    if (catName === 'Tous') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catName);
    }
    if (searchQuery) searchParams.delete('search');
    setSearchParams(searchParams);
  };

  // Rendu de l'image de catégorie (gère le local et l'externe)
  const getCategoryImage = (imagePath) => {
    if (!imagePath) return '';
    return imagePath.startsWith('http') ? imagePath : `${BACKEND_URL}${imagePath}`;
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">Le Catalogue Novaë</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Explorez l'intégralité de nos collections exclusives.</p>
      </div>
      
      {searchQuery && (
        <div className="mb-6 flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-xl w-fit text-sm font-semibold">
          <span>Résultats pour : "{searchQuery}"</span>
          <button onClick={clearSearchFilter} className="hover:bg-blue-100 dark:hover:bg-blue-900 p-0.5 rounded-full cursor-pointer">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Grille principale */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* COLONNE DE GAUCHE : Boutons de Filtres */}
        <div className="md:col-span-3 space-y-4 md:sticky md:top-24">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors">
            <h3 className="font-bold text-slate-900 dark:text-white border-b border-slate-50 dark:border-slate-800 pb-3 mb-3 text-sm uppercase tracking-wider">Catégories</h3>
            <div className="flex flex-row md:flex-col gap-2 text-sm font-medium overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
              
              {/* Bouton "Tous" */}
              <button
                onClick={() => handleCategoryClick('Tous')}
                className={`px-4 py-2.5 rounded-xl text-left whitespace-nowrap transition-all cursor-pointer w-full font-bold border-none ${
                  selectedCategory === 'Tous' && !searchQuery
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 bg-transparent'
                }`}
              >
                Tous les produits
              </button>

              {/* Boucle sur les catégories */}
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`px-3 py-2 rounded-xl text-left whitespace-nowrap transition-all cursor-pointer w-full flex items-center gap-3 border-none ${
                    selectedCategory === cat.name && !searchQuery
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 bg-transparent'
                  }`}
                >
                  <img 
                    src={getCategoryImage(cat.image)} 
                    alt={cat.name} 
                    className="w-6 h-6 rounded-lg object-cover bg-slate-100 dark:bg-slate-800" 
                  />
                  <span className="font-semibold">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bloc d'infos */}
          <div className="hidden md:block bg-gradient-to-br from-slate-900 to-slate-950 text-white p-5 rounded-2xl shadow-sm space-y-4">
            <span className="bg-blue-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">Aide & Infos</span>
            <div>
              <h4 className="font-bold text-sm">Besoin d'aide ?</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Des questions sur un produit ? Contactez notre équipe directement sur WhatsApp.</p>
            </div>
          </div>
        </div>

        {/* COLONNE DES PRODUITS */}
        <div className="md:col-span-9 md:border-l md:border-slate-100 md:pl-8 dark:border-slate-800">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(6)].map((_, index) => <ProductSkeleton key={index} />)}
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-500 bg-red-50/50 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900 font-medium">
              ❌ {error}. Veuillez vérifier que le serveur backend est bien démarré.
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 font-medium">
              Aucun produit ne correspond à votre recherche pour la catégorie {selectedCategory}.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>
      <RecentlyViewed />
    </div>
  );
}