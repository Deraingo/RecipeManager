import { useEffect, useState } from "react";
import { useApi } from "./utils/use_api";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "./store/application_slice";
import { useCounter } from "./utils/use_counter";
import { requireLogin } from "./utils/require_login";

export const Home = () => {
  requireLogin();
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const api = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function getUser() {
    const {user} = await api.get("/users/me");
    setUser(user);
  }

  async function getRecipes() {
    try {
      const { recipes } = await api.get("/recipes/me");
      setRecipes(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }

  useEffect(() => {
    getUser();
    getRecipes();
  }, [])

  function logout() {
    dispatch(setAuthToken(null));
  }

  return (
    <div className="container">
      <div>{user && <h1>Welcome, {user.firstName}</h1>}</div>
      <div>
        {/* Map of recipes or cookbooks */}
      </div>
      <div>
        {/* on click send to view recipe page */}
        <button className="action-button">View Recipes</button>
        <button className="action-button">Cookbooks</button>
        <Link className="action-button" to="/add_recipe">
          Add Recipe
        </Link>
      </div>
        <button className="action-button" onClick={logout}>Logout</button>
        <button onClick={console.log(recipes)}>Testing</button>
    </div>
  )
}