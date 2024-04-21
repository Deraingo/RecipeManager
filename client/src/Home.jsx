import { useEffect, useState } from "react";
import { useApi } from "./utils/use_api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "./store/application_slice";
import { useCounter } from "./utils/use_counter";
import { requireLogin } from "./utils/require_login";

export const Home = () => {
  requireLogin();
  const [user, setUser] = useState(null);
  const api = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function getUser() {
    const {user} = await api.get("/users/me");
    setUser(user);
  }

  useEffect(() => {
    getUser();
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
        <button className="action-button">Add Recipe</button>
      </div>
        <button className="action-button" onClick={logout}>Logout</button>
    </div>
  )
}