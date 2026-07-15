import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path'; // 👑 AJOUTÉ : Pour gérer proprement les chemins de fichiers
import productRoutes from './routes/productRoutes.js';
import seedRoutes from './routes/seed.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json()); // 👑 RE-ACTIVÉ : Obligatoire pour décoder le JSON et éviter l'erreur "Route introuvable"

// 👑 CORRIGÉ : Puisque ton dossier "public" est en dehors de "novae-backend", on recule d'un dossier (../public)
app.use('/images', express.static(path.join(process.cwd(), '../public/images')));

// Connexion à la base de données MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🍃 Connexion réussie à MongoDB Atlas !");
  } catch (error) {
    console.error("❌ Erreur de connexion à la base de données :", error.message);
    process.exit(1); 
  }
};

connectDB();

// --- DÉCLARATION DES ROUTES ---

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/seed', seedRoutes);
app.use('/api/categories', categoryRoutes);


// Route de test du statut
app.get('/api/status', (req, res) => {
  res.json({ message: "Le serveur de Novaë fonctionne et la BDD est connectée ! 🚀" });
});

// Gestion des routes inexistantes (404)
app.use((req, res) => {
  res.status(404).json({ message: "Route introuvable sur le serveur" });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✨ Serveur démarré sur http://localhost:${PORT}`);
});