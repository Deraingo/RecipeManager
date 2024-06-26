import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useApi } from "../utils/use_api";
import '../style/createCookBook.css'

export const CreateCookBook = () => {
    const [user, setUser] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const [email, setEmail] = useState("");
    const [cookbookName, setCookbookName] = useState("");
    const api = useApi();
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
        getRecipes();
    }, []);

    const addRecipe = (recipe) => {
        setSelectedRecipes([...selectedRecipes, recipe]);
    };
    async function getUser() {
        try {
            const { user } = await api.get("/users/me");
            setUser(user);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }

    async function getRecipes() {
        try {
            const { recipes } = await api.get("/recipes/me");
            setRecipes(recipes);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    }


    const addCollaborator = async (email) => {
        try {
            if (email) {
                const response = await api.get(`/users?email=${email}`);
                const user = response.data.user;
                if (user) {
                    setCollaborators([...collaborators, user]);
                } else {
                    console.error("No user found with this email");
                }
                setEmail("");
            } else {
                console.error("Email field is empty");
            }
        } catch (error) {
            console.error("Error adding collaborator:", error);
        }
    };

    const createCookBook = async () => {
        const shared = collaborators.length > 0;
        const userId = user.id;
        const name = cookbookName;
        const collaboratorData = await Promise.all(collaborators.map(async (email) => {
            const user = await api.get(`/users?email=${email}`);
            return user;
        }));

        const cookBook = await api.post("/create_cook_book", {
            userId,
            name,
            shared,
            recipes: selectedRecipes.map(recipe => recipe.id),
            collaborators: collaboratorData.map(user => user.email),
        });

        if (cookBook) {
            navigate('/view_cookbooks'); 
            console.log("Cookbook created successfully");
        } else {
            console.error("Error creating cookbook");
        }
    };

    return (
        <div className="container">
            <h1>Create Cookbook</h1>
            <input type="text" value={cookbookName} onChange={(e) => setCookbookName(e.target.value)} placeholder="Enter cookbook name" />
            <h2>Recipes</h2>
            {recipes.map((recipe) => (
                <div key={recipe.id}>
                    <div className="recipe-name"><span>{recipe.name}</span></div>
                    <button className="add-button" onClick={() => addRecipe(recipe)}>Add</button>
                </div>
            ))}
            <h2>Added Recipes</h2>
            {selectedRecipes.map((recipe, index) => (
                <div key={index}>
                    <span className="recipe-name">{recipe.name}</span>
                </div>
            ))}
            {/* <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter collaborator's email" /> */}
            {/* <button onClick={() => addCollaborator(email)} className="add-collaborator-button">Add Collaborator</button> */}
            <div className="submit">
                <button onClick={createCookBook} className="submit-button">Done</button>
            </div>

        </div>
    );
};