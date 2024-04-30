import React, { useState, useEffect } from "react";
import { useApi } from "../utils/use_api";
import { useNavigate, Link } from "react-router-dom";
import '../style/recipe.css'

export const ViewRecipes = () => {
    const [user, setUser] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const api = useApi();

    useEffect(() => {
        getUser();
        getRecipes();
    }, []);

    async function getUser() {
        try{
            const { user } = await api.get("/users/me");
            setUser(user);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };
    async function getRecipes() {
        try {
          const { recipes } = await api.get("/recipes/me");
          for (let recipe of recipes) {
            const { ingredients } = await api.get(`/recipes/${recipe.id}/ingredients`);
            recipe.ingredients = ingredients;
          }
          for (let recipe of recipes) {
            const { instructions } = await api.get(`/recipes/${recipe.id}/instructions`);
            recipe.instructions = instructions;
          }
          setRecipes(recipes);
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
    };
    if(!recipes){
        return(
            <h1>Loading...</h1>
        )
    }
    if(recipes == "" || recipes == null || recipes == undefined){
        return(
            <div className="container">
                <p>
                    it looks like you havent created any recipes! Press the button below to get started
                </p>
                <Link className="action-button" to={"/add_recipe"}> Create Recipe </Link>
            </div>
        );

    }
    return(
        <div className="container">
            <div className="recipe-list">
                <h1>Your Recipes:</h1>
                <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <div className="recipe-item">
                            <h3 className="recipe-header-border">{recipe.name}</h3>
                            <p className="recipe-border">Preparation Time: {recipe.prepTime} hours</p>
                            <p className="recipe-border">Cooking Time: {recipe.cookingTime} hours</p>
                            <p className="recipe-border">Serves: {recipe.servings} people</p>
                            <p className="recipe-border">Ingredients:</p>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <p className="recipe-border-ingredients" key={index}>{ingredient.name}</p>
                                ))}
                            <p className="recipe-border">Instructions:</p>
                            {recipe.instructions.map((instruction, index) => (
                                <p className="recipe-border-ingredients" key={index}>{instruction.instruction}</p>
                            ))}
                            <Link className="action-button-recipes" to={`/delete_recipe/${recipe.id}`}>Delete</Link>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
            <div>
               <Link className="action-button" to="../">Close Recipes</Link>
            </div>
        </div>
    );
};
