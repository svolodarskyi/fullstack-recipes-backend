import Joi from 'joi';

const ingredientSchema = Joi.object({
  name: Joi.string().max(64).required(),
  quantity: Joi.string().max(32).required(),
});

export const recipeSchema = Joi.object({
  title: Joi.string().max(128).required(),
  description: Joi.string().max(1024).required(),
  cookingTime: Joi.number().integer().min(1).max(1440).required(),
  calories: Joi.number().integer().min(0).max(10000).optional().allow(null),
  category: Joi.string().max(64).required(),
  ingredients: Joi.array().items(ingredientSchema).min(1).required(),
  instructions: Joi.string().max(4096).required(),
  image: Joi.string().uri().optional().allow(null, ''),
});
