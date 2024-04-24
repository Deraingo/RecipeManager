import React, { useState, useEffect } from "react";
import { useApi } from "./utils/use_api";
import { useDispatch } from "react-redux";
import { setAuthToken } from "./store/application_slice";
import { useNavigate, Link } from "react-router-dom";

export const ViewRecipes = () => {
    const [user, setUser] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const api = useApi();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getUser();
        // getRecipes();
    }, []);

    async function getUser() {
        try{
            const { user } = await api.get("/users/me");
            setUser(user);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    return(
        <div className="container">
            <div className="header">
                <h1>I am on the View Recipes Page</h1>
            </div>
            <div>
               <Link className="action-button" to="../">Close Recipes</Link>
            </div>
        </div>
    );
};