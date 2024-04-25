import { useEffect, useState } from "react";
import { useApi } from "./utils/use_api";

export const CreateCookBook = () => {
    const [user, setUser] = useState(null);
    const [recipes, setRecipes] = useState([]); // Replace with your own recipe data
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const [email, setEmail] = useState(""); // For the collaborator email input
    const [cookbookName, setCookbookName] = useState("");
    const api = useApi();

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

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await api.get("/recipes/me");
                setRecipes(response.data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();
    }, []);

    useEffect(() => {
        getUser();
    }, []);

    const addCollaborator = async () => {
        try {
            const user = await api.get(`/users?email=${email}`);
            if (user) {
                setCollaborators([...collaborators, user]);
            } else {
                console.error("User with this email does not exist");
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const createCookBook = async () => {
        const shared = collaborators.length > 0;
        const userId = user.id;
        const name = cookbookName;
        const cookBook = await api.post("/create_cook_book", {
            userId,
            name,
            shared,
            recipes: selectedRecipes.map(recipe => recipe.id),
            collaborators: collaborators.map(user => user.id),
        });

        if (cookBook) {
            console.log("Cookbook created successfully");
        } else {
            console.error("Error creating cookbook");
        }
    };

    return (
        <div>
            <h1>Create Cookbook</h1>
            <input type="text" value={cookbookName} onChange={(e) => setCookbookName(e.target.value)} placeholder="Enter cookbook name" /> 
            <h2>Recipes</h2>
            {recipes && recipes.map((recipe) => (
                <div key={recipe.id}>
                    <span>{recipe.name}</span>
                    <button onClick={() => addRecipe(recipe)}>Add</button>
                </div>
            ))}
            <h2>Collaborators</h2>
            {collaborators && collaborators.map((user, index) => (
                <div key={index}>
                    <span>{user.email}</span>
                </div>
            ))}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter collaborator's email" />
            <button onClick={addCollaborator}>Add Collaborator</button>
            <button onClick={createCookBook}>Done</button>
        </div>
    );
};