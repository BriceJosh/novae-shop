import express from 'express';
import Product from '../models/Product.js';
import Category from '../models/Category.js'; // 👑 AJOUTÉ : Pour lier les vraies catégories

const router = express.Router();

const phoneProducts = [
  { name: "IPhone 12ProMax 256Gb", price: 200000, rating: 5, image: "/images/phones/iphone1.jpg", badge: null },
  { name: "IPhone XR 64Gb", price: 100000, rating: 5, image: "/images/phones/iphone12.jpg", badge: null },
  { name: "IPhone XR 256Gb", price: 120000, rating: 5, image: "/images/phones/iphone14.jpg", badge: null },
  { name: "IPhone 11 64Gb", price: 130000, rating: 5, image: "/images/phones/iphone10.png", badge: null },
  { name: "IPhone 11 128Gb ", price: 140000, rating: 5, image: "/images/phones/iphone10.png", badge: null },
  { name: "IPhone 12 64Gb", price: 130000, rating: 5, image: "/images/phones/iphone9.jpg", badge: null },
  { name: "IPhone 13 256Gb", price: 190000, rating: 5, image: "/images/phones/iphone8.jpg", badge: null },
  { name: "IPhone 13 128Gb", price: 200000, rating: 5, image: "/images/phones/iphone7.jpg", badge: null },
  { name: "IPhone 13Pro 128Gb", price: 240000, rating: 5, image: "/images/phones/iphone6.jpg", badge: null },
  { name: "IPhone 13Pro 256Gb", price: 250000, rating: 5, image: "/images/phones/iphone15.jpg", badge: null },
  { name: "IPhone 14 128Gb ", price: 220000, rating: 5, image: "/images/phones/iphone5.jpg", badge: null },
  { name: "IPhone 14 128Gb ", price: 220000, rating: 5, image: "/images/phones/iphones5.jpg", badge: null },
  { name: "IPhone 14Pro 128Gb", price: 270000, rating: 5, image: "/images/phones/iphone4.jpg", badge: null },
  { name: "IPhone 14Pro 256Gb", price: 290000, rating: 5, image: "/images/phones/iphones4.jpg", badge: null },
  { name: "IPhone 14ProMax 128Gb", price: 300000, rating: 5, image: "/images/phones/iphone3.jpg", badge: null },
  { name: "IPhone 15ProMax 128Gb", price: 450000, rating: 5, image: "/images/phones/iphone13.jpg", badge: null },
  { name: "Iphone 16 128Gb", price: 390000, rating: 5, image: "/images/phones/iphone2.jpg", badge: null },
  { name: " Pixel 6 128Gb", price: 100000, rating: 5, image: "/images/phones/pixel2.jpeg", badge: null },
  { name: "Pixel 7 128Gb", price: 120000, rating: 5, image: "/images/phones/pixel1.jpg", badge: null },
  { name: " Motorola G 04 128Gb", price: 60000, rating: 5, image: "/images/phones/moto1.jpg", badge: null },
  { name: "Motorola G-5G 2025 64Gb", price: 60000, rating: 5, image: "/images/phones/moto2.jpg", badge: null },
  { name: "Motorola G-5G 2025 128Gb", price: 70000, rating: 5, image: "/images/phones/moto3.jpg", badge: null }
];

// Route d'importation accessible via le navigateur
router.get('/import', async (req, res) => {
  try {
    // 1. 👑 On cherche une catégorie existante dans ta BDD pour ne pas créer de doublons fantômes
    // On cherche par exemple s'il y a une catégorie qui s'appelle "Téléphones" ou "Smartphones"
    let targetCategory = await Category.findOne({ 
      name: { $in: ["Téléphones", "Smartphones", "Téléphone", "phones"] } 
    });

    // Si aucune catégorie n'est trouvée, on en crée une par défaut pour éviter que ça plante
    if (!targetCategory) {
      targetCategory = await Category.create({
        name: "Téléphones",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500" // Image temporaire
      });
    }

    // 2. On vide TOUS les anciens produits pour faire place nette
    await Product.deleteMany({}); 

    // 3. 👑 On associe dynamiquement le nom de la VRAIE catégorie à chaque produit
    const completeProducts = phoneProducts.map(product => ({
      ...product,
      category: targetCategory.name // Prendra "Téléphones" (ou le nom exact en BDD)
    }));

    // 4. On insère la liste propre
    const createdProducts = await Product.insertMany(completeProducts);
    
    res.status(201).json({ 
      message: `🚀 Vos ${createdProducts.length} téléphones ont été synchronisés avec la catégorie officielle "${targetCategory.name}" !`, 
      count: createdProducts.length 
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'importation", error: error.message });
  }
});

export default router;