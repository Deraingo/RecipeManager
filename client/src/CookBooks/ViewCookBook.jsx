import { useEffect, useState } from "react";
import { useApi } from "../utils/use_api.js";
import { Link } from "react-router-dom";
import '../style/viewCookBook.css'
import { useParams } from "react-router-dom";

export const ViewCookBook = () => {
    const api = useApi();
    const { id } = useParams();
    const numericId = parseInt(id, 10);
    const [cookBook, setCookbook] = useState(null);
    

    useEffect(() => {
        getCookbook();
    }, [id]);


    async function getCookbook() {
        try {
            const { cookBook } = await api.get(`/create_cook_book/${numericId}`);
            setCookbook(cookBook);
        } catch (error) {
            console.error("Error fetching cookbook:", error);
        }
    }

    if (!cookBook) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main-content">
            <h1>{cookBook.name}</h1>
            <p>Created at: {new Date(cookBook.createdAt).toLocaleDateString()}</p>
            <p>Updated at: {new Date(cookBook.updatedAt).toLocaleDateString()}</p>
            <h3>Recipes:</h3>
            <ul>
                {cookBook.recipes && cookBook.recipes.map(recipe => (
                    <li key={recipe.id}>
                        <h3>{recipe.name}</h3>
                        <p>Preparation Time: {recipe.prepTime} hours</p>
                        <p>Cooking Time: {recipe.cookingTime} hours</p>
                        <p>Serves: {recipe.servings} people</p>
                        <p>Ingredients: {recipe.ingredients}</p>
                        <p>Instructions: {recipe.instructions}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};