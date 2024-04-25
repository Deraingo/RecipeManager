import { Router } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authentication";
import { RecipeRepository } from "../repositories/recipe_repository"; // Import your recipe repository


export const buildRecipeController = (recipeRepository: RecipeRepository) => {
    const router = Router();
    //Route for creating a recipe
    router.post("/", async (req, res) => {
        try{
            const recipe = await recipeRepository.createRecipe(req.body);
            res.json({ recipe });
        } catch (error) {
            console.error("Error creating recipe:", error);
            res.status(500).json({ error: "Failed to create recipe", message: error });
        }
    });
    router.get("/me", authMiddleware, async (req, res) => {
        try {
        const userId = req.user?.id;
        if (userId === undefined) {
            res.status(400).json({ error: "User ID not provided in request" });
            return;
        }

        // Fetch reptiles by user id
        const recipes = await recipeRepository.getRecipesByUserId(userId);
        res.json({ recipes });
        } catch (error) {
        console.error("Error fetching user's recipes:", error);
        res.status(500).json({ error: "Failed to fetch user's recipes" });
        }
    });
    return router;
}