import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifier si un utilisateur est déjà stocké au démarrage de l'application
  useEffect(() => {
    const savedUser = localStorage.getItem('novae_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Fonction pour se connecter ou s'inscrire
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('novae_user', JSON.stringify(userData));
  };

  // Fonction pour se déconnecter
  const logout = () => {
    setUser(null);
    localStorage.removeItem('novae_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}