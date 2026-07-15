import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Fonction utilitaire pour générer le Token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_key_12345', {
    expiresIn: '30d' // Le token reste valide pendant 30 jours
  });
};

// 1. ROUTE D'INSCRIPTION (POST /api/auth/register)
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Créer le nouvel utilisateur
    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id) // On envoie le token directement
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription", error: error.message });
  }
});

// 2. ROUTE DE CONNEXION (POST /api/auth/login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Rechercher l'utilisateur et forcer la sélection du mot de passe (qui était masqué par défaut)
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion", error: error.message });
  }
});

export default router;