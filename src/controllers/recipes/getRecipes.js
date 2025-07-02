import Recipe from '../../db/models/recipe.js';

export const getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find().populate('owner', 'name email');
    res.json({
      status: 200,
      message: 'Recipes fetched',
      data: recipes,
    });
  } catch (error) {
    next(error);
  }
};
