import React from 'react';
import { Link } from 'react-router-dom';
// On a retiré Facebook, Instagram et Twitter de cet import
import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 mt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grille principale du Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Colonne 1 : Marque et description */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                Novaë<span className="text-blue-600">-shop</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Votre destination pour l'électroménager, la téléphonie et l'équipement high-tech. L'art de choisir le meilleur, livré chez vous.
            </p>
            <div className="flex gap-4 pt-2">
              {/* Icône Facebook en SVG natif */}
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* Icône Instagram en SVG natif */}
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              {/* Icône Twitter en SVG natif */}
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Colonne 2 : Catégories rapides */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Nos Univers</h3>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link to="/shop?category=phones" className="hover:text-blue-600 transition-colors">Téléphonie & Smartphones</Link>
              </li>
              <li>
                <Link to="/shop?category=Electroménager" className="hover:text-blue-600 transition-colors">Électroménager</Link>
              </li>
              <li>
                <Link to="/shop?category=Ecouteur" className="hover:text-blue-600 transition-colors">Audio & Écouteurs</Link>
              </li>
              <li>
                <Link to="/shop?category=Electronics" className="hover:text-blue-600 transition-colors">Électronique</Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Service Client */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Service Client</h3>
            <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link to="/contact" className="hover:text-blue-600 transition-colors">Nous contacter</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 transition-colors">Foire aux questions (FAQ)</Link>
              </li>
              <li>
                <Link to="/livraison" className="hover:text-blue-600 transition-colors">Suivre ma commande</Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Contact direct */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Contact</h3>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <span><br />Lomé, Togo</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-600 shrink-0" />
                <span>contact@novae-shop.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          
          <p>© {currentYear} Novaë-shop. Tous droits réservés.</p>
          
          <div className="flex gap-6">
            <Link to="/mentions-legales" className="hover:text-slate-900 dark:hover:text-white transition-colors">Mentions légales</Link>
            <Link to="/confidentialite" className="hover:text-slate-900 dark:hover:text-white transition-colors">Politique de confidentialité</Link>
            <Link to="/cgv" className="hover:text-slate-900 dark:hover:text-white transition-colors">CGV</Link>
          </div>
          
        </div>
      </div>
    </footer>
  );
}