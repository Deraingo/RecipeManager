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
          setRecipes(recipes);
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
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
                            <p className="recipe-border">Instructions: {recipe.instructions} </p>
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
