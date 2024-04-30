import { useEffect, useState } from "react";
import { useApi } from "../utils/use_api.js";
import { useParams} from "react-router-dom";

import { useNavigate } from "react-router-dom";

export const DeleteRecipe = () => {
    const { id } = useParams();
    const api = useApi();
    const navigate = useNavigate();

    async function deleteRecipe() {
        try {
            await api.del(`/recipes/${id}`);
            navigate("/view_recipes");
        } catch (error) {
            console.error("Error deleting cookbook:", error);
        }
    }

    return (
        <div className="main-content">
            <h1>Are you sure you want to delete this recipe</h1>
            <button className="action-button" onClick={deleteRecipe}>Yes</button>
            <button className="action-button" onClick={() => navigate("/view_recipes")}>No</button>
        </div>
    );
};