import React, { useState } from 'react';
import { Send, Shield, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

export default function ContactPartenaires() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'origine',
    product: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // ⚠️ REMPLACE CES TROIS VALEURS PAR TES IDENTIFIANTS EMAILJS
    const SERVICE_ID = "service_7eh8c5o";
    const TEMPLATE_ID = "template_cp6plae";
    const PUBLIC_KEY = "2Bfzz4IESOhUclN42";

    // Les variables qui doivent correspondre aux {{tags}} de ton modèle EmailJS
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      product_name: formData.product || "Non spécifié",
      message: formData.message
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setError("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 px-4 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        
        {/* En-tête */}
        <div className="text-center mb-10">
          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
            <Shield size={14} /> Service de Médiation
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Interroger un partenaire
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
            Vous avez une question technique ou besoin d'être rassuré sur la provenance d'un article ? 
            Remplissez ce formulaire. Notre équipe contactera directement le distributeur agréé pour vous obtenir une réponse précise sous 24 à 48h.
          </p>
        </div>

        {/* Contenu principal */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100 dark:border-slate-800">
          
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Demande envoyée !</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                Votre question a bien été transmise à notre service de médiation. Nous contactons le partenaire concerné et vous répondrons sur <strong>{formData.email}</strong> dans les plus brefs délais.
              </p>
              <Link to="/shop" className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition-colors">
                Retourner à la boutique
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {error && (
                <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 p-4 rounded-xl flex gap-3 text-sm font-medium">
                  <AlertCircle size={20} className="flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nom */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-slate-900 dark:text-white block">Votre nom complet</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    disabled={isLoading}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
                    placeholder="Votre nom complet"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-slate-900 dark:text-white block">Votre adresse email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    disabled={isLoading}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
                    placeholder="Exemple@gmail.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sujet de la question */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-slate-900 dark:text-white block">Sujet de la question</label>
                  <select 
                    id="subject" 
                    name="subject"
                    disabled={isLoading}
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
                  >
                    <option value="origine">Origine & Fabrication du produit</option>
                    <option value="qualite">Matériaux & Qualité</option>
                    <option value="normes">Certifications & Normes de sécurité</option>
                    <option value="autre">Autre précision technique</option>
                  </select>
                </div>

                {/* Nom du produit */}
                <div className="space-y-2">
                  <label htmlFor="product" className="text-sm font-semibold text-slate-900 dark:text-white flex justify-between">
                    <span>Produit concerné</span>
                    <span className="text-slate-400 text-xs font-normal">(Optionnel)</span>
                  </label>
                  <input 
                    type="text" 
                    id="product" 
                    name="product"
                    disabled={isLoading}
                    value={formData.product}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
                    placeholder="Ex: Écouteurs sans fil X200"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-slate-900 dark:text-white block">Votre question pour le partenaire</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5"
                  required
                  disabled={isLoading}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none disabled:opacity-50"
                  placeholder="Bonjour, j'aimerais savoir si ce produit possède bien la certification CE et quel est le type de plastique utilisé..."
                ></textarea>
              </div>

              {/* Bloc info */}
              <div className="bg-blue-50 dark:bg-slate-950 border border-blue-100 dark:border-slate-800 rounded-xl p-4 flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Info size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <p>
                  Pour des raisons de confidentialité et de rapidité de traitement, votre demande sera filtrée et formatée par nos équipes avant d'être transmise au distributeur.
                </p>
              </div>

              {/* Bouton Soumettre */}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-blue-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-md hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                <span>{isLoading ? "Envoi en cours..." : "Envoyer ma demande"}</span>
                {!isLoading && <Send size={18} className="transform group-hover:translate-x-1 transition-transform" />}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}