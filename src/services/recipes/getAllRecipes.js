import Recipes from "../../db/models/recipe.js";
import { calculatePaginationData } from "../../utils/calculatePaginationData.js";
export const getAllRecipes = async ({
    page = 1,
    perPage = 12,
}) => {
const limit = perPage;
    const skip = (page - 1) * perPage;

    const recipesQuery = Recipes.find();
    const recipesCount = await Recipes.find().merge(recipesQuery).countDocuments();
    const recipes = await recipesQuery.skip(skip).limit(limit).exec();
    const paginationData = calculatePaginationData(recipesCount, perPage, page);

  return {
    data: recipes,
    ...paginationData,
  };
};
