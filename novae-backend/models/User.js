import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Veuillez fournir un nom"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Veuillez fournir un email"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Veuillez fournir un email valide"
    ]
  },
  password: {
    type: String,
    required: [true, "Veuillez fournir un mot de passe"],
    minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"],
    select: false // Évite de retourner le mot de passe par défaut lors des requêtes
  }
}, { timestamps: true });

// 👑 SÉCURITÉ : Chiffrer le mot de passe avant la sauvegarde en BDD
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode pour vérifier si le mot de passe correspond lors de la connexion
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);