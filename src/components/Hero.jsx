import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1585515320310-259814833e62?q=80&w=600",
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600",
    "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=600",
    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=600"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); 

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative bg-white overflow-hidden border-b border-slate-100">
      
      {/* Éléments de design en arrière-plan */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-gradient-to-br from-blue-400 to-indigo-300 rounded-full filter blur-[100px] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-gradient-to-tr from-sky-300 to-blue-200 rounded-full filter blur-[80px] opacity-10 pointer-events-none"></div>
      
      {/* PADDING RÉDUIT ICI (pt-10 pb-12 sur mobile, pt-16 pb-16 sur desktop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-16 lg:pb-16 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Texte de gauche */}
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left space-y-5">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 backdrop-blur-sm text-blue-600 text-xs sm:text-sm font-semibold transition-all hover:bg-blue-100/50">
              <Sparkles size={14} className="text-blue-500 animate-pulse" />
              <span>Nouvelle Collection en ligne</span>
            </div>
            
            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-5xl xl:text-6xl leading-[1.15]">
              L'art de choisir <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                le meilleur.
              </span>
            </h1>
            
            <p className="text-base text-slate-600 sm:text-lg lg:text-base xl:text-lg leading-relaxed max-w-xl">
              Découvrez une sélection exclusive d'appareils conçus pour votre quotidien. Épurés, performants et pensés pour durer. Bénéficiez de la livraison rapide et d'un support client 24/7.
            </p>
            
            {/* Marges resserrées au-dessus des boutons (pt-2) */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link 
                to="/Shop" 
                className="inline-flex items-center justify-center px-5 py-3.5 border border-transparent text-base font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-blue-200 hover:shadow-xl cursor-pointer gap-2 group"
              >
                Explorer la boutique
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                to="/about" 
                className="inline-flex items-center justify-center px-5 py-3.5 border border-slate-200 text-base font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm cursor-pointer"
              >
                En savoir plus
              </Link>
            </div>
          </div>
          
          {/* Slider d'images à droite (Marge mt-10 au lieu de mt-16) */}
          <div className="mt-10 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 flex justify-center">
            <div className="relative mx-auto w-full max-w-[440px] lg:max-w-md">
              
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] opacity-15 blur-2xl"></div>
              
              {/* RATIO MODIFIÉ ICI (aspect-[4/3] pour réduire la hauteur) */}
              <div className="relative block w-full bg-slate-50 rounded-[1.5rem] overflow-hidden shadow-2xl border border-slate-100 aspect-[4/3] transform hover:scale-[1.01] transition-transform duration-300">
                
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Produit High-Tech Novaë-shop ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}

              </div>

              {/* Badge légèrement rétréci pour coller au nouveau format */}
              <div className="absolute -bottom-5 -left-5 bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-3 transform hover:translate-y-[-2px] transition-transform z-20">
                <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium leading-tight">Garantie Novaë</p>
                  <p className="text-sm font-bold text-slate-900 leading-tight">Satisfaction à 100 %</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}