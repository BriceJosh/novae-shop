import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // True = Connexion, False = Inscription
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null); // Efface l'erreur dès que l'utilisateur retape
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue");
      }

      // Si tout est OK, on connecte l'utilisateur dans le contexte et on redirige
      login(data);
      navigate('/shop'); // Redirection vers la boutique après connexion réussie
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-xl p-8 space-y-6">
        
        {/* En-tête */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">
            {isLogin ? 'Bon retour !' : 'Créer un compte'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isLogin ? 'Heureux de vous revoir sur Novaë.' : 'Rejoignez-nous pour vivre une expérience exclusive.'}
          </p>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="flex items-center gap-2 p-4 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-sm font-semibold rounded-2xl border border-rose-100 dark:border-rose-900/50">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulaire unique dynamique */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Champ Nom (uniquement pour l'Inscription) */}
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Nom complet</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-600 dark:text-white text-sm font-medium"
                />
              </div>
            </div>
          )}

          {/* Champ Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Adresse Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="exemple@email.com"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-600 dark:text-white text-sm font-medium"
              />
            </div>
          </div>

          {/* Champ Mot de passe */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-600 dark:text-white text-sm font-medium"
              />
            </div>
          </div>

          {/* Bouton Soumettre */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isLoading ? (
              <span className="animate-pulse">Traitement en cours...</span>
            ) : (
              <>
                <span>{isLogin ? 'Se connecter' : 'Créer mon compte'}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Bouton de Bascule entre Connexion et Inscription */}
        <div className="text-center pt-2">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400 bg-transparent border-none cursor-pointer"
          >
            {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
          </button>
        </div>

      </div>
    </div>
  );
}