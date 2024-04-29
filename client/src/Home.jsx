import { useEffect, useState } from "react";
import { useApi } from "./utils/use_api";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "./store/application_slice";
import { useCounter } from "./utils/use_counter";
import { requireLogin } from "./utils/require_login";
import { Header } from './Header.jsx';
import { Outlet } from "react-router-dom";
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
    <div className="home-container">
    <Header user={user} logout={logout} />
    <Outlet /> {/* This will render the child routes */}
    <div className="main-body">
      <div>
        {/* Map of recipes or cookbooks */}
      </div>
    </div>
  </div>
  )
}