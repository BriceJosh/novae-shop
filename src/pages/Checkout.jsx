import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingBag, MessageSquare, ArrowLeft, CheckCircle2 } from 'lucide-react';
import RecentlyViewed from '../components/RecentlyViewed'; // Importation de l'historique

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    phone: ''
  });

  // NUMÉRO DE TÉLÉPHONE ICI (avec l'indicatif pays, sans le "+")
  const WHATSAPP_NUMBER = '22871460429'; 

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(price);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Construire le texte du message pour WhatsApp
    let message = `*Nouvelle commande sur NOVAË.*\n\n`;
    message += `*Client :* ${formData.firstName} ${formData.lastName}\n`;
    message += `*Téléphone :* ${formData.phone}\n`;
    message += `*Email :* ${formData.email}\n`;
    message += `*Livraison :* ${formData.address}, ${formData.city}\n\n`;
    message += `*--- ARTICLES ---*\n`;
    
    cart.forEach((item) => {
      message += `- ${item.name} (x${item.quantity}) : ${formatPrice(item.price * item.quantity)}\n`;
    });
    
    message += `\n*TOTAL COMMANDE :* ${formatPrice(getCartTotal())}\n\n`;
    message += `Merci de me confirmer la prise en charge et les modalités de livraison !`;

    // 2. Encoder le message pour l'URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // 3. Ouvrir WhatsApp dans un nouvel onglet
    window.open(whatsappUrl, '_blank');

    // 4. Valider l'état local et vider le panier
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="max-w-md mx-auto my-20 text-center px-4">
        <div className="flex justify-center mb-6 text-green-600 dark:text-green-400">
          <CheckCircle2 size={80} />
        </div>
        <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">Commande envoyée !</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
          Votre panier a été validé et le récapitulatif a été transféré sur **WhatsApp**. Veuillez finaliser la discussion avec le gérant pour planifier votre livraison.
        </p>
        <Link to="/" className="mt-8 inline-flex items-center justify-center bg-blue-600 text-white font-bold h-12 px-6 rounded-xl shadow-md hover:bg-blue-700 transition-colors">
          Retourner à l'accueil
        </Link>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Votre panier est vide</h2>
        <Link to="/shop" className="mt-6 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline">
          <ArrowLeft size={16} /> Parcourir la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-8">Finaliser la commande</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-50 dark:border-slate-800 pb-3">Informations de livraison</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input required type="text" name="firstName" placeholder="Prénom" value={formData.firstName} onChange={handleInputChange} className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium" />
            <input required type="text" name="lastName" placeholder="Nom" value={formData.lastName} onChange={handleInputChange} className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium" />
          </div>
          
          <input required type="email" name="email" placeholder="Adresse Email" value={formData.email} onChange={handleInputChange} className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium" />
          <input required type="tel" name="phone" placeholder="Numéro WhatsApp (Ex: 90 12 34 56)" value={formData.phone} onChange={handleInputChange} className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium" />
          <input required type="text" name="address" placeholder="Quartier & indications de livraison" value={formData.address} onChange={handleInputChange} className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium" />
          <input required type="text" name="city" placeholder="Ville (Ex: Lomé)" value={formData.city} onChange={handleInputChange} className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium" />
          
          {/* Bouton customisé WhatsApp */}
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-14 rounded-xl shadow-md flex items-center justify-center gap-3 cursor-pointer transition-colors">
            <MessageSquare size={20} /> Confirmer via WhatsApp ({formatPrice(getCartTotal())})
          </button>
        </form>

        {/* RÉSUMÉ DE LA COMMANDE */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-50 dark:border-slate-800 pb-3 flex items-center gap-2">
            <ShoppingBag size={20} className="text-blue-600 dark:text-blue-400" /> Résumé
          </h3>
          
          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-64 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 py-4 items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border dark:border-slate-800" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{item.name}</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Quantité : {item.quantity}</p>
                </div>
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between text-base font-black text-slate-950 dark:text-white">
            <span>Total</span>
            <span className="text-xl text-blue-600 dark:text-blue-400">{formatPrice(getCartTotal())}</span>
          </div>
        </div>

      </div>

      {/* HISTORIQUE EN BAS DE PAGE */}
      <RecentlyViewed />
    </div>
  );
}