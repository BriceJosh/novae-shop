import React from 'react';
import { ShieldCheck, Target, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Section En-tête / Histoire */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight">À Propos de Novaë</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Fondée avec la volonté d'offrir le meilleur du design et de la technologie, Novaë est plus qu'une simple boutique. C'est une communauté de passionnés qui sélectionne des articles d'exception pour sublimer votre quotidien.
        </p>
      </div>

      {/* Grille de nos Valeurs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <ShieldCheck size={26} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Qualité Garantie</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Chaque produit de notre catalogue fait l'objet d'un contrôle strict pour vous assurer une durabilité et une fiabilité irréprochables.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Target size={26} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Notre Mission</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Rendre accessibles des articles modernes et performants tout en garantissant un accompagnement client humain et réactif.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Users size={26} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Communauté</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            À l'écoute constante de nos clients, nous faisons évoluer nos collections en fonction de vos retours et de vos besoins réels.
          </p>
        </div>
      </div>

    </div>
  );
}