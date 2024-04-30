import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const authToken = useSelector(state => state.application.authToken)
  return (
    <div className="main">
      <nav className="my-nav">{
        !authToken && (
          <>
            <Link className="action-button" to="/sign_up">Create Account </Link>
            <Link className="action-button" to="/login">Sign In</Link>
          </>
        )
      }</nav>
      
      <Outlet />
      
    </div>
  );
}

export default App
