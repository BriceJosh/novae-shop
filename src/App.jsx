// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';

// Importation de nos composants globaux
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';

// Importation de la protection et du login admin
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';

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
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative">
        
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        
        <main className="flex-grow bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/engagements" element={<Engagements />} />
            <Route path="/contact-partenaires" element={<ContactPartenaires />} />

            {/* Nouvelle route pour la connexion admin */}
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Route Admin désormais protégée */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>

        <Footer />

        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        
      </div>
      <ScrollToTop />
    </Router>
  );
}

export default App;