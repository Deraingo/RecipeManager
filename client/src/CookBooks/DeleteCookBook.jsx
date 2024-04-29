import { useEffect, useState } from "react";
import { useApi } from "../utils/use_api.js";
import { useParams} from "react-router-dom";

import { useNavigate } from "react-router-dom";

export const DeleteCookbook = () => {
    const { id } = useParams();
    const api = useApi();
    const navigate = useNavigate();

    async function deleteCookbook() {
        try {
            await api.del(`/create_cook_book/${id}`);
            navigate("/view_cookbooks");
        } catch (error) {
            console.error("Error deleting cookbook:", error);
        }
    }

    return (
        <div className="main-content">
            <h1>Are you sure you want to delete this cookbook?</h1>
            <button onClick={deleteCookbook}>Yes</button>
            <button onClick={() => navigate("/view_cookbooks")}>No</button>
        </div>
    );
};