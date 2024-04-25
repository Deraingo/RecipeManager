import { Link } from "react-router-dom";

export const Header = ({ user, logout }) => (
  <header className="header">
    <h2 className="title">Cuisine Concierge</h2>
    <Link className="action-button" to="view_recipes">View Recipes</Link>
    <Link className="action-button" to="cookbooks">Cookbooks</Link>
    <Link className="action-button" to="add_recipe">Add Recipe</Link>
    <Link className="action-button" to="profile">Profile</Link>
    <Link className="action-button" to="create_cookbook">Create Cookbook</Link>
    <Link className="action-button" onClick={logout}>Logout</Link>
  </header>
);