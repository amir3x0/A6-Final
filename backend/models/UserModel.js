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
  recipes: [RecipeSchema],
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
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
  bio: { type: String, default: "no bio available" },
  profileImageUrl: {
    type: String, // URL to the user's profile image
    default: "https://ik.imagekit.io/k0hnty7yv/defaultpic.jpg?updatedAt=1710591249991",
  },
  favoriteRecipes: [{ type: String, default: [] }],
  uploadedRecipes: [{ type: String, default: [] }],
  MealPlans: [{type: String, default: []}],
});

// Pre-save hook to hash password before saving a new user
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();
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
