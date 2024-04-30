import { Router } from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authentication";
import { RecipeRepository } from "../repositories/recipe_repository"; // Import your recipe repository


export const buildRecipeController = (recipeRepository: RecipeRepository) => {
    const router = Router();
    //Route for creating a recipe
    router.post("/", async (req, res) => {
        try {
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
    router.post("/:id/ingredients", authMiddleware, async (req, res) => {
        try {
            const recipeId = Number(req.params.id);
            const ingredients = await recipeRepository.createIngredient({ recipeId, ...req.body });
            res.json({ ingredients });
        } catch (error) {
            console.error("Error creating ingredient:", error);
            res.status(500).json({ error: "Failed to create ingredient", message: error });
        }
    });
    router.get("/:id/ingredients",authMiddleware, async (req, res) => {
        try {
            const recipeId = Number(req.params.id);
            const ingredients = await recipeRepository.getIngredientsByRecipeId(recipeId);
            res.json({ ingredients })
        } catch (error){
            console.error("Error fetching ingredients: ", error);
            res.status(500).json({ error: "Failed to fetch instruction", message: error });
        }
    });
    router.post("/:id/instructions", authMiddleware, async (req, res) => {
        try {
            const recipeId = Number(req.params.id);
            const instructions = await recipeRepository.createInstruction({ recipeId, ...req.body });
            res.json({ instructions });
        } catch (error) {
            console.error("Error creating instruction:", error);
            res.status(500).json({ error: "Failed to create instruction", message: error });
        }
    });
    router.get("/:id/instructions",authMiddleware, async (req, res) => {
        try {
            const recipeId = Number(req.params.id);
            const instructions = await recipeRepository.getInstructionsByRecipeId(recipeId);
            res.json({ instructions })
        } catch (error){
            console.error("Error fetching instructions: ", error);
            res.status(500).json({ error: "Failed to fetch instructions", message: error });
        }
    });
    router.delete("/:id", async (req, res) =>{
        try{
            const id = parseInt(req.params.id, 10);
            const recipe = await recipeRepository.getRecipesByUserId(id);
            await recipeRepository.deleteRecipe(id);
            res.json({message: "recipe deleted successfully"});
            // console.log("deleted" + recipe?.name);
        } catch (error){
            console.error("error deleting recipe", error);
            res.status(500).json({error: "Failed to delete recipe"});
        }
    });
    return router;
}