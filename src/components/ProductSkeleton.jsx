import React from 'react';

export default function ProductSkeleton() {
  return (
    // La carte vide animée (s'adapte aussi au Mode Sombre !)
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-800 p-4 space-y-4 animate-pulse">
      
      {/* Faux carré d'image */}
      <div className="bg-slate-200 dark:bg-slate-700 aspect-square w-full rounded-xl"></div>
      
      {/* Fausses lignes de texte */}
      <div className="space-y-2">
        {/* Ligne catégorie */}
        <div className="bg-slate-200 dark:bg-slate-700 h-3 w-1/4 rounded"></div>
        {/* Ligne titre */}
        <div className="bg-slate-200 dark:bg-slate-700 h-5 w-3/4 rounded"></div>
        {/* Ligne prix */}
        <div className="bg-slate-200 dark:bg-slate-700 h-4 w-1/2 rounded pt-2"></div>
      </div>
      
    </div>
  );
}