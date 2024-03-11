const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ingredientSchema = new mongoose.Schema({
  name: String,
  quantity: String,
});

const RecipeSchema = new mongoose.Schema({
  id: Number,
  title: String,
  difficulty: String,
  category: String,
  description: String,
  instructions: [String],
  ingredients: [ingredientSchema],
  calories: {
    total: Number,
    protein: String,
    carbs: String,
    fat: String,
  },
  picture: String,
  Chef: String,
});

const MealPlanSchema = new mongoose.Schema({
  id: Number,
  title: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String, // URL to the user's profile image
    required: false,
  },
  favoriteRecipes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ],
  uploadedRecipes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ],
  MealPlans: [MealPlanSchema]
});

// Pre-save hook to hash password before saving a new user
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password along with our new salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
