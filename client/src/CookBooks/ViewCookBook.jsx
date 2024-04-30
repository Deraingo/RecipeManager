import { useEffect, useState } from "react";
import { useApi } from "../utils/use_api.js";
import { Link } from "react-router-dom";
import '../style/viewCookBook.css'
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";

export const ViewCookBook = () => {
    const api = useApi();
    const { id } = useParams();
    const numericId = parseInt(id, 10);
    const [cookBook, setCookbook] = useState(null);


    useEffect(() => {
        getCookbook();
    }, [id]);

    function downloadCookbook() {
        const doc = new jsPDF();

        doc.setFontSize(22);
        doc.text(cookBook.name, 10, 20);

        let y = 30;
        cookBook.recipes.forEach((recipe, index) => {
            doc.setFontSize(16);
            doc.text(`Recipe ${index + 1}: ${recipe.name}`, 10, y);
            y += 10;

            doc.setFontSize(12);
            doc.text(`Preparation Time: ${recipe.prepTime} hours`, 10, y);
            y += 10;
            doc.text(`Cooking Time: ${recipe.cookingTime} hours`, 10, y);
            y += 10;
            doc.text(`Serves: ${recipe.servings} people`, 10, y);
            y += 10;
            doc.text(`Ingredients:`, 10, y);
            y += 10;
            recipe.ingredients.map(ingredient => {
                doc.text(ingredient.name, 10, y);
                y += 10;
            });
            doc.text(`Instructions:`, 10, y);
            y += 10;
            recipe.instructions.map(instruction => {
                doc.text(instruction.instruction, 10, y);
                y += 10;
            });

            y += 20;
        });

        doc.save(`${cookBook.name}.pdf`);
    }


    async function getCookbook() {
        try {
            const { cookBook } = await api.get(`/create_cook_book/${numericId}`);
            for (let recipe of cookBook.recipes) {
                const { ingredients } = await api.get(`/recipes/${recipe.id}/ingredients`);
                recipe.ingredients = ingredients;
                const { instructions } = await api.get(`/recipes/${recipe.id}/instructions`);
                recipe.instructions = instructions;
            }
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
                        <p><b>Ingredients:</b></p>
                        <p>  {recipe.ingredients.map((ingredient, index) => (
                                    <p className="recipe-border-ingredients" key={index}>{ingredient.name}</p>
                                ))}</p>
                        <p><b>Instructions:</b></p>
                        {recipe.instructions.map((instruction, index) => (
                                <p className="recipe-border-ingredients" key={index}>{instruction.instruction}</p>
                            ))}
                    </li>
                ))}
            </ul>
            <button className="add-button" onClick={downloadCookbook}>Download Cookbook</button>
        </div>
    );
};