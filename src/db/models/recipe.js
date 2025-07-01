import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 64 },
  quantity: { type: String, required: true, maxlength: 32 },
});

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 128 },
    description: { type: String, required: true, maxlength: 1024 },
    cookingTime: { type: Number, required: true, min: 1, max: 1440 },
    calories: { type: Number, min: 0, max: 10000 },
    category: { type: String, required: true, maxlength: 64 },
    ingredients: { type: [ingredientSchema], required: true },
    instructions: { type: String, required: true, maxlength: 4096 },
    image: { type: String },
    imagePublicId: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
  { versionKey: false },
);

export default mongoose.model('Recipe', recipeSchema);
