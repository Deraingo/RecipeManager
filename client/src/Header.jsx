import { Link } from "react-router-dom";

export const Header = ({ user, logout }) => (
  <header className="header">
    {user && <h1>Welcome, {user.firstName}</h1>}
    <Link className="action-button" to="view_recipes">View Recipes</Link>
    <Link className="action-button" to="cookbooks">Cookbooks</Link>
    <Link className="action-button" to="add_recipe">Add Recipe</Link>
    <button className="action-button" onClick={logout}>Logout</button>
  </header>
);