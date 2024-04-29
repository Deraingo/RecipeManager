import { useEffect, useState } from "react";
import { useApi } from "../utils/use_api.js";
import '../style/editCookBook.css'
import { useParams, useNavigate } from "react-router-dom";

export const EditCookBook = () => {
    const api = useApi();
    const { id } = useParams();
    const numericId = parseInt(id, 10);
    const [cookBook, setCookbook] = useState(null);
    const [name, setName] = useState("");
    const [currentRecipes, setCurrentRecipes] = useState([]);
    const [otherRecipes, setOtherRecipes] = useState([]);
    const [addRecipes, setAddRecipes] = useState([]);
    const [removeRecipes, setRemoveRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCookbook();
    }, [id]);

    
    async function getCookbook() {
        try {
            const { cookBook } = await api.get(`/create_cook_book/${numericId}`);
            setCookbook(cookBook);
            setName(cookBook.name);
            setCurrentRecipes(cookBook.recipes);
            getOtherRecipes(cookBook.recipes);
        } catch (error) {
            console.error("Error fetching cookbook:", error);
        }
    }
    
    async function getOtherRecipes(currentRecipes) {
        try {
            const { recipes } = await api.get(`/recipes/me`);
            const currentRecipeIds = currentRecipes.map(recipe => recipe.id);
            setOtherRecipes(recipes.filter(recipe => !currentRecipeIds.includes(recipe.id)));
        } catch (error) {
            console.error("Error fetching other recipes:", error);
        }
    }
    
    function handleAddRecipe(recipeId) {
        const recipeToAdd = otherRecipes.find(recipe => recipe.id === recipeId);
        setAddRecipes([...addRecipes, recipeToAdd.id]);
        setOtherRecipes(otherRecipes.filter(recipe => recipe.id !== recipeId));
        setCurrentRecipes([...currentRecipes, recipeToAdd]);
    }
    
    function handleRemoveRecipe(recipeId) {
        const recipeToRemove = currentRecipes.find(recipe => recipe.id === recipeId);
        setRemoveRecipes([...removeRecipes, recipeToRemove.id]);
        setCurrentRecipes(currentRecipes.filter(recipe => recipe.id !== recipeId));
        setOtherRecipes([...otherRecipes, recipeToRemove]);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await api.put(`/create_cook_book/${numericId}`, { name, addRecipes, removeRecipes });
            navigate(`/view_cookbook/${numericId}`);
        } catch (error) {
            console.error("Error updating cookbook:", error);
        }
    }

    if (!cookBook) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main-content">
            <h1>Edit Cookbook</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <div>
                    <h2>Current Recipes:</h2>
                    {currentRecipes.map(recipe => (
                        <div className="current-recipes" key={recipe.id}>
                            {recipe.name} <button className="add-button" onClick={() => handleRemoveRecipe(recipe.id)}>Remove</button>
                        </div>
                    ))}
                </div>
                <div>
                    <h2>Other Recipes:</h2>
                    {otherRecipes.map(recipe => (
                        <div className="other-recipes" key={recipe.id}>
                            {recipe.name} <button className="add-button" onClick={() => handleAddRecipe(recipe.id)}>Add</button>
                        </div>
                    ))}
                </div>
                <button className="save-button" type="submit">Save</button>
            </form>
        </div>
    );
};