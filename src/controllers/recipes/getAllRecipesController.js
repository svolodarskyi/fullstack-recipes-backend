import { getAllRecipes } from "../../services/recipes/getAllRecipes.js";
import { parsePaginationParams } from "../../utils/parsePaginationParams";

export const getAllRecipesController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const recipes = await getAllRecipes({
        page,
        perPage,
    });
    res.json({
        status: 200,
        message: "Successfully found recipes!",
        data: recipes,
    });

};