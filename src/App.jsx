import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';

// Importation de nos composants globaux
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer'; // Ajout de l'import du Footer

// Importation de toutes nos pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';
import Engagements from './pages/Engagements';
import ContactPartenaires from './pages/ContactPartenaires';

function App() {
  // Cet état gère l'ouverture et la fermeture du volet du panier
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative">
        
        {/* 1. Barre de navigation globale */}
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        
        {/* 2. Zone principale d'affichage des pages */}
        {/* Modification : Utilisation de flex-grow au lieu de min-h-screen */}
        <main className="flex-grow bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/engagements" element={<Engagements />} />
            <Route path="/contact-partenaires" element={<ContactPartenaires />} />
          </Routes>
        </main>

        {/* 3. Le Footer (Pied de page global) */}
        <Footer />

        {/* 4. Le volet latéral du panier */}
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        
      </div>
      <ScrollToTop />
    </Router>
  );
}

export default App;