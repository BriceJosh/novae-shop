import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  image: {
    type: String, // Stockera l'URL Cloudinary de l'image de la catégorie
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);