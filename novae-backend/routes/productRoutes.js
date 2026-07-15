import express from 'express';
import Product from '../models/Product.js';
import mongoose from 'mongoose'; // Pour vérifier la validité des ID MongoDB

const router = express.Router();

// 1. ROUTE POUR RÉCUPÉRER TOUS LES PRODUITS (GET /api/products)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des produits", error: error.message });
  }
});

// 2. ROUTE POUR AJOUTER UN PRODUIT (POST /api/products)
router.post('/', async (req, res) => {
  const { name, description, price, image, category, rating, badge } = req.body;

  try {
    const newProduct = new Product({ 
      name, 
      description, 
      price, 
      image, 
      category,
      // SÉCURITÉ : Valeurs par défaut si le formulaire Admin ne les fournit pas
      rating: rating || 5, 
      badge: badge || ""
    });
    
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: "Impossible d'ajouter le produit", error: error.message });
  }
});

// 3. ROUTE POUR RÉCUPÉRER UN PRODUIT SPÉCIFIQUE PAR SON ID (GET /api/products/:id)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // SÉCURITÉ : Si l'ID passé n'est pas au format MongoDB (24 caractères hexadécimaux)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Format d'identifiant produit invalide" });
    }

    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: "Produit introuvable" });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du produit", error: error.message });
  }
});

// 4. ROUTE POUR MODIFIER UN PRODUIT EXISTANT (PUT /api/products/:id)
router.put('/:id', async (req, res) => { 
  try {
    const { id } = req.params;
    // 👑 CORRECTION ICI : Ajout de "badge" dans la déstructuration de req.body
    const { name, price, category, description, image, badge } = req.body;

    // SÉCURITÉ : Vérification du format de l'ID MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Format d'identifiant produit invalide" });
    }

    // Met à jour le produit dans MongoDB
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price: Number(price),
        category,
        description,
        image,
        badge // 👑 CORRECTION ICI : Ajout du badge pour qu'il soit sauvegardé
      },
      { new: true } // Renvoie le produit modifié
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Produit non trouvé, impossible de le modifier." });
    }

    res.json({ message: "🔄 Produit modifié avec succès !", product: updatedProduct });
  } catch (error) {
    console.error("Erreur PUT /api/products:", error);
    res.status(500).json({ message: "Erreur serveur lors de la modification", error: error.message });
  }
});

// 5. ROUTE POUR SUPPRIMER UN PRODUIT (DELETE /api/products/:id)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // SÉCURITÉ : Vérification du format de l'ID MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Format d'identifiant produit invalide" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Produit introuvable, impossible de le supprimer" });
    }

    res.json({ message: `Le produit "${deletedProduct.name}" a bien été supprimé du catalogue.` });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du produit", error: error.message });
  }
});

export default router;