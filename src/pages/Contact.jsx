import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emailData, setEmailData] = useState({ name: '', email: '', message: '' });

  const handleSend = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // ⚠️ Remplace par tes clés EmailJS (Utilise ton nouveau Template ID ici)
    const SERVICE_ID = "service_7eh8c5o";
    const TEMPLATE_ID = "template_cp6plae"; 
    const PUBLIC_KEY = "2Bfzz4IESOhUclN42";

    const templateParams = {
      from_name: emailData.name,
      from_email: emailData.email,
      message: emailData.message
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSubmitted(true);
        setEmailData({ name: '', email: '', message: '' });
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight">Contactez-nous</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Une question sur un produit ou sur votre livraison ? Nos équipes sont disponibles pour vous répondre.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Infos de Coordonnées */}
        <div className="lg:col-span-5 space-y-4 font-medium text-sm text-slate-700">
          <div className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <MapPin size={20} />
            </div>
            <span>Quartier Administratif, Lomé, Togo</span>
          </div>
          {/* <div className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Phone size={20} />
            </div>
            <span>+228 90 00 00 00</span>
          </div> */}
          <div className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Mail size={20} />
            </div>
            <span>contact@novae-shop.com</span>
          </div>
        </div>

        {/* Formulaire de Contact */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <p className="text-emerald-600 font-bold text-lg">Message envoyé avec succès !</p>
              <p className="text-slate-500 text-sm">Merci pour votre intérêt, nous vous répondrons sous 24h.</p>
              <button 
                onClick={() => setSubmitted(false)} 
                className="text-sm font-semibold text-blue-600 hover:underline mt-2 cursor-pointer"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4">
              
              {/* Affichage des erreurs */}
              {error && (
                <div className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-xl flex gap-3 text-sm font-medium">
                  <AlertCircle size={20} className="flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  required 
                  type="text" 
                  placeholder="Votre nom" 
                  disabled={isLoading}
                  value={emailData.name} 
                  onChange={(e) => setEmailData({...emailData, name: e.target.value})} 
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue-600 disabled:opacity-50" 
                />
                <input 
                  required 
                  type="email" 
                  placeholder="Votre email" 
                  disabled={isLoading}
                  value={emailData.email} 
                  onChange={(e) => setEmailData({...emailData, email: e.target.value})} 
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue-600 disabled:opacity-50" 
                />
              </div>
              
              <textarea 
                required 
                rows="5" 
                placeholder="Votre message..." 
                disabled={isLoading}
                value={emailData.message} 
                onChange={(e) => setEmailData({...emailData, message: e.target.value})} 
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue-600 resize-none disabled:opacity-50" 
              />
              
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                <Send size={16} /> 
                {isLoading ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}