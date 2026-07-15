import express from 'express';
import Category from '../models/Category.js';
import mongoose from 'mongoose';

const router = express.Router();

// 1. Récupérer toutes les catégories (GET /api/categories)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: error.message });
  }
});

// 2. Ajouter une nouvelle catégorie (POST /api/categories)
router.post('/', async (req, res) => {
  const { name, image } = req.body;
  try {
    const newCategory = new Category({ name, image });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: "Impossible d'ajouter la catégorie", error: error.message });
  }
});

// 3. Modifier une catégorie existante via son ID (PUT /api/categories/:id)
router.put('/:id', async (req, res) => { // 👑 CORRECTION ICI : Juste '/:id'
  try {
    const { id } = req.params;
    const { name, image } = req.body;
    
    // SÉCURITÉ : Vérification du format de l'ID MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Format ID invalide" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, image },
      { new: true } // Renvoie le document modifié
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    res.json({ message: "🔄 Catégorie mise à jour avec succès !", category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la modification", error: error.message });
  }
});

// 4. Supprimer une catégorie (DELETE /api/categories/:id)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Format ID invalide" });
    }
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Catégorie introuvable" });
    res.json({ message: `Catégorie "${deleted.name}" supprimée.` });
  } catch (error) {
    res.status(500).json({ message: "Erreur", error: error.message });
  }
});

export default router;