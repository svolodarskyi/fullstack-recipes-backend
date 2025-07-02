import { getAllRecipes } from "../../services/recipes/getAllRecipes.js";
import { parsePaginationParams } from "../../utils/parsePaginationParams";
import { parseFilterParams } from "../../utils/parseFilterParams";
export const getAllRecipesController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const filter = parseFilterParams(req.query);
    
    const recipes = await getAllRecipes({
        page,
        perPage,
        filter,
    });
    res.json({
        status: 200,
        message: "Successfully found recipes!",
        data: recipes,
    });

};