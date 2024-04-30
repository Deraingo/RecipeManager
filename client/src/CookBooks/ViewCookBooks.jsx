import { useEffect, useState } from "react";
import { useApi } from "../utils/use_api.js";
import { Link } from "react-router-dom";
import '../style/viewCookBook.css'
export const ViewCookBooks = () => {
    const [user, setUser] = useState(null);
    const [cookBooks, setCookbooks] = useState([]);
    const api = useApi();
    useEffect(() => {
        getUser();
        getCookbooks();
    }, []);

    async function getUser() {
        try {
            const { user } = await api.get("/users/me");
            setUser(user);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }

    async function getCookbooks() {
        try {
            const { cookBooks } = await api.get("/create_cook_book/me");
            setCookbooks(cookBooks);
        } catch (error) {
            console.error("Error fetching cookbooks:", error);
        }
    }

    if (!cookBooks) {
        return (
            <h1>Loading...</h1>
        );
    }
    else if (cookBooks == null || cookBooks == undefined || cookBooks == "") {
        return (
            <div className="container">
                <p>
                    It looks like you haven't made any cookbooks! Press the button below to get started!
                </p>
                <Link className="action-button" to={"/create_cookbook"}>Create Cookbook</Link>
            </div>

        );
    }
    return (
        <div className="main-content">
            <h1>Cookbooks</h1>
            {cookBooks.map((cookbook) => (
                <div className="cookbook-card" key={cookbook.id}>
                    <div className="cookbook-container" >
                        <h2>{cookbook.name}</h2>
                        <p>Created at: {new Date(cookbook.createdAt).toLocaleDateString()}</p>
                        <p>Updated at: {new Date(cookbook.updatedAt).toLocaleDateString()}</p>
                        <h3>Recipes:</h3>
                        <ul>
                            {cookbook.recipes.map(recipe => (
                                <li key={recipe.id}>{recipe.name}</li>
                            ))}
                        </ul>
                        <Link className="action-button" to={`/edit_cookbook/${cookbook.id}`}>Edit</Link>
                        <Link className="action-button" to={`/view_cookbook/${cookbook.id}`}>View</Link>
                        <Link className="action-button" to={`/delete_cookbook/${cookbook.id}`}>Delete</Link>
                    </div>
                </div>

            ))}
        </div>
    );
};