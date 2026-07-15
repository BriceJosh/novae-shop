import React, { useState, useEffect } from 'react';
import { PackagePlus, DollarSign, Tag, FileText, Image as ImageIcon, CheckCircle, AlertCircle, Trash2, FolderPlus, Edit2, X, Star } from 'lucide-react';

export default function AdminPage() {
  const CLOUDINARY_CLOUD_NAME = "jamxluwk"; 
  const CLOUDINARY_UPLOAD_PRESET = "novae_uploads"; 

  const [activeTab, setActiveTab] = useState('products');
  const [status, setStatus] = useState({ type: null, message: '' });

  // --- ÉTATS PRODUITS ---
  // 👑 AJOUT DU CHAMP 'badge' ICI
  const [productData, setProductData] = useState({ name: '', price: '', category: '', description: '', badge: '' });
  const [productImageFile, setProductImageFile] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState(null);
  const [existingProducts, setExistingProducts] = useState([]);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [currentProductImageUrl, setCurrentProductImageUrl] = useState('');

  // --- ÉTATS CATÉGORIES ---
  const [categoryName, setCategoryName] = useState('');
  const [categoryImageFile, setCategoryImageFile] = useState(null);
  const [categoryImagePreview, setCategoryImagePreview] = useState(null);
  const [existingCategories, setExistingCategories] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [currentCategoryImageUrl, setCurrentCategoryImageUrl] = useState('');

  const fetchData = async () => {
    try {
      const prodRes = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/products`);
      if (prodRes.ok) setExistingProducts(await prodRes.json());

      const catRes = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/categories`);
      if (catRes.ok) {
        const categoriesData = await catRes.json();
        setExistingCategories(categoriesData);
        if (categoriesData.length > 0 && !productData.category) {
          setProductData(prev => ({ ...prev, category: categoriesData[0].name }));
        }
      }
    } catch (err) {
      console.error("Erreur de chargement des données :", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const uploadToCloudinary = async (file, fallbackUrl) => {
    if (!file) return fallbackUrl;

    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: imageData
    });
    if (!res.ok) throw new Error("Échec de l'envoi de l'image sur le Cloud.");
    const data = await res.json();
    return data.secure_url;
  };

  // --- ACTIONS PRODUITS ---
  const handleProductEditClick = (product) => {
    setEditingProductId(product._id);
    setProductData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      badge: product.badge || '' // 👑 RÉCUPÉRATION DU BADGE
    });
    setCurrentProductImageUrl(product.image);
    setProductImagePreview(product.image);
    setProductImageFile(null);
    setStatus({ type: null, message: '' });
  };

  const cancelProductEdit = () => {
    setEditingProductId(null);
    setProductData({ name: '', price: '', category: existingCategories[0]?.name || '', description: '', badge: '' }); // 👑 RESET DU BADGE
    setProductImageFile(null);
    setProductImagePreview(null);
    setCurrentProductImageUrl('');
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setIsProductLoading(true);
    setStatus({ type: null, message: '' });

    if (!productImageFile && !editingProductId) {
      setStatus({ type: 'error', message: "Veuillez sélectionner une image pour le produit." });
      setIsProductLoading(false);
      return;
    }

    try {
      const imageUrl = await uploadToCloudinary(productImageFile, currentProductImageUrl);

      const finalProduct = {
        ...productData,
        price: Number(productData.price),
        image: imageUrl,
        badge: productData.badge === "" ? null : productData.badge // 👑 GESTION DU BADGE VIDE
      };

      const url = editingProductId 
        ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/products/${editingProductId}`
        : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/products`;

      const method = editingProductId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalProduct),
      });

      if (!res.ok) throw new Error(editingProductId ? "Erreur lors de la modification." : "Erreur lors de la création.");

      setStatus({ 
        type: 'success', 
        message: editingProductId ? `🔄 Produit "${finalProduct.name}" modifié !` : `🚀 Produit "${finalProduct.name}" ajouté !` 
      });
      
      cancelProductEdit();
      fetchData();
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setIsProductLoading(false);
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Supprimer le produit "${name}" ?`)) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/products/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setStatus({ type: 'success', message: `🗑️ Produit "${name}" supprimé.` });
          if (editingProductId === id) cancelProductEdit();
          fetchData();
        }
      } catch (err) { setStatus({ type: 'error', message: err.message }); }
    }
  };

  // --- ACTIONS CATÉGORIES (inchangées) ---
  const handleCategoryEditClick = (category) => {
    setEditingCategoryId(category._id);
    setCategoryName(category.name);
    setCurrentCategoryImageUrl(category.image);
    setCategoryImagePreview(category.image);
    setCategoryImageFile(null);
    setStatus({ type: null, message: '' });
  };

  const cancelCategoryEdit = () => {
    setEditingCategoryId(null);
    setCategoryName('');
    setCategoryImageFile(null);
    setCategoryImagePreview(null);
    setCurrentCategoryImageUrl('');
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setIsCategoryLoading(true);
    setStatus({ type: null, message: '' });

    if ((!categoryImageFile && !editingCategoryId) || !categoryName.trim()) {
      setStatus({ type: 'error', message: "Veuillez renseigner le nom et ajouter une image." });
      setIsCategoryLoading(false);
      return;
    }

    try {
      const imageUrl = await uploadToCloudinary(categoryImageFile, currentCategoryImageUrl);

      const url = editingCategoryId 
        ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/categories/${editingCategoryId}`
        : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/categories`;

      const method = editingCategoryId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName.trim(), image: imageUrl }),
      });

      if (!res.ok) throw new Error("Erreur. La catégorie existe peut-être déjà.");

      setStatus({ 
        type: 'success', 
        message: editingCategoryId ? `🔄 Catégorie modifiée !` : `📁 Catégorie créée !` 
      });
      
      cancelCategoryEdit();
      fetchData();
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setIsCategoryLoading(false);
    }
  };

  const handleDeleteCategory = async (id, name) => {
    if (window.confirm(`Supprimer "${name}" ? (Cela n'efface pas ses produits)`)) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/categories/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setStatus({ type: 'success', message: `🗑️ Catégorie supprimée.` });
          if (editingCategoryId === id) cancelCategoryEdit();
          fetchData();
        }
      } catch (err) { setStatus({ type: 'error', message: err.message }); }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              Espace Administration Novaë
            </h1>
          </div>
          
          <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl font-bold text-xs">
            <button 
              onClick={() => { setActiveTab('products'); setStatus({ type: null, message: '' }); }}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer border-none ${activeTab === 'products' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Produits
            </button>
            <button 
              onClick={() => { setActiveTab('categories'); setStatus({ type: null, message: '' }); }}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer border-none ${activeTab === 'categories' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Catégories
            </button>
          </div>
        </div>

        {status.message && (
          <div className={`flex items-center gap-3 p-4 rounded-2xl border text-sm font-semibold ${status.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400' : 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/20 dark:border-rose-900/50 dark:text-rose-400'}`}>
            {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{status.message}</span>
          </div>
        )}

        {/* ONGLET PRODUITS */}
        {activeTab === 'products' && (
          <div className="space-y-12">
            <form onSubmit={handleProductSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 md:p-8 rounded-3xl space-y-5 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {editingProductId ? "📝 Modifier le produit" : " Ajouter un produit"}
                </h2>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Nom du produit</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-3.5 text-slate-400" size={18} />
                    <input type="text" required value={productData.name} onChange={(e) => setProductData({...productData, name: e.target.value})} placeholder="Ex: iPhone 15 Pro" className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl dark:text-white text-sm font-medium focus:outline-none focus:border-blue-600" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Prix (F CFA)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-3.5 text-slate-400" size={18} />
                      <input type="number" required value={productData.price} onChange={(e) => setProductData({...productData, price: e.target.value})} placeholder="750000" className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl dark:text-white text-sm font-medium focus:outline-none focus:border-blue-600" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Catégorie</label>
                    <select value={productData.category} onChange={(e) => setProductData({...productData, category: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl dark:text-white text-sm font-medium cursor-pointer focus:outline-none focus:border-blue-600">
                      {existingCategories.map((cat) => (
                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                      ))}
                      {existingCategories.length === 0 && <option>Aucune catégorie créée</option>}
                    </select>
                  </div>
                </div>

                {/* 👑 NOUVEAU CHAMP : BADGE DU PRODUIT */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Mettre en avant (Badge)</label>
                  <div className="relative">
                    <Star className="absolute left-4 top-3.5 text-slate-400" size={18} />
                    <select value={productData.badge} onChange={(e) => setProductData({...productData, badge: e.target.value})} className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl dark:text-white text-sm font-medium cursor-pointer focus:outline-none focus:border-blue-600">
                      <option value="">Aucun badge (Standard)</option>
                      <option value="Nouveau">✨ Nouveau</option>
                      <option value="Promotion">🔥 En Promotion</option>
                      <option value="Livraison Gratuite">🚚 Livraison Gratuite</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-3.5 text-slate-400" size={18} />
                    <textarea required rows="4" value={productData.description} onChange={(e) => setProductData({...productData, description: e.target.value})} placeholder="Caractéristiques..." className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl dark:text-white text-sm font-medium resize-none focus:outline-none focus:border-blue-600" />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button type="submit" disabled={isProductLoading || existingCategories.length === 0} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl transition-all disabled:opacity-50 cursor-pointer border-none">
                    {isProductLoading ? "Traitement..." : editingProductId ? "Sauvegarder les modifications" : "Ajouter le produit"}
                  </button>
                  {editingProductId && (
                    <button type="button" onClick={cancelProductEdit} className="px-4 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 cursor-pointer border-none">
                      <X size={16} /> Annuler
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl flex flex-col justify-between space-y-4 shadow-sm">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Image du produit</label>
                  <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl h-64 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 overflow-hidden relative">
                    {productImagePreview ? <img src={productImagePreview} alt="Aperçu" className="w-full h-full object-contain rounded-xl" /> : <div className="text-center p-4"><ImageIcon className="mx-auto text-slate-400 mb-2" size={32} /><p className="text-xs text-slate-400">Image du produit</p></div>}
                  </div>
                </div>
                <label className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold py-3 text-center rounded-xl cursor-pointer block border border-transparent">
                  <span>{editingProductId ? "Remplacer l'image" : "Sélectionner une image"}</span>
                  <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files[0]; if(f){ setProductImageFile(f); setProductImagePreview(URL.createObjectURL(f)); } }} className="hidden" />
                </label>
              </div>
            </form>

            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Catalogue existant ({existingProducts.length} produits)</h2>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto pr-2">
                {existingProducts.map((p) => (
                  <div key={p._id} className={`flex items-center justify-between py-3 gap-4 rounded-xl px-2 transition-all ${editingProductId === p._id ? 'bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900' : ''}`}>
                    <div className="flex items-center gap-4">
                      <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover bg-slate-100" />
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {p.name} 
                          {/* 👑 AFFICHAGE DU BADGE DANS LA LISTE ADMIN */}
                          {p.badge && <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded text-[10px] font-bold">{p.badge}</span>}
                        </h3>
                        <p className="text-xs text-slate-400">{p.category} • <span className="font-semibold text-blue-600">{p.price.toLocaleString()} F CFA</span></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleProductEditClick(p)} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer border-none bg-transparent" title="Modifier"><Edit2 size={18} /></button>
                      <button onClick={() => handleDeleteProduct(p._id, p.name)} className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl cursor-pointer border-none bg-transparent" title="Supprimer"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ONGLET CATÉGORIES */}
        {activeTab === 'categories' && (
          <div className="space-y-12">
            <form onSubmit={handleCategorySubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 md:p-8 rounded-3xl space-y-5 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {editingCategoryId ? "📝 Modifier la catégorie" : " Ajouter une catégorie"}
                </h2>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Nom de la catégorie</label>
                  <div className="relative">
                    <FolderPlus className="absolute left-4 top-3.5 text-slate-400" size={18} />
                    <input type="text" required value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Ex: Smartphones, Accessoires..." className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl dark:text-white text-sm font-medium focus:outline-none focus:border-blue-600" />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button type="submit" disabled={isCategoryLoading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl transition-all disabled:opacity-50 cursor-pointer border-none">
                    {isCategoryLoading ? "Traitement..." : editingCategoryId ? "Sauvegarder les modifications" : "Créer la catégorie"}
                  </button>
                  {editingCategoryId && (
                    <button type="button" onClick={cancelCategoryEdit} className="px-4 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 cursor-pointer border-none">
                      <X size={16} /> Annuler
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl flex flex-col justify-between space-y-4 shadow-sm">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Image de la catégorie</label>
                  <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl h-40 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 overflow-hidden relative">
                    {categoryImagePreview ? <img src={categoryImagePreview} alt="Aperçu" className="w-full h-full object-contain rounded-xl" /> : <div className="text-center p-4"><ImageIcon className="mx-auto text-slate-400 mb-1" size={28} /><p className="text-xs text-slate-400">Photo représentative</p></div>}
                  </div>
                </div>
                <label className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold py-2.5 text-center rounded-xl cursor-pointer block border border-transparent">
                  <span>{editingCategoryId ? "Remplacer l'image" : "Sélectionner une image"}</span>
                  <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files[0]; if(f){ setCategoryImageFile(f); setCategoryImagePreview(URL.createObjectURL(f)); } }} className="hidden" />
                </label>
              </div>
            </form>

            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Catégories configurées ({existingCategories.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-80 overflow-y-auto pr-2">
                {existingCategories.map((c) => (
                  <div key={c._id} className={`flex items-center justify-between p-3 border rounded-2xl transition-all ${editingCategoryId === c._id ? 'border-blue-500 bg-blue-50/20 dark:bg-blue-950/20' : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30'}`}>
                    <div className="flex items-center gap-3">
                      <img src={c.image} alt={c.name} className="w-10 h-10 rounded-xl object-cover bg-slate-100" />
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleCategoryEditClick(c)} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer border-none bg-transparent" title="Modifier"><Edit2 size={16} /></button>
                      <button onClick={() => handleDeleteCategory(c._id, c.name)} className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl cursor-pointer border-none bg-transparent" title="Supprimer"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}