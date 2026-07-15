import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Menu, X, Sun, Moon, LogOut, ChevronDown, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onCartClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]); 
  
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsOpen(false); // On ferme le menu mobile après une recherche
    }
  };

  const handleLogoutClick = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-100 sticky top-0 z-50 shadow-sm dark:bg-novae-blue/95 dark:border-slate-800 transition-colors duration-300">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20 w-full">
          
          {/* GROUPE GAUCHE : Logo + Liens */}
          <div className="flex items-center gap-12 lg:gap-16">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src={theme === 'dark' ? "/logo-dark.png" : "/logo-light.png"} 
                  alt="Novaë" 
                  className="h-16 w-auto object-contain drop-shadow-sm"
                />
              </Link>
            </div>

            {/* Liens Desktop */}
            <div className="hidden md:flex items-center space-x-8 font-medium text-slate-600 dark:text-slate-300">
              <Link to="/" className="hover:text-novae-gold transition-colors">Accueil</Link>
              <Link to="/shop" className="hover:text-novae-gold transition-colors">Boutique</Link>
              
              {/* Dropdown Catégories */}
              <div className="relative group py-2">
                <button className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-novae-gold font-medium transition-colors cursor-pointer focus:outline-none">
                  <span>Catégories</span>
                  <ChevronDown size={16} className="transform group-hover:rotate-180 transition-transform duration-200 text-slate-400 group-hover:text-novae-gold" />
                </button>
                
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-novae-blue border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
                  <Link to="/shop" className="flex items-center gap-3 px-4 py-3 text-sm text-blue-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-bold transition-colors">
                    <span className="text-base">📦</span> Tous les produits
                  </Link>
                  
                  <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>
                  
                  {categories.map((cat) => (
                    <Link 
                      key={cat._id} 
                      to={`/shop?category=${encodeURIComponent(cat.name)}`}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-novae-gold transition-colors"
                    >
                      <img src={cat.image} alt={cat.name} className="w-6 h-6 rounded-md object-cover bg-slate-100" />
                      <span className="font-semibold">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Lien Confiance / Fournisseurs */}
              <Link to="/engagements" className="flex items-center gap-1.5 hover:text-novae-gold transition-colors text-emerald-600 dark:text-emerald-400 font-semibold">
                <ShieldCheck size={18} />
                <span>Nos fournisseurs</span>
              </Link>
              <Link to="/about" className="hover:text-novae-gold transition-colors">À propos</Link>
              <Link to="/contact" className="hover:text-novae-gold transition-colors">Contact</Link>
            </div>
          </div>

          {/* GROUPE DROITE : Recherche + Actions Desktop */}
          <div className="hidden md:flex items-center space-x-6 text-slate-700 dark:text-slate-200">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center border border-slate-200 bg-slate-50 dark:bg-novae-blue-light dark:border-slate-700 rounded-xl px-3 py-1.5 focus-within:border-novae-gold transition-colors">
              <input 
                type="text" 
                placeholder="Rechercher..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm font-medium focus:outline-none w-64 text-slate-900 dark:text-white placeholder-slate-400"
              />
              <button type="submit" className="text-slate-400 hover:text-novae-gold transition-colors cursor-pointer">
                <Search size={18} />
              </button>
            </form>

            <button onClick={toggleTheme} className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-novae-blue-light dark:hover:bg-slate-700 transition-colors cursor-pointer text-slate-500 dark:text-slate-400">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} className="text-novae-gold" />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-700">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{user?.name?.split(' ')[0]}</span>
                <button onClick={handleLogoutClick} className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all cursor-pointer">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button onClick={() => navigate('/login')} className="hover:text-novae-gold transition-colors cursor-pointer">
                <User size={22} />
              </button>
            )}
            
            <button onClick={onCartClick} className="relative hover:text-novae-gold transition-colors cursor-pointer">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-novae-gold text-novae-blue text-xs font-extrabold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Menu Mobile Header (Ajout du Panier ici pour accès rapide) */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={onCartClick} className="relative text-slate-700 dark:text-slate-200 hover:text-novae-gold p-1 cursor-pointer">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-novae-gold text-novae-blue text-[10px] font-extrabold rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button onClick={toggleTheme} className="text-slate-700 dark:text-slate-200 p-1 cursor-pointer">
              {theme === 'light' ? <Moon size={22} /> : <Sun size={22} className="text-novae-gold" />}
            </button>
            
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-700 dark:text-slate-200 p-1 cursor-pointer">
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Déroulant Mobile Complet */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-novae-blue border-b border-slate-100 dark:border-slate-800 px-4 pt-4 pb-6 space-y-5 shadow-inner h-screen overflow-y-auto">
          
          {/* Recherche Mobile */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-novae-blue-light rounded-xl px-3 py-2">
            <input 
              type="text" 
              placeholder="Rechercher un produit..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm font-medium focus:outline-none w-full text-slate-900 dark:text-white placeholder-slate-400"
            />
            <button type="submit" className="text-slate-400 hover:text-novae-gold">
              <Search size={18} />
            </button>
          </form>

          {/* Liens de base */}
          <div className="space-y-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="block font-semibold text-slate-700 dark:text-slate-200 hover:text-novae-gold">Accueil</Link>
            <Link to="/shop" onClick={() => setIsOpen(false)} className="block font-semibold text-slate-700 dark:text-slate-200 hover:text-novae-gold">Tous les produits</Link>
          </div>

          {/* Section Catégories Mobile */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Catégories</p>
            <div className="grid grid-cols-1 gap-3 pl-2">
              {categories.map((cat) => (
                <Link 
                  key={cat._id} 
                  to={`/shop?category=${encodeURIComponent(cat.name)}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-novae-gold"
                >
                  <img src={cat.image} alt={cat.name} className="w-6 h-6 rounded-md object-cover bg-slate-100" />
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Autres Liens Mobile */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <Link to="/engagements" onClick={() => setIsOpen(false)} className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck size={18} />
              Nos fournisseurs
            </Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block font-semibold text-slate-700 dark:text-slate-200 hover:text-novae-gold">À propos</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block font-semibold text-slate-700 dark:text-slate-200 hover:text-novae-gold">Contact</Link>
          </div>

          {/* Auth Mobile */}
          <div className="pt-6 pb-20 border-t border-slate-100 dark:border-slate-800">
            {isAuthenticated ? (
              <div className="flex items-center justify-between bg-slate-50 dark:bg-novae-blue-light p-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <User size={18} className="text-slate-500" />
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{user?.name}</span>
                </div>
                <button onClick={handleLogoutClick} className="text-sm font-bold text-rose-500 hover:text-rose-600 p-2">
                  Déconnexion
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { navigate('/login'); setIsOpen(false); }} 
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
              >
                <User size={18} />
                Se connecter
              </button>
            )}
          </div>

        </div>
      )}
    </nav>
  );
}