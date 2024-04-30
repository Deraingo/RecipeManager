import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function Index() {
    const authToken = useSelector(state => state.application.authToken);
  
    return (
      <div className="container">
        <p><b>Welcome!</b></p>
        <p>Cusine Concierge is a useful tool for creating and tracking recipes made by you!<br>
        </br>
            Make Recipes, Create Cookbooks, and download cookbooks to share with your friends!  
        </p>
        <p>Make an account to get started</p>
        <Link className="action-button" to="/sign_up">Create Account</Link>
        <p>or log in here</p>
        <Link className="action-button" to="/login">Create Account</Link>
      </div>
    );
}
  
export { Index };