import mongoose from 'mongoose';

const ingredientInRecipeSchema = new mongoose.Schema({
    id: {
    type: String,
    ref: 'Ingredient',
    required: true,
  },
  measure: {
    type: String,
    required: true,
    maxlength: 64,
  },
});

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 128 },
    category: { type: String, required: true, maxlength: 64 },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    area: { type: String, maxlength: 64 },
    instructions: { type: String, required: true, maxlength: 4096 },
    description: { type: String, required: true, maxlength: 1024 },
    thumb: { type: String },               
    thumbPublicId: { type: String },
    time: { type: String, required: true, min: 1, max: 1440 }, 
    ingredients: { type: [ingredientInRecipeSchema], required: true },
    calories: { type: Number, min: 0, max: 10000 },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Recipe', recipeSchema);
