import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Le nom du produit est obligatoire"],
    trim: true
  },
  description: {
    type: String,
    default: "Aucune description disponible" // Changé pour éviter les erreurs de validation
  },
  price: {
    type: Number,
    required: [true, "Le prix est obligatoire"],
    min: [0, "Le prix ne peut pas être négatif"]
  },
  image: {
    type: String,
    required: [true, "L'URL de l'image est obligatoire"]
  },
  category: {
    type: String,
    required: [true, "La catégorie est obligatoire"],
    trim: true
  },
  rating: {
    type: Number,
    default: 5
  },
  badge: {
    type: String,
    default: null
  },
  inStock: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);
export default Product;