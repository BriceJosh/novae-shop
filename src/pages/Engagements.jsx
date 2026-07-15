import React from 'react';
import { ShieldCheck, Truck, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Engagements() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-950 text-white py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(218,165,32,0.1),transparent_50%)]"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="bg-novae-gold/20 text-novae-gold text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-novae-gold/30">
            Notre Charte de Confiance
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 tracking-tight">
            Une sélection rigoureuse, <br />
            <span className="text-novae-gold">zéro compromis.</span>
          </h1>
          <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Le marché en ligne est vaste. Chez Novaë, notre rôle est de filtrer le superflu. Nous collaborons uniquement avec des distributeurs professionnels de confiance pour vous garantir authenticité, qualité et sécurité à chaque commande.
          </p>
        </div>
      </section>

      {/* 2. LES VALEURS / PILIERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Carte 1 */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-xl w-fit mb-6">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Distributeurs Agréés</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Pas d'intermédiaires douteux. Nos partenaires revendeurs sont sélectionnés selon des critères stricts de fiabilité juridique et commerciale pour écarter tout risque de contrefaçon.
            </p>
          </div>

          {/* Carte 2 */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-xl w-fit mb-6">
              <Sparkles size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Curation Exclusive</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Nous ne mettons pas tout leur catalogue en ligne. Nous analysons, testons et choisissons uniquement les articles les plus performants, innovants et plébiscités par les utilisateurs.
            </p>
          </div>

          {/* Carte 3 */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-xl w-fit mb-6">
              <Truck size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Logistique Sécurisée</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Nous travaillons main dans la main avec nos fournisseurs pour optimiser les flux d'expédition. Vous bénéficiez d'un suivi transparent de vos colis, du départ de l'entrepôt jusqu'à votre porte.
            </p>
          </div>

        </div>
      </section>

      {/* 3. NOUVELLE SECTION : TRANSPARENCE ET CONTACT FOURNISSEUR */}
      <section className="py-16 px-4 bg-blue-50/50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-10">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
            <MessageCircle size={32} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Une question pointue sur un produit ?</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed max-w-2xl">
              Nous croyons en une transparence totale. Si vous avez besoin de détails techniques précis ou de réassurance sur l'origine d'un produit, notre plateforme vous permet de poser votre question directement au partenaire distributeur via notre service de médiation.
            </p>
          </div>
          <div className="flex-shrink-0">
            {/* Ce lien peut pointer vers une page /contact-partenaires dédiée ou ouvrir une modale */}
            <Link 
              to="/contact-partenaires" 
              className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-6 py-3 rounded-xl shadow-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-all"
            >
              Interroger un partenaire
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SECTION PROCESSUS */}
      <section className="bg-white dark:bg-slate-900 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">Comment nous validons nos produits</h2>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
            {/* Étape 1 */}
            <div className="relative flex flex-col md:flex-row items-start md:justify-between gap-4 md:gap-8">
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center bg-blue-600 text-white rounded-full w-8 h-8 font-bold z-10 text-sm">1</div>
              <div className="pl-12 md:pl-0 md:w-[45%] md:text-right">
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">Audit du Revendeur</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Vérification de la conformité des stocks et des certifications de sécurité européennes/internationales.</p>
              </div>
              <div className="hidden md:block w-[45%]"></div>
            </div>

            {/* Étape 2 */}
            <div className="relative flex flex-col md:flex-row items-start md:justify-between gap-4 md:gap-8">
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center bg-blue-600 text-white rounded-full w-8 h-8 font-bold z-10 text-sm">2</div>
              <div className="hidden md:block w-[45%]"></div>
              <div className="pl-12 md:pl-0 md:w-[45%] text-left">
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">Commande Échantillon</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Nous commandons et testons nous-mêmes les produits pour juger de la qualité réelle des matériaux et du packaging.</p>
              </div>
            </div>

            {/* Étape 3 */}
            <div className="relative flex flex-col md:flex-row items-start md:justify-between gap-4 md:gap-8">
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center bg-blue-600 text-white rounded-full w-8 h-8 font-bold z-10 text-sm">3</div>
              <div className="pl-12 md:pl-0 md:w-[45%] md:text-right">
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">Mise en ligne & Suivi</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Une fois validé, le produit rejoint le catalogue. Nous analysons en continu les retours clients pour maintenir l'excellence.</p>
              </div>
              <div className="hidden md:block w-[45%]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Achetez en toute sérénité</h2>
            <p className="mt-4 text-blue-100 text-sm md:text-base leading-relaxed">
              Chaque produit disponible sur Novaë a passé avec succès notre protocole de sélection auprès de nos partenaires. Profitez de notre garantie de satisfaction.
            </p>
            <div className="mt-8 flex justify-center">
              <Link 
                to="/shop" 
                className="flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-xl shadow-md hover:bg-slate-50 transition-all group"
              >
                <span>Découvrir le catalogue</span>
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}