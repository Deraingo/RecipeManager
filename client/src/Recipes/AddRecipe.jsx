import React, { useState, useEffect } from "react";
import { useApi } from "../utils/use_api";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../store/application_slice";
import { useNavigate } from "react-router-dom";
import '../style/recipe.css'

export const AddRecipe = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [prepTime, setPrepTime] = useState(0);
    const [cookingTime, setCookingTime] = useState(0);
    const [servings, setServings] = useState(0);
    const [ingredients, setIngredients] = useState([""]);
    const [instructions, setInstructions] = useState([""]);
    const api = useApi();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    async function createRecipe(e) {
        e.preventDefault();
        try {
            const res = await api.post("/recipes", {
                userId: user?.id,
                name,
                prepTime,
                cookingTime,
                servings,
                ingredients // Include ingredients in the API call
            });
            if (res.token) {
                dispatch(setAuthToken(res.token));
            }
            for (const ingredient of ingredients) {
                await api.post(`/recipes/${res.recipe.id}/ingredients`, {
                    name: ingredient,
                    quantity: 0 /* TODO: Make it so a user can add a quantity for each ingredient*/
                });
            }
            for (const instruction of instructions) {
                await api.post(`/recipes/${res.recipe.id}/instructions`, {
                    instruction: instruction,
                    stepNumber: 0 /* TODO: Make it so a user can add a step number for each instruction*/
                });
            }
            navigate("/");
        } catch (error) {
            console.error("Error creating recipe:", error);
        }
    }

    async function getUser() {
        try {
            const { user } = await api.get("/users/me");
            setUser(user);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }

    // Function to handle changes in ingredients
    const handleIngredientChange = (index, event) => {
        const values = [...ingredients];
        values[index] = event.target.value;
        setIngredients(values);
    };

    // Function to handle adding more ingredient fields
    const handleAddIngredient = () => {
        setIngredients([...ingredients, ""]);
    };
    const handleInstructionChange = (index, event) => {
        const values = [...instructions];
        values[index] = event.target.value;
        setInstructions(values);
    };

    // Function to handle adding more instruction fields
    const handleAddInstruction= () => {
        setInstructions([...instructions, ""]);
    };
    return (
        <div>
            <h2>Create Recipe</h2>
            <form className="create-recipe-form" onSubmit={createRecipe}>
                <input
                    placeholder="Name"
                    type="text"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    placeholder="Prep Time"
                    type="number"
                    value={prepTime}
                    required
                    onChange={(e) => setPrepTime(parseFloat(e.target.value))}
                />
                <input
                    placeholder="Cooking Time"
                    type="number"
                    value={cookingTime}
                    required
                    onChange={(e) => setCookingTime(parseFloat(e.target.value))}
                />
                <input
                    placeholder="Serving #"
                    type="number"
                    value={servings}
                    required
                    onChange={(e) => setServings(parseInt(e.target.value, 10))}
                />

                {/* Inputs for ingredients */}
                {ingredients.map((ingredient, index) => (
                    <input
                        key={index}
                        placeholder="Ingredient"
                        type="text"
                        value={ingredient}
                        required
                        onChange={(event) => handleIngredientChange(index, event)}
                    />
                ))}
                <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>

                {/* Inputs for instructions */}
                {instructions.map((instruction, index) => (
                    <input
                        key={index}
                        placeholder="Instruction"
                        type="text"
                        value={instruction}
                        required
                        onChange={(event) => handleInstructionChange(index, event)}
                    />
                ))}
                <button type="button" onClick={handleAddInstruction}>Add Instruction</button>

                <button type="submit" className="action-button">Submit</button>
            </form>
        </div>
    );
};
