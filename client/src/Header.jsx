import { Link } from "react-router-dom";

export const Header = ({ user, logout }) => (
  <header className="header">
    <Link to={"view_recipes"}><h2 className="title">Cuisine Concierge</h2></Link>
    <div className="links">
      <div className="dropdown">
        <button className="dropbtn">Recipes</button>
        <div className="dropdown-content">
          <Link to="add_recipe" className="sub-link">Create Recipe</Link>
          <Link to="view_recipes" className="sub-link">View Recipes</Link>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Cookbooks</button>
        <div className="dropdown-content">
          <Link to="create_cookbook" className="sub-link">Create Cookbook</Link>
          <Link to="/view_cookbooks" className="sub-link">View Cookbooks</Link>
        </div>
      </div>
      <Link className="action-button" to="profile">Profile</Link>
      <Link className="action-button" onClick={logout}>Logout</Link>
    </div>

  </header>
);