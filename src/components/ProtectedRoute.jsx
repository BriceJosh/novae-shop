// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // On vérifie la présence du token de l'administrateur dans le stockage local
  const token = localStorage.getItem('adminToken');

  // Si aucun token n'est trouvé, on redirige vers la page de connexion admin
  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  // Si le token est présent, on affiche le composant enfant (AdminPage)
  return children;
}