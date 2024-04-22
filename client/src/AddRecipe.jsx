import React, { useState, useEffect } from "react";
import { useApi } from "./utils/use_api";
import { useDispatch } from "react-redux";
import { setAuthToken } from "./store/application_slice";
import { useNavigate } from "react-router-dom";

export const AddRecipe = () =>{
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [cookingTime, setCookingTime] = useState("");
    const [servings, setServings] = useState(0);
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
            userId: user?.id, // Assuming the backend expects userId
            name,
            prepTime,
            cookingTime,
            servings
          });
          // Check if the response contains a token and dispatch it if necessary
          if (res.token) {
            dispatch(setAuthToken(res.token));
          }
          navigate("/");
        } catch (error) {
          console.error("Error creating recipe:", error);
          // Handle error (e.g., show error message to the user)
        }
    }

    async function getUser() {
        try {
          const { user } = await api.get("/users/me");
          setUser(user);
        } catch (error) {
          console.error("Error fetching user:", error);
          // Handle error (e.g., show error message to the user)
        }
    }
    return(
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
                    placeholder="prepTime"
                    type="text"
                    value={prepTime}
                    required
                    onChange={(e) => setPrepTime(e.target.value)}
                />
                <input
                    placeholder="cookingTime"
                    type="text"
                    value={cookingTime}
                    required
                    onChange={(e) => setCookingTime(e.target.value)}
                />
                <input
                    placeholder="Serving #"
                    type="number"
                    value={servings}
                    required
                    onChange={(e) => setServings(parseInt(e.target.value, 10))}
                />

                <button type="submit" className="action-button">Submit</button>
            </form>
        </div>
    )
}